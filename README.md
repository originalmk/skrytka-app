![Logo skrytki](skrytka-small.png)
# skrytka.app
![Badge z licencją AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-9cf)

To start this application you need to:
1. Configure database
    - Install PostgreSQL DBMS
    - Setup some database and user with permissions to it
    - Create .env file in the main directory and fill it in with fields DB_USER, DB_PASS, DB_HOST, DB_PORT and DB_NAME. In case of confusion you may check exemplary .env file saved as .env.example in the root directory of this repository.
2. Run both SQL scripts, which are located in the main directory. For app to be usable it is also recommended to insert some data to the database.
    - Note: Images should be added in media/images directory and image paths inserted into database should only contain part starting with images/ for example image may be uploaded at media/images/wozLEFT.webp and path in database should be images/wozLEFT.webp.
3. Run `npm install` in the main directory.
4. Run `npm install` in the client directory.
5. Run `npm build` in the client directory. 
    - You need to do this after every update of app's frontend (you can do it every time you pull new version of this app).
6. Run `npm start` in the main directory
7. App will run on localhost:5000
Note: pm2 or/and nginx may be used to run this app for production
