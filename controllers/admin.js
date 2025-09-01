const Event = require("../models/Event");
const TicketType = require("../models/TicketType");
const { extractTicketTypes } = require("../utils/utils");

exports.getAdminForm = (req, res, next) => {
  res.render("admin/event-form", {
    mode: "create",
    event: null,
    ticketTypes: [],
  });
};

exports.postEventForm = (req, res, next) => {
  Event.create({
    title: req.body.title,
    date: req.body.date,
    venue: req.body.venue,
    isPublished: req.body.isPublished,
  })
    .then((event) => {
      const ticketTypesArray = extractTicketTypes(req.body);
      ticketTypesArray.forEach((ticketType) => {
        event.createTicketType({
          name: ticketType.name,
          price: Number(ticketType.price),
          capacity: Number(ticketType.capacity),
        });
      });
    })
    .then((result) => res.redirect("/"))
    .catch((err) => {
      console.log(err);
    });
};

exports.getEvents = (req, res, next) => {
  Event.findAll().then((events) => {
    res.render("admin/event-list", {
      events: events,
    });
  });
};

exports.getEditForm = (req, res, next) => {
  const eventId = req.params.id;
  Event.findByPk(eventId, {
    include: [{ model: TicketType }],
  })
    .then((event) => {
      const eventData = event.get({ plain: true });
      eventData.date = new Date(event.date).toISOString().slice(0, 16);
      res.render("admin/event-form", {
        mode: "edit",
        event: eventData,
        ticketTypes: event.ticketTypes,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditForm = (req, res, next) => {
  const eventId = req.params.id;
  Event.findByPk(eventId, {
    include: [{ model: TicketType }],
  })
    .then((event) => {
      if (!event) {
        res.redirect("/");
      }
      event.title = req.body.title;
      event.date = req.body.date;
      event.venue = req.body.venue;
      event.isPublished = req.body.isPublished;
      return event.save();
    })
    .then((event) => {
      const ticketTypesArray = extractTicketTypes(req.body);
      // Update or create ticket types
      const promises = ticketTypesArray.map((ticketType) => {
        if (ticketType.id) {
          // Update existing
          return TicketType.findByPk(ticketType.id).then((tt) => {
            if (tt) {
              tt.name = ticketType.name;
              tt.price = Number(ticketType.price);
              tt.capacity = Number(ticketType.capacity);
              return tt.save();
            }
          });
        } else {
          // Create new
          return event.createTicketType({
            name: ticketType.name,
            price: Number(ticketType.price),
            capacity: Number(ticketType.capacity),
          });
        }
      });
      return Promise.all(promises);
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error updating event");
    });
};

exports.postDeleteFormTicketTypes = (req, res, next) => {
  const eventid = req.body.id;
  TicketType.findByPk(eventid)
    .then((event) => {
      event.destroy();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteEvent = (req, res, next) => {
  const eventid = req.params.id;
  Event.findByPk(eventid, {
    include: [{ model: TicketType }],
  })
    .then((event) => {
      if (!event) {
        return res.redirect("/");
      }

      event.ticketTypes.map(ticketType => ticketType.destroy());
      return event
    })
    .then(event => event.destroy())
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting event");
    });
};
