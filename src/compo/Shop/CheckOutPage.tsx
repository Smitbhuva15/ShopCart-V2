import { fetchtype } from "@/types/interface";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";

interface razorpayType {
    razorpay_order_id: string,
    razorpay_payment_id: string
    razorpay_signature: string
}
const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error: ${res.statusText}`);
    return res.json();
  };
  

export default function CheckOutPage({ data1, orderTotal }: { data1?: fetchtype, orderTotal: number }) {

    const [allProductId, setAllProductId] = useState<string[]>()
    const routes=useRouter();
    const{data:session}=useSession();
    const { data, error, isLoading } = useSWR<fetchtype>(`/api/product/${session?.user?.id}`, fetcher)
  

    const handelorder = async (response: razorpayType, orderId: string, order_amount: number) => {
        try {
            if (data1?.user?.produtcs) {
                const productIds = data1.user.produtcs.map((product) => product.productId);
                setAllProductId(productIds);
            }

            const res = await fetch('/api/handelorder', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    userId: session?.user?.id,
                    amount: order_amount,
                    username: session?.user?.firstName,
                    email: session?.user?.email,
                    orderId: orderId,
                    productIds: allProductId

                })
            })

            if (res.ok) {
                const message = await res.json();
                console.log(message.message);
            }
            else {
                const errmessage = await res.json();
                console.log(errmessage.message);
            }


        } catch (error) {
            console.log(error, "error found")
        }

    }

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

    const handeladdress=()=>{
        toast.error("Please enter your address before proceeding")
        routes.refresh();
    }

    const handelPayment = async () => {
        routes.refresh();
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
                    handler: function (response: razorpayType) {

                        handelorder(response, order.id, order.amount)
                        setTimeout(() => {
                            routes.push("/yourorder")
                        }, 2000)
                        toast.success("Payment Successfull! Payment ID: " + response.razorpay_payment_id);

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
            {
                data?.user?.address === null ? (
                    <div className='coupon'>
                        <input type='button' value="Click to Pay " className="bg-orange-500 text-white font-bold" onClick={handeladdress} />
                    </div>
                ) : (
                    <div className='coupon'>
                        <input type='button' value="Click to Pay " className="bg-orange-500 text-white font-bold" onClick={handelPayment} />
                    </div>
                )
                
            }

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />

        </div>
    )
}
