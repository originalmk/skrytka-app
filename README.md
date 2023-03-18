![Logo skrytki](skrytka-small.png)
# skrytka.app
![Badge z licencją AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-9cf)

**Be aware that this app is not stable yet and new commits may introduce breaking changes**

To start this application you need to:

1. You can use `git clone https://github.com/Skrytka-App/Skrytka.App` to download this app.
2. Configure database
    - Install PostgreSQL DBMS
    - Setup some database and user with permissions to it
    - Create .env file in the main directory and fill it in with fields DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME and COOKIE_SECRET. In case of confusion you may check exemplary .env file saved as .env.example in the root directory of this repository.
3. Run SQL migrations. To do that you should have knex installed globally (npm install knex -g) and then execute `knex migrate:latest` in the root directory. For app to be usable it is also recommended to insert some data to the database.
    - Note: Images should be added in media/images directory and image paths inserted into database should only contain part starting with images/ for example image may be uploaded at media/images/wozLEFT.webp and path in database should be images/wozLEFT.webp.
4. Run `npm install` in the main directory.
5. Run `npm install` in the client directory.
6. Run `npm build` in the client directory. 
    - You need to do this after every update of app's frontend (you can do it every time you pull new version of this app).
7. Run `npm start` in the main directory
8. App will run on localhost:5000

Note: pm2 or/and nginx may be used to run this app for production

## Updating

1. Stop the app. Execute `pm2 stop <your-app-name>` if you use pm2.
2. Use `git pull` to get latest changes.
3. Run `knex migrate:latest` in the root directory. Remember you need to have knex installed globally to do that.
4. Go to client directory and enter `npm build`.
5. Start the app. If you use pm2, exectue `pm2 start <your-app-name>`.
