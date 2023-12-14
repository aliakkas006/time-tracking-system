# Time Tracking System

## [Software Requirements Specification](https://ali-akkas.notion.site/Time-Tracking-System-e0d4c313feab4c20a62af520919772eb?pvs=4)
## Overview:
The Time Tracking System will provide features for user authentication, time entry logging, data storage, and weekly timesheet generation. The backend will handle user authentication, time entry management, and data storage, while the frontend will provide a user interface for interacting with the system.

## Technologies Used

- [Node.js](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express.js](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [JavaScript](https://www.typescriptlang.org/) - JavaScript is a scripting or programming language that allows us to implement complex features on web pages.
- [MySQL](https://www.postgresql.org/) - MySQL is the world's most popular open source database. According to DB-Engines, MySQL ranks as the second-most-popular database, behind Oracle Database.
- [Sequelize](https://mongoosejs.com/) - Sequelize is a Node.js based Object Relational Mapper that makes it easy to work with MySQL, MariaDB, SQLite, PostgreSQL databases, and more.

## Backend File Structure

```
backend/

├── package.json
└── src/
        ├── index.ts       // boot file
        ├── app.ts         // express app root file
        ├── middleware/
            └── authenticate.ts
            └── authorize.ts
            └── index.ts
        ├── routes/
        │   ├── auth.route.js
        │   ├── timeEntry.route.js
        │   ├── timeSheet.route.js
        │   ├── index.js
        ├── controllers/
            ├── auth.controller.js
        │   ├── timeEntry.controller.js
        │   ├── timeSheet.controller.js
        ├── services/
            ├── auth.service.js
        │   ├── timeEntry.service.js
        │   ├── timeSheet.service.js
            ├── token.service.js
        │   ├── user.service.js
        ├── model/
        │   ├── RefreshToken.js
        │   ├── TimeEntry.js
            ├── User.ts
        └── utils
```

## Setup
follow .env.example file for setup environment variables

### Install Dependencies:
```bash
yarn install
```

### Run the `application server`
```bash
yarn run dev
```


