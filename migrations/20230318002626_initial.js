/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.createTable('osp_unit', function (table) {
		table.increments();
		table.string('name')
			.notNullable();
		table.string('locality')
			.notNullable()
			.checkRegex('[A-ZĄĆĘŁŃÓŚŹŻ][A-zĄĆĘŁŃÓŚŹŻząćęłńóśźż. ]+');
	}).createTable('fire_truck', function (table) {
		table.increments();
		table.string('name')
			.notNullable();
		table.string('image_path')
			.notNullable()
			.checkRegex('^([0-9A-Za-z_]+/{0,1})*[0-9A-Za-z_]+\.((png)|(jpg)|(jpeg)|(webp))$');
		table.integer('osp_unit_id')
			.unsigned()
			.notNullable()
			.references('id').inTable('osp_unit')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
	}).createTable('truck_side', function (table) {
		table.increments();
		table.string('image_path')
			.notNullable()
			.checkRegex('^([0-9A-Za-z_]+/{0,1})*[0-9A-Za-z_]+\.((png)|(jpg)|(jpeg)|(webp))$');
		table.integer('ordinal_number')
			.notNullable();
		table.integer('fire_truck_id')
			.unsigned()
			.notNullable()
			.references('id').inTable('fire_truck')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
	}).createTable('cache', function (table) {
		table.increments();
		table.string('name')
			.notNullable();
		// I think it may be reasonable to eliminate using Box type as it is not well supported by JS tools
		table.specificType('rectangle', 'box')
			.notNullable();
		table.integer('truck_side_id')
			.unsigned()
			.notNullable()
			.references('id').inTable('truck_side')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
		table.check('(rectangle[0])[0] <= 1 AND (rectangle[0])[0] >= 0 AND (rectangle[0])[1] <= 1 AND (rectangle[0])[1] >= 0 AND (rectangle[1])[0] <= 1 AND (rectangle[1])[0] >= 0 AND (rectangle[1])[1] <= 1 AND (rectangle[1])[1] >= 0');
	}).createTable('equipment', function (table) {
		table.increments();
		table.string('name')
			.notNullable();
		table.integer('cache_id')
			.notNullable()
			.references('id')
			.inTable('cache');
	}).createTable('account', function (table) {
		table.string('nickname')
			.primary()
			.checkRegex('^[0-9A-z_żółćęśąźńŻÓŁĆĘŚĄŹŃ]{3,}$');
		table.string('name')
			.checkRegex('^[A-ZŻÓŁĆĘŚĄŹŃ][a-zżółćęśąźń]+$');
		table.string('surname')
			.checkRegex('^[A-ZŻÓŁĆĘŚĄŹŃ][a-zżółćęśąźń]+$');
		// TODO: Does it need any constraint?
		table.string('pass_hash')
			.notNullable();
		table.integer('default_osp')
			.unsigned()
			.references('id').inTable('osp_unit')
			.onUpdate('CASCADE')
			.onDelete('SET NULL');
	}).createTable('permission', function (table) {
		table.string('code')
			.primary()
			.checkRegex('^[0-9A-Z_]{3,}$');
		table.string('name')
			.checkLength('>=', 3);
		table.string('description');
	}).createTable('score', function (table) {
		table.increments();
		table.string('account_nickname')
			.notNullable()
			.references('nickname')
			.inTable('account')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
		table.timestamp('got_at')
			.notNullable()
			.defaultTo(knex.fn.now());
		table.integer('fire_truck_id')
			.unsigned()
			.notNullable()
			.references('id').inTable('fire_truck')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
		table.integer('points')
			.notNullable()
			.checkBetween([0, 10]);
		table.integer('seconds')
			.notNullable()
			.checkPositive();
	}).createTable('account_permission', function (table) {
		table.string('account_nickname')
			.notNullable()
			.references('nickname')
			.inTable('account')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
		table.string('permission_code')
			.notNullable()
			.references('code')
			.inTable('permission')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
		table.integer('osp_unit_id')
			.notNullable()
			.references('id')
			.inTable('osp_unit')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
		table.primary(
			['account_nickname',
			'permission_code',
			'osp_unit_id']
		);
	}).createTable('event', function (table) {
		table.increments();
		table.string('name')
			.notNullable()
			.checkLength('>=', 3);
		table.string('details');
		table.timestamp('report_time')
			.notNullable();
		table.string('account_nickname')
			.notNullable()
			.references('nickname')
			.inTable('account')
			.onUpdate('CASCADE')
			.onDelete('SET NULL');
		table.integer('osp_unit_id')
			.notNullable()
			.references('id')
			.inTable('osp_unit')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
		table.check('report_time <= now() AND date_part(\'hour\', CURRENT_TIMESTAMP - report_time) < 1');
	}).raw(
		`
		CREATE FUNCTION get_units_list(prefix VARCHAR)
		RETURNS TABLE (id INTEGER, name VARCHAR, locality VARCHAR) AS
		$func$
		    SELECT id, name, locality FROM osp_unit
		    WHERE LOWER(locality) LIKE LOWER('%' || prefix || '%')
		       OR LOWER(name) LIKE LOWER('%' || prefix || '%')
		    ORDER BY locality, name LIMIT 3;
		$func$
		LANGUAGE SQL;
		`
	).raw(
		`
		CREATE FUNCTION get_trucks_list_with_scores(osp_unit INTEGER, nickname VARCHAR, last_scores_num INTEGER = 3)
    		RETURNS TABLE (id INTEGER, name VARCHAR, image_path VARCHAR, avg_percent FLOAT) AS
		$func$
	    	SELECT ft.id, name, image_path, ROUND(AVG(s.points) * 10, 2) AS avg_percent
		FROM fire_truck ft
		JOIN score s ON ft.id = s.fire_truck_id AND s.account_nickname = nickname
		WHERE ft.osp_unit_id = osp_unit AND s.id IN (
			SELECT sc.id FROM score sc
			WHERE sc.account_nickname = nickname AND sc.fire_truck_id = ft.id
			ORDER BY sc.got_at DESC
			LIMIT last_scores_num
		) GROUP BY ft.id, name, image_path
		UNION
		(SELECT ft.id, name, image_path, 0
			FROM fire_truck ft
			WHERE ft.osp_unit_id = osp_unit AND
				ft.id NOT IN (SELECT fire_truck_id FROM score WHERE account_nickname = nickname))
		ORDER BY 1;
		$func$
	LANGUAGE SQL;
		`
	).raw(
		`
		CREATE FUNCTION get_quiz_data_for_truck(truck_id INTEGER)
		    RETURNS TABLE (side_id INTEGER, side_image_path VARCHAR, cache_id INTEGER,
			cache_rectangle BOX, cache_name VARCHAR) AS
		$func$
		    SELECT ts.id, ts.image_path, c.id, c.rectangle, c.name
		    FROM fire_truck
			JOIN truck_side ts on fire_truck.id = ts.fire_truck_id
			JOIN cache c on ts.id = c.truck_side_id
		    WHERE fire_truck.id = truck_id
		    ORDER BY ts.ordinal_number;
		$func$
		LANGUAGE SQL;
		`
	).raw(
		`
		CREATE FUNCTION get_random_question(truck_id INTEGER)
		    RETURNS TABLE (cache_id INTEGER, equipment_name VARCHAR) AS
		$func$
		    SELECT c.id, e.name
		    FROM truck_side ts
		    JOIN cache c on ts.id = c.truck_side_id
		    JOIN equipment e on c.id = e.cache_id
		    WHERE ts.fire_truck_id = truck_id
		    ORDER BY RANDOM()
		    LIMIT 1;
		$func$
		LANGUAGE SQL;
		`
	).raw(
		`
		CREATE TABLE user_session (
		  "sid" varchar NOT NULL COLLATE "default",
		  "sess" json NOT NULL,
		  "expire" timestamp(6) NOT NULL
		)
		WITH (OIDS=FALSE);

		ALTER TABLE user_session ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

		CREATE INDEX "IDX_session_expire" ON user_session ("expire");
		`
	);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
 	return new Promise(async (resolve, reject) => {
		await knex.schema
			.dropTableIfExists('event')
			.dropTableIfExists('account_permission')
			.dropTableIfExists('permission')
			.dropTableIfExists('score')
			.dropTableIfExists('account')
			.dropTableIfExists('equipment')
			.dropTableIfExists('cache')
			.dropTableIfExists('truck_side')
			.dropTableIfExists('fire_truck')
			.dropTableIfExists('osp_unit')
			.dropTableIfExists('user_session');

		await knex.raw('DROP FUNCTION IF EXISTS get_units_list');
		await knex.raw('DROP FUNCTION IF EXISTS get_trucks_list_with_scores');
		await knex.raw('DROP FUNCTION IF EXISTS get_quiz_data_for_truck');
		await knex.raw('DROP FUNCTION IF EXISTS get_random_question'); 

		resolve();
	});
}
