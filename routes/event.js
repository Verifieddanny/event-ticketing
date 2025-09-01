const express = require('express');

const eventController = require('../controllers/event');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.redirect('/events')
});

router.get('/events', eventController.getEvents)
router.get('/events/:id', eventController.getEvent);
router.post('/bookings', eventController.postBooking)


module.exports = router;
