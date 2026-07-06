const express = require('express');
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

router.route('/my')
  .get(protect, getMyOrders);

router.route('/:id/status')
  .put(protect, admin, updateOrderStatus);

module.exports = router;
