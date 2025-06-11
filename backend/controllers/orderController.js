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
  try {
    const { orderItems, shippingAddress, paymentMethode } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({
        request: "success",
        message: "invalid data provided",
        error: "orderItems is required",
        MESSAGE: "INVALID_DATA",
      });
    }

    itemFromDB = await Order.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );
      if (!matchingItemFromDB) {
        return res.status(404).json({
          request: "success",
          message: "product not found",
          MESSAGE: "NO_PRODUCT",
        });
      }
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrice(orderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethode,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json({
      request: "success",
      createOrder,
    });
  } catch (error) {
    return res.status(500).json({
      request: "success",
      message: "Internal server error",
      error: error.message,
    });
  }
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
      request: "success",
      message: "Internal server error",
      error: error.message,
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
        message: "total sales",
        MESSAGE: "TOTAL_SALES",
        salesBydate,
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
const markOrderAsPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.padAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email: req.body.payer.email,
      };
      const updatedOrder = await Order.save();
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
const markOrderAsDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
     
      const updatedOrder = await Order.save();
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
