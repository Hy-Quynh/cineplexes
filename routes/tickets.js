const express =  require('express');
const ensureLoggedIn = require('../middlewares/ensure-logged-in');
const ticketsController = require('../controllers/tickets');
const router = express.Router();

// loggged
router.use(ensureLoggedIn);

// movie Booking
router.get('/booking/:movieId', ticketsController.GET_BOOKING_MOVIE);
router.post('/booking/:movieId', ticketsController.BOOKING_MOVIE);
// tickets
router.post('/booking', ticketsController.GET_CINEMA_BOOKING);
// Seats
router.get('/seat-plan/:selectedCinemaAndCineplex', ticketsController.GET_SEAT_PLAN);
router.post('/seat-plan/:dataSelectedSeatsAndTotal', ticketsController.BOOKING_SEAT);
router.get('/selected-seat', ticketsController.GET_SELECTED_SEAT_FARE);
//Checkout
router.get('/checkout/:encoded', ticketsController.GET_CHECKOUT);
router.get('/ticket-payment/:encoded', ticketsController.TICKET_PAYMENT);
// Confirm
router.get('/confirm-payment', ticketsController.CONFIRM_PAYMENT);


router.get('/test', ticketsController.TEST);
router.get('/noti', ticketsController.notification);
module.exports = router;
