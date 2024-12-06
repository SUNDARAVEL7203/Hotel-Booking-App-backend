const express = require('express')
const Razorpay = require('razorpay')
const crypto = require('crypto')
require("dotenv").config()
const payment = require("./paymentmodel")


const router = express.Router();


const order = (req, res) => {
    const { amount } = req.body;

    try {
        const razorpayInstance = new Razorpay({
            key_id: "rzp_test_kc9OUenuliQsc3",
            key_secret: "9cQYT1BqJFRksHLMdO9mm7bC"
        });
        
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }
        
        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
            console.log(order)
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}

const verify =  async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;



    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Create ExpectedSign
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        // console.log(razorpay_signature === expectedSign);

        // Create isAuthentic
        const isAuthentic = expectedSign === razorpay_signature;

        // Condition 
        if (isAuthentic) {
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });

            // Save Payment 
            await payment.save();

            // Send Message 
            res.json({
                message: "Payement Successfully"
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}

module.exports = {
    order,
    verify
}