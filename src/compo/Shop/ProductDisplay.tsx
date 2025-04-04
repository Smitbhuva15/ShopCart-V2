"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
        image: string;
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





export default function ProductDisplay({ item }: itemtype) {

    const {data:session,status}=useSession();
    const routes=useRouter();

    if(status==="unauthenticated"){
        routes.push("/login")
    }

    const [preQuntity, setPreQuntity] = useState(1);
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
        const product = {
            userId: session?.user?.id ?? "", 
            productId: item?.id ?? "",
            quantity: preQuntity ?? 1,
            size: data?.size || "default",
            color: data?.color || "default",
            coupon: data?.coupon || null,
            img:item?.image,
            name:item?.name,
            price:item?.price
          };
  try {
    const response=await fetch("/api/addproduct",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(product)
    })

    if(response.ok){
        const data=await response.json();
        console.log(data.message)
        reset()
        setPreQuntity(0)
    }
    else{
        const errmessage=await response.json();
        console.log(errmessage.message)
        
    }
    
  } catch (error) {
    console.log("error found",error)
  }
       

    };

    return (
        <div>
            <div >
                <h4>{item.name}</h4>

                <h4>₹{item.price}</h4>
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
                    {
                    status==="unauthenticated"?
                        (
                            <Link href="/login" className='lab-btn bg-primary'>
                            <span>Check Out</span>
                        </Link>
                        )
                        :
                        (  <Link href="/cart-page" className='lab-btn bg-primary'>
                            <span>Check Out</span>
                        </Link>
                            
                        )

                    }
                  

                </form>
            </div>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />

        </div>
    )
}
