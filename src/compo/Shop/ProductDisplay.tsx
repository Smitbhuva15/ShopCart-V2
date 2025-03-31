"use client"
import Link from "next/link";
import React, { useState } from "react";

type itemtype= {

   item:{
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

export default function ProductDisplay({item}:itemtype) {

        const[preQuntity,setPreQuntity]=useState(item.quantity);
        const handelDecrease=(e: React.MouseEvent<HTMLInputElement>)=>{
            if(preQuntity>1){
                setPreQuntity(preQuntity-1);
            }
          
        }
        const handelIncrease=(e: React.MouseEvent<HTMLInputElement>)=>{
            setPreQuntity(preQuntity+1);
           
        }
        // const handelquntity=(e:React.ChangeEvent<HTMLInputElement>)=>{
        // setPreQuntity(e.target.value)
        // }
    
  return (
    <div>
       <div >
            <h4>{item.name}</h4>
           
            <h4>${item.price}</h4>
            <h6>{item.seller}</h6>
            
        </div>
  {/* card component */}

        <div>
            <form >

                {/* SIZEING */}
                <div className='select-product size'>
                    <select  >
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
                    <select  >
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
                    <input type="text" name="qtybutton" id="qtybutton"  value={preQuntity} className='cart-plus-minus-box' />
                    <div className='inc qtybutton' onClick={handelIncrease}>+</div>

                </div>

                 {/* coupan field */}
                 <div className='discount-code mb-2'>
                    <input type="text" placeholder='Enter Discount code'  />
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

    </div>
  )
}
