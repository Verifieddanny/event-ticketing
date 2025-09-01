const crypto = require("crypto");
const Booking = require("../models/Booking");
const Event = require("../models/Event");
const TicketType = require("../models/TicketType");
const { extractTicketTypesBooking } = require("../utils/utils");
const BookingItem = require("../models/BookingItem");

exports.getEvents = (req, res, next) => {
  const perPage = 3;
  const page = req.query.page ? Number(req.query.page) : 1;

  Event.findAndCountAll({
    limit: perPage,
    offset: (page - 1) * perPage,
  })
    .then((eventsFetched) => {
      res.render("events/index", {
        events: eventsFetched.rows,
        perPage: perPage,
        total: eventsFetched.count,
        page: page,
        q: "search",
      });
    })
    .catch((err) => console.log(err));
};

exports.getEvent = (req, res, next) => {
  const eventId = req.params.id;
  Event.findByPk(eventId, {
    include: [{ model: TicketType }],
  }).then((event) => {
    res.render("events/detail", {
      event: event,
      ticketTypes: event.ticketTypes,
      prefill: {
        buyerName: "",
        buyerEmail: "",
      },
    });
  });
};

exports.postBooking = (req, res, next) => {
  const reference = crypto.randomBytes(8).toString("hex");
  Booking.create({
    buyerName: req.body.buyerName,
    buyerEmail: req.body.buyerEmail,
    reference: reference,
  })
    .then((booking) => {
      const ticketTypes = extractTicketTypesBooking(req.body);
      const bookingItems = ticketTypes.map((ticketType) => ({
        bookingId: booking.id,
        ticketTypeId: ticketType.ticketTypeId,
        quantity: ticketType.quantity,
      }));

      BookingItem.bulkCreate(bookingItems);
    })
    .then((result) => res.redirect("/"))
    .catch((err) => console.error(err));
};
