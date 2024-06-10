const Order = require('../models/order');

// Create a new order
exports.createOrder = async (req, res) => {
  const { productDetails, totalPrice, status } = req.body;

  try {
    const order = new Order({
      user: req.user._id,
      productDetails,
      totalPrice,
      status,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders for the authenticated user
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('productDetails.product').lean(); // Use lean for faster queries
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('productDetails.product').lean(); // Use lean for faster queries

    if (order && order.user.toString() === req.user._id.toString()) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
  const { productDetails, totalPrice, status } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (order && order.user.toString() === req.user._id.toString()) {
      order.productDetails = productDetails || order.productDetails;
      order.totalPrice = totalPrice || order.totalPrice;
      order.status = status || order.status;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteOrder = async (req, res) => {
  try {
    console.log('Attempting to delete order with ID:', req.params.id);
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      console.log('Order not found:', req.params.id);
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    console.error('Error deleting order:', error.message, error.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Generate sales report
exports.getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const matchStage = {
      $match: {
        status: 'Completed',
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    };

    const groupStage = {
      $group: {
        _id: null,
        totalSales: { $sum: '$totalPrice' },
        totalOrders: { $sum: 1 },
        totalQuantity: { $sum: { $sum: '$productDetails.quantity' } },
      },
    };

    const projectStage = {
      $project: {
        _id: 0,
        totalSales: 1,
        totalOrders: 1,
        totalQuantity: 1,
      },
    };

    const salesReport = await Order.aggregate([matchStage, groupStage, projectStage]);
    res.json(salesReport[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

