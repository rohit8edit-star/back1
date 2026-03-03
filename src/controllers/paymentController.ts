import { Request, Response } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import prisma from "../utils/prisma";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
});

export const createRazorpayOrder = async (req: Request, res: Response) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    const options = {
      amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
      currency,
      receipt,
      // Note: To restrict to UPI only, you should configure the Razorpay Checkout 
      // options on the frontend with: method: { upi: true }
      payment_capture: 1, // Auto capture
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "placeholder_secret")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment verified
      await prisma.order.update({
        where: { id: order_id },
        data: {
          status: "PAID",
          paymentId: razorpay_payment_id,
        },
      });
      return res.json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
