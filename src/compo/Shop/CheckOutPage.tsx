import { fetchtype } from "@/types/interface";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface razorpayType {
    razorpay_order_id: string,
    razorpay_payment_id   : string
    razorpay_signature : string
}

export default function CheckOutPage({ data, orderTotal }: { data?: fetchtype, orderTotal: number }) {

    const { data: session } = useSession();

    const routes = useRouter()

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if ((window as any).Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        const r1 = await loadRazorpayScript();

        if (!r1) {
            toast.error("Failed to load Razorpay. Check your internet connection.");
            return;
        }

        try {

            const res = await fetch(`/api/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: orderTotal })
            })

            if (res.ok) {

                const data = await res.json();
                const order = data.order;



                const options = {
                    key: process.env.NEXT_PUBLIC_PAYMENT_KEY_ID,
                    amount: order.amount,
                    currency: "INR",
                    name: "ShopCart",
                    description: "Booking Your House Confirm!!",
                    order_id: order.id,
                    image: `/images/logo/logo.png`,
                    handler: function (response:razorpayType) {
                      
                        // handelorder(response, order.id, order.amount)
                        routes.push('/yourorder');
                        toast.success("Payment Successful! Payment ID: " + response.razorpay_payment_id);

                    },
                    prefill: {
                        name: `${session?.user?.firstName}`,
                        email: `${session?.user?.email}`,
                        contact: "9787890745",
                    },
                    theme: {
                        color: "#3399cc",
                    },
                };

                const razorpay = new (window as any).Razorpay(options);
                razorpay.open();


            }
            else {
                const errmessage = await res.json();
                console.log(errmessage)
            }

        } catch (error) {
            console.log("client side payment internal server error", error)
        }
    }
    return (
        <div className='cart-checkout-box'>
            <div className='coupon'>
                <input type='button' value="Click to Pay " className="bg-orange-500 text-white font-bold" onClick={handlePayment} />
            </div>
        </div>
    )
}
