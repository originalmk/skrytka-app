![Logo skrytki](skrytka-small.png)
# skrytka.app
![Badge z licencją AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-9cf)

## About the project

Skrytka.App is an app, which development started in 2023 as one of [Zwolnieni z Teorii](https://zwolnienizteorii.pl/) community projects. Due to some organisational problems it wasn't finished, but I plan to complete it in the future. Key (planned) features of this app are providing quizes for various fire engines, scores, statistics, ability to manage the engines (especially it should be easy to add new ones), including ability to modify type of equipment and its placement. We believe that our app will improve reaction time during fire-fighting, which is crucial to successfully protect live or property.

We are a team of 6 people: Mikołaj Głowacki, Jan Iłowski, Paweł Kubica, Laura Surowiec, Maciej Krzyżanowski (me), Stanisław Piust.

## Running the app

**Be aware that this app is not stable (or finished) yet and new commits may introduce breaking changes**

To start this application you need to:

1. You can use `git clone https://github.com/Skrytka-App/Skrytka.App` to download this app.
2. Configure database
    - Install PostgreSQL DBMS
    - Setup some database and user with permissions to it
    - Create .env file in the main directory and fill it in with fields DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME and COOKIE_SECRET. In case of confusion you may check exemplary .env file saved as .env.example in the root directory of this repository.
3. Run `npm install` in the main directory.
4. Run SQL migrations. To do that you should have knex installed globally too (npm install knex -g) and then execute `knex migrate:latest` in the root directory. For app to be usable it is also recommended to insert some data to the database.
    - Note: Images should be added in media/images directory and image paths inserted into database should only contain part starting with images/ for example image may be uploaded at media/images/wozLEFT.webp and path in database should be images/wozLEFT.webp.
5. Run `npm install` in the client directory.
6. Run `npm build` in the client directory. 
    - You need to do this after every update of app's frontend (you can do it every time you pull new version of this app).
7. Run `npm start` in the main directory
8. App will run on localhost:5000

Note: pm2 or/and nginx may be used to run this app for production

## Updating

1. Stop the app. Execute `pm2 stop <your-app-name>` if you use pm2.
2. Use `git pull` to get latest changes.
3. Run `knex migrate:latest` in the root directory. Remember you need to have knex installed both globally and locally (it is in package.json so if you run `npm install` you will have it installed) to do that.
4. Go to client directory and enter `npm build`.
5. Start the app. If you use pm2, exectue `pm2 start <your-app-name>`.

## Contributing
You are welcome to help us create Skrytka. Just remember to dicuss what you want to work (specified issue - if there is no one then you should create one for that).
Code contributed should be tested to work correctly!
