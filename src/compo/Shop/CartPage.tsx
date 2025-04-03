"use client"
import Link from "next/link";
import PageHeader from "../Common/PageHeader";
import { useEffect, useState } from "react";
import { product_data } from "@/lib/product";
import { useSession } from "next-auth/react";


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


interface cartType {

    id: string
    productId: string
    quantity: number
    coupon: string
    color: string
    size: string
    userId: string
    name: string
    img: string
    price: string

}

export default function CartPage() {


    const [cartItems, setCartItems] = useState<cartType[]>([]);
    const { data: session, } = useSession()

    const data = {
        userId: session?.user?.id
    }


    const getCartData = async () => {

        try {
            const res = await fetch('/api/product', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                const message = await res.json();
            
                setCartItems(message.user.produtcs)
            }
            else {
                const errormessage = await res.json();
                console.log(errormessage.message)
            }
        } catch (error) {
            console.log("error found", error)
        }
    }

    const handelincreasedecrease=async(item:cartType)=>{
       
        try {
            const response=await fetch("/api/addproduct",{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    productId:item.productId,
                    userId:item.userId,
                    quantity:item.quantity,
                })
            })
        
            if(response.ok){
                const data=await response.json();
                console.log(data.message)
            }
            else{
                const errmessage=await response.json();
                console.log(errmessage.message)
                
            }
            
          } catch (error) {
            console.log("error found",error)
          }
    }
    

 
    // handel to increase
    const handelIncrease = (item:cartType) => {
        item.quantity += 1;
        setCartItems([...cartItems]);
        
        handelincreasedecrease(item)
       
    }

    // handel to decrease

    const handelDecraese = (item:cartType) => {
        if (item.quantity > 1) {
            item.quantity -= 1;

        }
        setCartItems([...cartItems]);
        handelincreasedecrease(item)
    }

   
    const handelItemRemove=async(item:cartType)=>{
        try {
            const response=await fetch("/api/addproduct",{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    productId:item.productId,
                    userId:item.userId,
                })
            })
        
            if(response.ok){
                const data=await response.json();
                console.log(data.message)
            }
            else{
                const errmessage=await response.json();
                console.log(errmessage.message)
                
            }
            
          } catch (error) {
            console.log("error found",error)
          }
    }

    useEffect(() => {
        if (session?.user?.id) {
            getCartData();
        }
    }, [session])

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
                                        cartItems && cartItems.map((item, index) => (
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

                                                <td className='cat-price'> ${item.price}</td>
                                                <td className='cat-quantity'>
                                                    <div className='cart-plus-minus'>
                                                        <div className='dec qtybutton' onClick={() => { handelDecraese(item) }}>- </div>
                                                        <input type="text" className='cart-plus-minus-box' name='qtybutton' value={item.quantity} />
                                                        <div className='inc qtybutton' onClick={() => { handelIncrease(item) }}>+ </div>
                                                    </div>
                                                </td>

                                                {/* <td className='cat-toprice'>
                                                    ${calculateTotalPrice(item)}
                                                </td> */}

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
