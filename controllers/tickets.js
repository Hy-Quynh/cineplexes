const asyncHandler = require('express-async-handler');
const Movies = require('../model/movies');
const Booking = require('../model/booking');
const Cineplex = require('../model/cineplexes');
const Cinemas = require('../model/cinemas');
const Showtime = require('../model/showtime');
const Ticket = require('../model/tickets');
const User = require('../model/users');
const SendEmail = require('./send-mail');

module.exports = {
  GET_BOOKING_MOVIE: asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    const bookingMovie = await Movies.findByIdBooking(movieId);
    const cineplexes = await Cineplex.findAllCineplexOfShowtime(movieId);
    if(cineplexes.length == 0 || !cineplexes) return res.render('tickets/booking', { message: 'No showtimes at the moment', bookingMovie, cineplexes });
    res.render('tickets/booking', {
      bookingMovie,
      cineplexes
    });
  }),
  BOOKING_MOVIE: asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    const bookingMovie = await Movies.findByIdBooking(movieId);
    const cineplexes = await Cineplex.findAllCineplexOfShowtime(movieId);
    res.render('tickets/booking', {
      bookingMovie,
      cineplexes
    });
  }),
  GET_CINEMA_BOOKING: asyncHandler(async (req, res) => {
    const { cineplexId, movieId } = req.body;
    const cinemas = await Showtime.findAllByCineplex(cineplexId, movieId);
    if(cinemas.length == 0 || !cinemas ) return res.status(400).json({ message: 'There are currently no screenings at this cineplexes' });
    res.status(200).json({
      cinemas
    });
  }),
  GET_SEAT_PLAN: asyncHandler(async (req, res) => {
    const { selectedCinemaAndCineplex } = req.params;
    const selectedCinemaAndShowAt = JSON.parse(decodeURIComponent(selectedCinemaAndCineplex));
    const info = await Ticket.getBookingInformation(selectedCinemaAndShowAt.movieId,selectedCinemaAndShowAt.cinemaId, selectedCinemaAndShowAt.showAt);
    res.render('tickets/seats', {
      info
    });
  }),
  GET_SELECTED_SEAT_FARE: asyncHandler(async (req, res) => {
    const { movieId, cinemaId, showAt } = req.query;
    const selected = await Ticket.findAllSelectedSeatByCinemaAndMovie(movieId, cinemaId, showAt);
    const ticket = await Ticket.getFare(movieId, cinemaId, showAt);
    res.status(200).json({
      status: 'sucesss',
      selected,
      ticket
    });
  }),
  BOOKING_SEAT: asyncHandler(async (req, res) => {
    const { dataSelectedSeatsAndTotal } = req.params;
    const selectedSeatsAndTotal = JSON.parse(decodeURIComponent(dataSelectedSeatsAndTotal));
    const info = await Ticket.getBookingInformation(selectedSeatsAndTotal.movieId, selectedSeatsAndTotal.cinemaId, selectedSeatsAndTotal.showAt);
    res.status(200).json({
      selectedSeats: JSON.parse(selectedSeatsAndTotal.selectedSeats),
      totalPrice: selectedSeatsAndTotal.totalPrice,
      info
    });
  }),
  GET_CHECKOUT: asyncHandler(async (req, res) => {
    const { encoded } = req.params;
    const data = JSON.parse(decodeURIComponent(encoded));
    res.render('tickets/checkout', {
      selectedSeats: data.selectedSeats,
      totalPrice: data.totalPrice,
      info: data.info
    });
  }),
  TICKET_PAYMENT: asyncHandler(async (req, res) => {
    const { encoded } = req.params;
    const { userID } = req.session;
    const data = JSON.parse(decodeURIComponent(encoded));
    const dataInsert = JSON.stringify({
      userId: userID,
      movieId: data.movieId,
      cinemaId: data.cinemaId,
      createdAt: data.currentDate,
      total: data.totalPrice,
      showAt: data.showAt
    })
    const booking = await Booking.addBooking(dataInsert);
    const bookingId = booking[0]._bookingID;
    let ticketBookingList = [];
    for (const value of data.selectedSeats){
      const row = value.charAt(0);
      const column = value.substring(1);
      const ticket = JSON.stringify({
        bookingId: bookingId,
        seatCode: value,
        row: row,
        column: column,
        price: data.fare
      });
      const ticketInsert = await Ticket.addTicket(ticket);
      ticketBookingList.push(ticketInsert[0]);
    };
    const user = await User.info(userID);
    const infoMovie = await Ticket.getBookingInformation(data.movieId, data.cinemaId, data.showAt);
    const ticketInfo = JSON.stringify({
      listInsertedTickets: ticketBookingList,
      infoMovie: infoMovie,
      createdAt: data.currentDate,
      total: data.totalPrice,
    });
    SendEmail.TICKET_PAYMENT_SEND_MAIL(user.email, user.fullName, ticketInfo);
    res.redirect('/ticket/confirm-payment');
  }),
  CONFIRM_PAYMENT: asyncHandler(async (req, res) => {
    res.render('tickets/confirm-payment');
  }),
  TEST: asyncHandler(async (req, res) => {
    res.render('tickets/test');
  }),
  notification: asyncHandler(async (req, res) => {
    res.render('tickets/noti');
  })
};
