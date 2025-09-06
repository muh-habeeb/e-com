import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["initiated", "paid", "failed"],
      default: "initiated",
    },
    raw: { type: Object }, // keep full Razorpay response for debugging
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
