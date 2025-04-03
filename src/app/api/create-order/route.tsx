import { NextResponse } from "next/server";
import Razorpay from 'razorpay'

export async function POST(req:Request) {
  const {amount}=await req.json();
  try {

    const razorpay = new Razorpay({
        key_id: process.env.PAYMENT_KEY_ID,
        key_secret: process.env.PAYMENT_KEY_SECRET,
      });

      const options = {
        amount: amount * 100, 
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options)

       return NextResponse.json({order:order},{status:200})

} catch (error) {
    return NextResponse.json({message:"payment related internal server error !!"},{status:500})
}
}
