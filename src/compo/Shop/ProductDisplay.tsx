"use client"
import Link from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import toast, { Toaster } from 'react-hot-toast';


type itemtype = {

    item: {
        id: string;
        category: string;
        name: string;
        seller: string;
        price: number;
        stock: number;
        ratings: number;
        ratingsCount: number;
        img: string;
        shipping: number;
        quantity: number;
    }
}

type Inputs = {
    color: string
    coupon?: string
    quantity: string
    size: string
}


type LocalItemType = {
    id: string;
    img: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    coupon: string | undefined;
};


export default function ProductDisplay({ item }: itemtype) {

    const [preQuntity, setPreQuntity] = useState(item.quantity);
    const handelDecrease = (e: React.MouseEvent<HTMLInputElement>) => {
        if (preQuntity > 1) {
            setPreQuntity(preQuntity - 1);
        }

    }
    const handelIncrease = (e: React.MouseEvent<HTMLInputElement>) => {
        setPreQuntity(preQuntity + 1);

    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>({



    });

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        if (data.size === "select size") {
            toast.error("size is required")
        }
        else if (data.color === "select color") {
            toast.error("color is required")
        }
        else if (preQuntity===0) {
            toast.error("quantity is required")
        }
        const product={
            id :item.id,
            img:item.img,
            name:item.name,
            price:item.price,
            quantity:preQuntity,
            size:data.size,
            color:data.color,
            coupon :data.coupon,
         }

         const existingCart: LocalItemType[] = JSON.parse(localStorage.getItem("cart") || "[]");
         const existingProductIndex=existingCart.findIndex((item)=>item.id===item.id);
         if(existingProductIndex!==-1){
           existingCart[existingProductIndex].quantity+=preQuntity;
        //    console.log("runnnnnnnnnnnnnnnnnn")
         }
         else{
            // console.log(product)
           existingCart.push(product);
         }

         localStorage.setItem("cart",JSON.stringify(existingCart));


    };

    return (
        <div>
            <div >
                <h4>{item.name}</h4>

                <h4>${item.price}</h4>
                <h6>{item.seller}</h6>

            </div>
            {/* card component */}

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* SIZEING */}
                    <div className='select-product size'>
                        <select  {...register("size")}>
                            <option >select size</option>
                            <option >SM</option>
                            <option >MD</option>
                            <option >LG</option>
                            <option >XL</option>
                            <option >XXL</option>

                        </select>
                        <i className='icofont-rounded-down'></i>
                    </div>

                    {/* color */}
                    <div className='select-product color'>
                        <select  {...register("color")}>
                            <option >select color</option>
                            <option >WHITE</option>
                            <option >RED</option>
                            <option >BLACK</option>
                            <option >ASH</option>
                            <option >BLUE</option>
                            <option >PINK</option>


                        </select>
                        <i className='icofont-rounded-down'></i>
                    </div>
                    {/* cart plus minus */}
                    <div className='cart-plus-minus'>
                        <div className='dec qtybutton' onClick={handelDecrease}>-</div>
                        <input type="text" id="qtybutton" value={preQuntity} className='cart-plus-minus-box' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPreQuntity(Number(e.target.value))} />
                        <div className='inc qtybutton' onClick={handelIncrease}>+</div>

                    </div>

                    {/* coupan field */}
                    <div className='discount-code mb-2'>
                        <input type="text" placeholder='Enter Discount code'  {...register("coupon")} />
                    </div>

                    {/* button sec */}
                    <button type='submit' className='lab-btn'>
                        <span>Add to Cart</span>
                    </button>
                    <Link href="/cart-page" className='lab-btn bg-primary'>
                        <span>Check Out</span>
                    </Link>

                </form>
            </div>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />

        </div>
    )
}
