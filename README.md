# skrytka.app
To start this application you need to:
1. Configure database
    - Install PostgreSQL DBMS
    - Setup some database and user with permissions to it
    - Create .env file in the main directory and fill it in with fields DB_USER, DB_PASS, DB_HOST, DB_PORT and DB_NAME. In case of confusion you may check exemplary .env file saved as .env.example in the root directory of this repository.
2. Run both SQL scripts, which are located in the main directory. For app to be usable it is also recommended to insert some data to the database.
3. Run `npm start` in the main directory
4. Run `npm start` in the client/ directory
5. App will run on localhost:3000
