if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const PORT = parseInt(process.env.PORT || '3000', 10);

// Native Modules
const path = require('path');



// Third Party Modules
const express = require('express');

// Custom Modules
const sequelize = require('./utils/database');
const rootDir = require('./utils/path');

// App Initialization
const app = express();

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", "views");

// App Routes
const eventRoutes = require('./routes/event');
const adminRoutes = require('./routes/admin');
const pageNOtFoundRoutes = require('./routes/404');

// Models 
const Event = require('./models/Event')
const TicketType = require('./models/TicketType')
const Booking = require('./models/Booking')
const BookingItem = require('./models/BookingItem')

app.use(express.static(path.join(rootDir, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(eventRoutes);
app.use(pageNOtFoundRoutes);


Event.hasMany(TicketType);
Booking.belongsToMany(TicketType, { through: BookingItem});
TicketType.belongsToMany(Booking, { through: BookingItem })



sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        app.get('/health', (req, res) => res.status(200).send('ok'));
        app.listen(PORT, '0.0.0.0', () => { console.log("Listening on ", PORT)});
    })
    .catch(err => {
        console.log(err);
    });