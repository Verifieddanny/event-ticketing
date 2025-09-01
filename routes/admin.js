const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/events/new', adminController.getAdminForm);

router.post('/events/new', adminController.postEventForm);

router.get('/events', adminController.getEvents);

router.get('/events/:id/edit', adminController.getEditForm)

router.post('/events/:id', adminController.postEditForm)

router.post('/deleteTicketType', adminController.postDeleteFormTicketTypes)

router.post('/events/:id/delete', adminController.postDeleteEvent)

module.exports = router;