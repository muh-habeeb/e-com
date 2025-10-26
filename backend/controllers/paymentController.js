import Razorpay from "razorpay";
import asyncHandler from "../middlewares/asyncHandler.js";
import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import Payment from "../models/paymentModel.js";
const rKey=process.env.RAZORPAY_KEY_ID;
const rSecret=process.env.RAZORPAY_KEY_SECRET;
if(!rKey&&!rSecret||!rSecret||!rKey){
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  console.log("++++++++  RAZORPAY KEYS ARE NOT SET IN ENV  ++++++++++")
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
      process.exit(1);

}
else{

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // use env, not hardcode
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}
  
  // @desc    Create Razorpay order
  // @route   POST /api/payment/razorpay-order
  // @access  Private

const createRazorpayOrder = asyncHandler(async (req, res) => {
  let { amount } = req.body;
  if (!amount) {
    return res.status(400).json({ message: "Amount is required" });
  }
  amount = Math.round(Number(amount) * 100);
// console.log(amount);

  const options = {
    amount,
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    amount = amount / 100
    // ✅ Save payment init
    await Payment.create({
      razorpayOrderId: order.id,
      user: req.user?._id,
      amount,
      status: "initiated",
      razorpayRawData: order,
    });
        return res.status(201).json(order);
  } catch (error) {
    console.error("Razorpay error:", error);
    return res.status(500).json({
      message: error.description || "Razorpay error",
      error,
    });
  }
});

// @desc    Verify Razorpay payment
// @route   POST /api/payment/verify
// @access  Private (should be, since order creation is private)
const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
    
    if (expectedSignature === razorpay_signature) {
      // ✅ Update DB record
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: "paid",
        },
        { new: true }
      );

      return res.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error verifying Razorpay payment");
  }
};

const exportPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find().populate("user", "name email");
  res.json(payments);
});
export { createRazorpayOrder, verifyRazorpayPayment, exportPayments };
