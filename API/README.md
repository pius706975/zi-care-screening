# Lectronic Node.js (Back-end)
Lectronic is an e-commerce that provides electronic products such as headphone, audio speaker, etc.

## Tech Stack
### [Node JS](https://nodejs.org/en/about)
### [Javascript](https://devdocs.io/javascript/)
### [Express JS](https://expressjs.com/)
### [PostgreSQL](https://www.postgresql.org/)
### [Sequelize](https://sequelize.org/)

##
## Application installation steps
Install npm dependencies in the main folder that contains package.json so that npm will be initiated and all of the dependencies will be installed.
``` bash
  npm install
```

Example of environment variables. Copy this variables into your .env file.
``` bash
APP_PORT=8001
BASE_URL=http://localhost:8001

JWT_SECRET=Th1515jwt53Cr3t
REFRESH_TOKEN_SECRET=R3fr35hT0k3n53Cr3t

DB_HOST="localhost"
DB_NAME="clinic"
DB_USER="xxxx"
DB_PASSWORD="xxxxx"
DB_PORT=5432

MAIL_USER=crausherpius.17nichi@gmail.com
MAIL_PASS=gyyfkwlptoodiamd
```

##
## How to run this application?
Before execute database migration and seeds, check "config.json" in "src/database/config/config.json".
``` bash
  # You need to re-configure this configuration according to your db configuration values in .env. Check the example below.
{
  "development": {
    "username": "xxxx",
    "password": "xxxxx",
    "database": "clinic",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "xxxx",
    "password": "xxxxx",
    "database": "clinic_test",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "xxxx",
    "password": "xxxxx",
    "database": "clinic_production",
    "host": "localhost",
    "dialect": "postgres"
  }
}

``` 

If re-configure "config.json" is done, do database migration after creating database in postgreSQL.
``` bash
  # to create all tables
  npm run migrate:up

  # to drop all tables
  npm run migrate:down
```

Database seeds are provided. Use seeds if you don't want to create new data
``` bash
  npm run seed:up 
```

Start the server
``` bash
  npm start
  
  # or

  npm run dev
```

## Postman Documentation
### [Postman documentation](https://documenter.getpostman.com/view/26304983/2s9YR56Eev)