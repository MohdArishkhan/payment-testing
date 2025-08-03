import Razorpay from 'razorpay';
import crypto from 'crypto';

export const createOrder = async (req, res) => {
  try {
    console.log("🔔 createOrder endpoint hit!");

    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: req.body.amount || 1000, // amount in paise
      currency: 'INR',
      receipt: 'order_rcptid_' + Math.floor(Math.random() * 10000),
    };

    const order = await instance.orders.create(options); // ✅ First create
    console.log("✅ Razorpay order created:", order);

    res.json({ orderId: order.id }); // ✅ Then respond
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log("✅ Expected Signature:", expectedSignature);

    if (expectedSignature === razorpay_signature) {
      console.log("🎉 Payment verification SUCCESS");
      res.status(200).json({  success: true, message: "Payment verified successfully" });
    } else {
      console.warn("⚠️ Signature MISMATCH");
      res.status(400).json({ failure :true , message: "Invalid signature" });
    }

  } catch (error) {
    console.error("❌ Verification error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};