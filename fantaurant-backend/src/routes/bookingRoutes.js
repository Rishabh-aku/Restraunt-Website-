const express = require('express');
const { createBooking, getMyBookings, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, admin, getAllBookings);

router.route('/my')
  .get(protect, getMyBookings);

router.route('/:id/status')
  .put(protect, admin, updateBookingStatus);

module.exports = router;
