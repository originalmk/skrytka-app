const express = require('express');
const pgp = require('pg-promise')();
const session = require('express-session');
const responseTime = require('response-time');
const types = require('pg').types;
const validator = require('validator');
const path = require('path');

require('dotenv').config();

const app = express();
const db = pgp(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

const port = 5000;

class Point {
	x;
	y;

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Rectangle {
	leftBottomPoint;
	size;

	constructor(leftBottomPoint, size) {
		this.leftBottomPoint = leftBottomPoint;
		this.size = size;
	}
}

types.setTypeParser(603, function(rectangleStr) {
	rectangleStr = rectangleStr.slice(1, rectangleStr.length - 1);
	const pointStrs = rectangleStr.split('),(');
	const fp = pointStrs[0].split(',');
	const sp = pointStrs[1].split(',');

	const lowerBottomPoint = new Point(+sp[0], +sp[1]);
	const size = new Point(+fp[0] - (+sp[0]), +fp[1] - (+sp[1]));

	return new Rectangle(lowerBottomPoint, size);
});

// Hosting frontend:
app.use(express.static(path.join(__dirname, 'client/build')));

// Hosting images (trucks etc):
app.use(express.static(path.join(__dirname, 'media')));

app.use(session({
	store: new (require('connect-pg-simple')(session))({
		pgPromise: db,
		tableName: 'user_session'
	}),
	secret: `${process.env.COOKIE_SECRET}`,
	resave: false,
	saveUninitialized: false,
	cookie: {
		sameSite: 'lax',
		// Age of cookie is counted from last access, so here 30 days of *not using* = deletion
		maxAge: 30 * 24 * 60 * 60 * 1000 
	}
}));

app.use(express.json());

/* Getting OSP units of provided prefix
 * e.g. https://skrytka.app/osp-units?prefix=Gda
 * Returns 3 matching results sorted by locality, name.*/
app.get('/osp-units', async (req, res) => {
	const locality = req.query['locality'];

	if(!locality) {
		res.status(400);
		res.json({
			queryErrors: {
				'locality': ['Nie podano parametru!']
			},
			otherErrors: []
		});
		return;
	}

	// DECIDE: Whether to remove some database constraints and add more simple checks here from validator?
	// Also are these database constraints reasonable?

	try {
		const unitsList = await db.any('SELECT id AS "ID", name, locality FROM get_units_list($1)', [locality]);
		res.status(200);
		res.json(unitsList);
	} catch(error) {
		res.status(500);
		res.json({
			queryErrors: {},
			otherErrors: ['Wystąpił błąd serwera!']
		});
	}
});

/* Users should be taken from session, not from query parameter
* 1. If user is not logged in then his scores are saved in session data. For such user we pass trucks list with appropriate scores calculated from
* that session data and not taken from database. QUESTION: Aren't there solutions that can use already existing database and not create another
* scheme of data? Or maybe that little redundancy is acceptable :]
* 2. If user is logged in then his nickname is in session data. We can use it to call database server function and get needed results. */
// TODO: Add timestamp to results
app.get('/fire-trucks', async (req, res) => {
	const ospUnit = req.query['osp-unit'];

	if(!ospUnit) {
		res.status(400);
		res.json({
			queryErrors: {
				'osp-unit': ['Nie podano parametru!']
			},
			otherErrors: []
		});
		return;
	}

	// Do we need these additional checks before sending to database? Probably not...
	// But it is better to know if result is empty because it is just answer to our question
	// and without validation before query we can get empty result because of some undetermined error

	if(!validator.isNumeric(ospUnit, { no_symbols: true })) {
		res.status(400);
		res.json({
			queryErrors: {
				'osp-unit': ['Podane ID musi być liczbą (całkowitą)!']
			},
			otherErrors: []
		});
		return;
	}

	if(ospUnit <= 0) {
		res.status(400);
		res.json({
			queryErrors: {
				'osp-unit': ['Podane ID musi być większe od 0!']
			},
			otherErrors: []
		});
		return;
	}

	try {
		const unitExists = (await db.any('SELECT id FROM osp_unit WHERE id = $1', [ospUnit])).length != 0;
		if(!unitExists) {
			res.status(404);
			res.json({
				queryErrors: {
					'osp-unit': ['Jednostka o podanym ID nie istnieje!']
				},
				otherErrors: []
			});
			return;
		}
	} catch(error) {
		res.status(500);
		res.json({
			queryErrors: {},
			otherErrors: ['Wystąpił błąd serwera!']
		});
		return;
	}
	
	let user = req.session['accountNickname'];
	const loggedIn = user ?? false;

	if(loggedIn) {
		try {
			const trucksList = await db.func('get_trucks_list_with_scores', [ospUnit, user]);
			res.status(200);
			res.json(trucksList);
		} catch(error) {
			console.log(error);
			res.status(500);
			res.json({
				queryErrors: {},
				otherErrors: ['Wystąpił błąd serwera!']
			});
		}
	} else {
		try {
			const trucksList = await db.any('SELECT id AS "ID", name, image_path AS "imagePath" FROM fire_truck WHERE osp_unit_id = $1', [ospUnit]);
			let avgPercents = {};

			// We assume that scores in session are pushed in order from oldest to latest
			// so we need to:
			// 1. Iterate from the end to the beginning
			// 2. Push scores to corresponding entries in avgPercents
			// 2.1. If there are already 3 scores in entry then stop adding
			// 3. Map scores so that each entry becomes average of scores divided by 10 (percents)

			const quizResults = req.session.quizResults ?? [];
			for(let i = quizResults.length - 1; i >= 0; i--) {
				if(!avgPercents[quizResults[i].fireTruckID]) {
					avgPercents[quizResults[i].fireTruckID] = [];
				}

				if(avgPercents[quizResults[i].fireTruckID].length < 3) {
					avgPercents[quizResults[i].fireTruckID].push(quizResults[i].points);
				}
			}

			console.log(avgPercents);

			Object.keys(avgPercents).forEach(function(fireTruckID, index) {
				let sum = 0;
				let numberOfResults = 0;

				avgPercents[fireTruckID].forEach(points => {
					sum += +points;
					numberOfResults++;
					console.log(sum, numberOfResults);
				});

				let averagePercent = (sum/numberOfResults)/10;
				avgPercents[fireTruckID] = averagePercent;
			});

			// It is pretty complicated so it may be reasonable to change it in the future

			trucksList.map(row => {
				const truckID = row['ID'];

				row.avgPercent = avgPercents[truckID] ?? 0;
			});

			res.status(200);
			res.json(trucksList);
		} catch(error) {
			console.log(error);
			res.status(500);
			res.json({
				queryErrors: {},
				otherErrors: ['Wystąpił błąd serwera!']
			});
		}
	}
});

app.get('/quiz-pages', async (req, res) => {
	const fireTruck = req.query['fire-truck'];

	if(!fireTruck) {
		res.status(400);
		res.json({
			queryErrors: {
				'fire-truck': ['Nie podano parametru!']
			},
			otherErrors: []
		});
		return;
	}

	if(!validator.isNumeric(fireTruck, { no_symbols: true })) {
		res.status(400);
		res.json({
			queryErrors: {
				'fire-truck': ['Podane ID musi być liczbą (całkowitą)!']
			},
			otherErrors: []
		});
		return;
	}

	if(fireTruck <= 0) {
		res.status(400);
		res.json({
			queryErrors: {
				'fire-truck': ['Podane ID musi być większe od 0!']
			},
			otherErrors: []
		});
		return;
	}

	try {
		const truckExists = (await db.any('SELECT id FROM fire_truck WHERE id = $1', [fireTruck])).length != 0;
		if(!truckExists) {
			res.status(404);
			res.json({
				queryErrors: {
					'fire-truck': ['Wóz o podanym ID nie istnieje!']
				},
				otherErrors: []
			});
			return;
		}
	} catch(error) {
		res.status(500);
		res.json({
			queryErrors: {},
			otherErrors: ['Wystąpił błąd serwera!']
		});
		return;
	}

	try {
		let quizData = await db.any(
			`SELECT side_id AS "sideID", side_image_path AS "sideImagePath",
				cache_id AS "cacheID", cache_rectangle as "cacheRectangle", cache_name as "cacheName" FROM get_quiz_data_for_truck($1)`, [fireTruck]);

		quizData = quizData.reduce((acc, curr) => {
			const sideID = curr.sideID;

			if(!acc[sideID]) {
				acc[sideID] = {
					sideImagePath: curr.sideImagePath,
					caches: []
				};
			}

			delete curr.sideID;

			acc[sideID].caches.push({
				cacheID: curr.cacheID,
				cacheName: curr.cacheName,
				cacheRectangle: curr.cacheRectangle
			});

			return acc;
		}, {});

		res.status(200);
		res.send(quizData);
	} catch(error) {
		res.status(500);
		res.json({
			queryErrors: {},
			otherErrors: ['Wystąpił błąd serwera!']
		});
	}
});

app.get('/random-question', async (req, res) => {
	const fireTruck = req.query['fire-truck'];

	if(!fireTruck) {
		res.status(400);
		res.json({
			queryErrors: {
				'fire-truck': ['Nie podano parametru!']
			},
			otherErrors: []
		});
		return;
	}

	if(!validator.isNumeric(fireTruck, { no_symbols: true })) {
		res.status(400);
		res.json({
			queryErrors: {
				'fire-truck': ['Podane ID musi być liczbą (całkowitą)!']
			},
			otherErrors: []
		});
		return;
	}

	if(fireTruck <= 0) {
		res.status(400);
		res.json({
			queryErrors: {
				'fire-truck': ['Podane ID musi być większe od 0!']
			},
			otherErrors: []
		});
		return;
	}

	try {
		const truckExists = (await db.any('SELECT id FROM fire_truck WHERE id = $1', [fireTruck])).length != 0;
		if(!truckExists) {
			res.status(404);
			res.json({
				queryErrors: {
					'fire-truck': ['Wóz o podanym ID nie istnieje!']
				},
				otherErrors: []
			});
			return;
		}
	} catch(error) {
		res.status(500);
		res.json({
			queryErrors: {},
			otherErrors: ['Wystąpił błąd serwera!']
		});
		return;
	}

	try {
		const randomQuestion = await db.one('SELECT cache_id AS "cacheID", equipment_name AS "equipmentName" FROM get_random_question($1)', [fireTruck]);
		res.status(200);
		res.send(randomQuestion);
	} catch(error) {
		res.status(500);
		res.json({
			queryErrors: {},
			otherErrors: ['Wystąpił błąd serwera!']
		});
	}
});

app.post('/quiz-results', async (req, res) => {
	const fireTruck = req.body.fireTruck.toString();
	const seconds = req.body.seconds.toString();
	const points = req.body.points.toString();

	if(!validator.isNumeric(fireTruck, { no_symbols: true })) {
		res.status(400);
		res.json({
			fieldErrors: {
				'fire-truck': ['Podane ID musi być liczbą (całkowitą)!']
			},
			otherErrors: []
		});
		return;
	}

	if(fireTruck <= 0) {
		res.status(400);
		res.json({
			fieldErrors: {
				'fire-truck': ['Podane ID musi być większe od 0!']
			},
			otherErrors: []
		});
		return;
	}

	try {
		const truckExists = (await db.any('SELECT id FROM fire_truck WHERE id = $1', [fireTruck])).length != 0;
		if(!truckExists) {
			res.status(404);
			res.json({
				fieldErrors: {
					'fire-truck': ['Wóz o podanym ID nie istnieje!']
				},
				otherErrors: []
			});
			return;
		}
	} catch(error) {
		res.status(500);
		res.json({
			fieldErrors: {},
			otherErrors: ['Wystąpił błąd serwera!']
		});
		return;
	}

	/* Walidacje dla seconds */

	if(!validator.isNumeric(seconds, { no_symbols: true })) {
		res.status(400);
		res.json({
			fieldErrors: {
				'seconds': ['Sekundy muszą być liczbą całkowitą!']
			},
			otherErrors: []
		});
		return;
	}

	if(seconds <= 0) {
		res.status(400);
		res.json({
			fieldErrors: {
				'seconds': ['Sekundy muszą być większe od 0!']
			},
			otherErrors: []
		});
		return;
	}	

	/* Walidacje dla points */

	if(!validator.isNumeric(seconds, { no_symbols: true })) {
		res.status(400);
		res.json({
			fieldErrors: {
				'points': ['Punkty muszą być liczbą całkowitą!']
			},
			otherErrors: []
		});
		return;
	}

	if(points < 0 || points > 10) {
		res.status(400);
		res.json({
			fieldErrors: {
				'points': ['Punkty muszą być w przedziale 0-10!']
			},
			otherErrors: []
		});
		return;
	}

	if(!req.session.accountNickname) {
		// Zapis do sesji
		if(!req.session.quizResults) {
			req.session.quizResults = [];
		}

		if(req.session.quizResults.length == 10) {
			req.session.quizResults.shift();
		}

		req.session.quizResults.push({ fireTruckID: fireTruck, seconds, points });
	} else {
		// Zapis na konto
		try {
			await db.none('INSERT INTO score (account_nickname, fire_truck_id, points, seconds)\
					VALUES ($1, $2, $3, $4)', [req.session.accountNickname, fireTruck, points, seconds]);
		} catch(error) {
			console.error(error);
			res.status(500);
			res.json({
				fieldErrors: {},
				otherErrors: ['Wystąpił błąd serwera!']
			});
			return;
		}
	}

	res.sendStatus(204);
});

// This should remain at the end of all routes
// It will direct every not matched route to index.html file
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
	console.log(`Skrytka.app słucha na porcie ${port}...`);
});
