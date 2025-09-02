# Event Ticketing, Sequelize + Express + EJS

A simple event ticketing app that I built to practice SQL, Sequelize and MVC on Node. People can create events, add ticket types, and make bookings. The admin pages are left open on purpose, this is a portfolio project so anyone can click around and test.

**Live demo**
[https://event-ticketing-production.up.railway.app](https://event-ticketing-production.up.railway.app)

## Features

* Events list and detail pages, EJS server side rendering
* Admin pages to create and edit events and ticket types
* Bookings with multiple ticket types per booking, quantities per line item
* Sequelize models and associations, MySQL storage
* Health endpoint at `/health`
* Production deploy on Railway

## Tech stack

* Node, Express, EJS
* Sequelize ORM, mysql2 driver
* MySQL database
* Railway for hosting
* Nodemon for local dev

## Data model

Tables and relationships:

* `Event` has many `TicketType`
* `Booking` belongs to many `TicketType` through `BookingItem`
* `TicketType` belongs to many `Booking` through `BookingItem`

Minimal fields used in this project:

```txt
Event:        id, title, venue, date, isPublished
TicketType:   id, eventId, name, price, capacity
Booking:      id, buyerName, buyerEmail, reference
BookingItem:  bookingId, ticketTypeId, quantity, unitPrice
```

## Routes

Public

* `GET /` redirects or renders the events list
* `GET /events` list all events
* `GET /events/:id` show one event with its ticket types
* `POST /bookings` create a booking from an items array

Admin

* `GET /admin/events` list events
* `GET /admin/events/new` new event form
* `GET /admin/events/:id/edit` edit event form
* `POST, PUT, DELETE` actions for events and ticket types as implemented

Errors and health

* `GET /health` returns ok
* `*` renders a friendly 404

## Project structure

```txt
controllers/   route handlers
models/        Sequelize models
routes/        Express routers
utils/         database and helpers
views/         EJS templates (partials, events, admin, bookings)
public/        static assets
app.js         entry point
```

## Environment variables

This app reads either my own `DB_*` names or Railway’s `MYSQL*` names. That makes local and production setups simple.

Used keys:

```
NODE_ENV
PORT

DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
MYSQLHOST, MYSQLPORT, MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD  (Railway)
```

## Local development

Requirements, Node 18 or newer, MySQL server.

1. Clone the repo, install packages

```bash
npm install
```

2. Create a `.env` in the project root

```env
NODE_ENV=development
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=event-ticket
DB_USER=root
DB_PASSWORD=password
```

3. Start the app for development

```bash
npm run start   # nodemon app.js
```

4. Open http, slash, slash, localhost, colon, 3000

On first run, `sequelize.sync()` will create the tables if they do not exist yet.

## Production on Railway

1. Push to GitHub
2. In Railway, create a project, add your GitHub repo as a Web Service
3. Add a MySQL database in the same Railway project
4. In the Web Service, set variables. Either map the Railway values to your names, or just rely on the `MYSQL*` keys that Railway injects.

Recommended variables on the Web Service:

```
NODE_ENV = production
# optional aliases, only if you prefer DB_* names in logs
DB_HOST = ${MYSQLHOST}
DB_PORT = ${MYSQLPORT}
DB_USER = ${MYSQLUSER}
DB_PASSWORD = ${MYSQLPASSWORD}
DB_NAME = ${MYSQLDATABASE}
```

5. Ensure the start command is `node app.js` in Railway. The app already listens on `process.env.PORT`, no need to set PORT manually.
6. Click Deploy. When it is green, hit your generated domain, for example `https://event-ticketing-production.up.railway.app`.

### Import sample data, optional

From your laptop, dump your local DB and import into Railway’s MySQL using the external connection values shown in the MySQL service.

```bash
mysqldump -u root -p event-ticket > dump.sql

mysql -h $MYSQLHOST -P $MYSQLPORT -u $MYSQLUSER -p$MYSQLPASSWORD $MYSQLDATABASE < dump.sql
```

## Troubleshooting

* `Unknown database 'event-ticket'`
  Your app is pointing to a DB name that does not exist on the server. Either set `DB_NAME=${MYSQLDATABASE}` on the Web Service, or create the database in the remote MySQL:

  ```sql
  CREATE DATABASE `event-ticket` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  ```

* `ECONNREFUSED`
  Check that `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` resolve to the Railway values. Do not use `localhost` in production.

* Blank page or 500
  Check Railway logs. The app includes a health route at `/health` to verify that the service is up.

## Security notes

This is a portfolio project. The admin pages are intentionally open so people can test the flow. In a real app you would add authentication, sessions, CSRF protection, and stricter validation.

## License

MIT. Feel free to learn from it and extend it.

## Acknowledgments

Thanks to the Node and Sequelize community for excellent docs and examples. Built while following Maximilian’s Node course and then extended with a custom ticketing flow.

