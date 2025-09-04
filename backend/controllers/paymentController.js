import Razorpay from "razorpay";
import asyncHandler from "../middlewares/asyncHandler.js";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // use env, not hardcode
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay order
// @route   POST /api/payment/razorpay-order
// @access  Private
const createRazorpayOrder = asyncHandler(async (req, res) => {
  let { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ message: "Amount is required" });
  }

  if (amount > 500000) {
    return res.status(400).json({
      message: "Amount exceeds Razorpay limit of ₹5,00,000",
    });
  }

  const options = {
    amount: amount,
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };
console.log(amount)
  try {
    const order = await razorpay.orders.create(options);
    return res.status(201).json(order);
  } catch (error) {
    console.error("Razorpay error:", error);
    console.log(error);
    return res.status(500).json({
      message: error.description || "Razorpay error",
      error,
    });
  }
});
const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    console.log("from verifuaction", req.body);
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error verifying Razorpay payment");
  }
};

export { createRazorpayOrder, verifyRazorpayPayment };
