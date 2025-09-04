import express from "express";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

import asyncHandler from "../middlewares/asyncHandler.js";
import mongoose from "mongoose";

//utiliy function

function calcPrice(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 1000 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);
  const totalPrice = (
    itemsPrice +
    shippingPrice +
    parseFloat(taxPrice)
  ).toFixed(2);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice,
    totalPrice,
  };
}

const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  // 🚫 Validate order items
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({
      request: "fail",
      message: "No order items provided",
      error: "ORDER_ITEMS_REQUIRED",
    });
  }

  // 📦 Fetch product details from DB
  const productsInDB = await Product.find({
    _id: { $in: orderItems.map((item) => item._id) },
  });

  if (productsInDB.length !== orderItems.length) {
    return res.status(404).json({
      request: "fail",
      message: "Some products were not found in the database",
      error: "PRODUCTS_NOT_FOUND",
    });
  }

  // 🔁 Match client order items with DB data
  const formattedOrderItems = orderItems.map((clientItem) => {
    const dbItem = productsInDB.find(
      (p) => p._id.toString() === clientItem._id
    );

    return {
      name: dbItem.name,
      qty: clientItem.qty,
      image: dbItem.image,
      price: dbItem.price, // trust server price
      product: dbItem._id,
    };
  });

  // 💰 Calculate pricing
  const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
    calcPrice(formattedOrderItems);

  // 📝 Create order
  const order = new Order({
    orderItems: formattedOrderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid: false,
  });

  const createdOrder = await order.save();

  return res.status(201).json({
    request: "success",
    MESSAGE: "ORDER_CREATED",
    message: "Order created successfully",
    createdOrder,
  });
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id username");
    return res.status(200).json({
      request: "success",
      message: "all orders",
      MESSAGE: "ALL_ORDERS",
      length: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      request: "success",
      message: "Internal server error",
      error: error.message,
    });
  }
});

const getUserOrder = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    return res.status(200).json({
      request: "success",
      message: "all orders bu user",
      MESSAGE: "ALL_ORDERS_BY_USER",
      length: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      request: "success",
      message: "Internal server error",
      error: error.message,
    });
  }
});

const total_order_count = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.countDocuments();

    return res.status(200).json({
      request: "success",
      message: "total orders",
      MESSAGE: "TOTAL_ORDERS",

      orders,
    });
  } catch (error) {
    return res.status(500).json({
      request: "success",
      message: "Internal server error",
      error: error.message,
    });
  }
});

const calculateTotalSales = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    return res.status(200).json({
      request: "success",
      message: "total sales",
      MESSAGE: "TOTAL_SALES",
      totalSales,
    });
  } catch (error) {
    return res.status(500).json({
      request: "success",
      message: "Internal server error",
      error: error.message,
    });
  }
});

const calculateTotalSalesBYDate = asyncHandler(async (req, res) => {
  try {
    const salesBydate = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    return res.status(200).json({
      request: "success",
      message: "total sales",
      MESSAGE: "TOTAL_SALES",
      salesBydate,
    });
  } catch (error) {
    return res.status(500).json({
      request: "fail", // <-- corrected to 'fail'
      message: "Internal server error",
      error: error.message,
    });
  }
});

const findOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (order) {
      return res.status(200).json({
        request: "success",
        message: "order found",
        MESSAGE: "ORDER_FOUND",
        order,
      });
    } else {
      return res.status(404).json({
        request: "success",
        message: "order not found",
        MESSAGE: "ORDER_NOT_FOUND",
        error: "Order Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      request: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
});

const markOrderAsPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(escape(req.params.id));
    if (order) {
      console.log(req.body)
      order.isPaid = true;
      order.paidAt = Date.now(); // typo fixed: "padAt" → "paidAt"
      order.paymentResult = {
        id: req.body.razorpay_payment_id, // Razorpay field
        status: "completed", // you can mark manually
        update_time: Date.now(), // since Razorpay doesn't send
        email: req.user ? req.user.email : "guest", // if logged-in user
      };
      const updatedOrder = await order.save();
      return res.status(201).json({
        request: "success",
        updatedOrder,
      });
    } else {
      return res.status(404).json({
        request: "success",
        message: "order not found",
        MESSAGE: "ORDER_NOT_FOUND",
        error: "Order not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      request: "success",
      message: "Internal server error",
      error: error.message,
    });
  }
});

const markOrderAsDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      console.log("ok");

      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      return res.status(201).json({
        request: "success",
        updatedOrder,
      });
    } else {
      return res.status(404).json({
        request: "success",
        message: "order not found",
        MESSAGE: "ORDER_NOT_FOUND",
        error: "Order Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      request: "success",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export {
  createOrder,
  getAllOrders,
  getUserOrder,
  findOrderById,
  total_order_count,
  calculateTotalSales,
  calculateTotalSalesBYDate,
  markOrderAsPaid,
  markOrderAsDelivered,
};
