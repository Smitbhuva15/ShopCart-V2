"use client"
import Link from "next/link";
import PageHeader from "../Common/PageHeader";
import { useState } from "react";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from 'swr';
import { cartType, fetchtype } from "@/types/interface";
import { Loader2 } from 'lucide-react';
import CartBottom from "./CartBottom";
import { useRouter } from "next/navigation";


const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error: ${res.statusText}`);
    return res.json();
};

export default function CartPage() {



    const [cartItems, setCartItems] = useState<cartType[]>([]);
    const { data: session,status } = useSession()
    const routes=useRouter();

    const { data, error, isLoading } = useSWR<fetchtype>(`/api/product/${session?.user?.id}`, fetcher)

    if(status==="unauthenticated"){
        routes.push("/login")
    }

    const handelincreasedecrease = async (item: cartType) => {

        try {
            const response = await fetch("/api/addproduct", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId: item.productId,
                    userId: item.userId,
                    quantity: item.quantity,
                })
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data.message)
            }
            else {
                const errmessage = await response.json();
                console.log(errmessage.message)

            }

        } catch (error) {
            console.log("error found", error)
        }
    }


    // handel to increase
    const handelIncrease = (item: cartType) => {
        item.quantity += 1;
        setCartItems([...cartItems]);

        handelincreasedecrease(item)

    }

    // handel to decrease

    const handelDecraese = (item: cartType) => {
        if (item.quantity > 1) {
            item.quantity -= 1;

        }

        setCartItems([...cartItems]);
        handelincreasedecrease(item)
    }

    const calculateTotalPrice = (item: cartType) => {
        return Number(item.price) * item.quantity
    }


    const handelItemRemove = async (item: cartType) => {
        try {
            const response = await fetch("/api/addproduct", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId: item.productId,
                    userId: item.userId,
                })
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data.message)
                mutate(`/api/product/${session?.user?.id}`);
            }
            else {
                const errmessage = await response.json();
                console.log(errmessage.message)

            }

        } catch (error) {
            console.log("error found", error)
        }
    }


    return (
        isLoading ? (
            <div className="fixed inset-0 flex justify-center items-center z-50 bg-white">
                <Loader2 className="h-9 w-9 animate-spin text-gray-500" />
            </div>
        )
            :
            (<div>
                <PageHeader title={"shop Cart"} curPage={"Cart Page"} />
                <div className='shop-cart padding-tb'>
                    <div className='container'>
                        <div className='section-wrapper'>
                            {/* cart top */}
                            <div className='cart-top'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className='cat-product'>Product</th>
                                            <th className='cat-price'>Price</th>
                                            <th className='cat-quantity'>Quantity</th>
                                            <th className='cat.toprice'>total</th>
                                            <th className='cat-edit'>Edit</th>

                                        </tr>
                                    </thead>

                                    {/* tabel body */}
                                    <tbody>
                                        {

                                            data?.user?.produtcs.length == 0 ?
                                                (
                                                    <div className="text-2xl text-red-600">Your cart is empty</div>
                                                ) :

                                                (data?.user?.produtcs.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className='product-item cat-product'>
                                                            <div className='p-thumb'>
                                                                <Link href="/shop"><img src={item?.img} alt="ok" /></Link>
                                                            </div>
                                                            <div className='p-content'>
                                                                <Link href="/shop">
                                                                    {item?.name}
                                                                </Link>

                                                            </div>
                                                        </td>

                                                        <td className='cat-price'> ₹{item.price}</td>
                                                        <td className='cat-quantity'>
                                                            <div className='cart-plus-minus'>
                                                                <div className='dec qtybutton' onClick={() => { handelDecraese(item) }}>- </div>
                                                                <input type="text" className='cart-plus-minus-box' name='qtybutton' value={item.quantity} />
                                                                <div className='inc qtybutton' onClick={() => { handelIncrease(item) }}>+ </div>
                                                            </div>
                                                        </td>

                                                        <td className='cat-toprice'>
                                                        ₹{calculateTotalPrice(item)}
                                                        </td>

                                                        <td className='cat-edit'>
                                                            <a href="#" onClick={(e) => {
                                                                e.preventDefault(),
                                                                    handelItemRemove(item)
                                                            }}>
                                                                <img src="/images/shop/del.png" alt="" />
                                                            </a>

                                                        </td>
                                                    </tr>
                                                ))
                                                )
                                        }
                                    </tbody>

                                </table>
                            </div>

                            {/* cart bottom  */}
                            <CartBottom data={data} />

                        </div>
                    </div>
                </div>
            </div>)


    )
}
