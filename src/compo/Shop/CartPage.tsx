"use client"
import Link from "next/link";
import PageHeader from "../Common/PageHeader";
import { useEffect, useState } from "react";
import { product_data } from "@/lib/product";


type LocalItemType = {
    item:
    {
        id: string;
        img: string;
        name: string;
        price: number;
        quantity: number;
        size: string;
        color: string;
        coupon: string | undefined;
    }
};


export default function CartPage() {

    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);


    const getCartData = async () => {

        try {
            const res = await fetch('/api/product', {
                method: "GET",
            })
            if (res.ok) {
                const message = await res.json();
                console.log(message)
                setItems(message.user.products)
            }
            else {
                const errormessage = await res.json();
                console.log(errormessage.message)
            }
        } catch (error) {
            console.log("error found", error)
        }
    }

    

    useEffect(() => {
        getCartData();
    }, [])

    return (
        <div>
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
                                        cartItems.map((item, index) => (
                                            <tr key={index}>
                                                <td className='product-item cat-product'>
                                                    <div className='p-thumb'>
                                                        <Link href="/shop"><img src={item.img} alt="" /></Link>
                                                    </div>
                                                    <div className='p-content'>
                                                        <Link href="/shop">{item.name}</Link>

                                                    </div>
                                                </td>

                                                <td className='cat-price'> ${item.price}</td>
                                                <td className='cat-quantity'>
                                                    <div className='cart-plus-minus'>
                                                        <div className='dec qtybutton' onClick={() => { handelDecraese(item) }}>- </div>
                                                        <input type="text" className='cart-plus-minus-box' name='qtybutton' value={item.quantity} />
                                                        <div className='inc qtybutton' onClick={() => { handelIncrease(item) }}>+ </div>
                                                    </div>
                                                </td>

                                                <td className='cat-toprice'>
                                                    ${calculateTotalPrice(item)}
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
                                    }
                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>


    )
}
