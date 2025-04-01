"use client"
import Link from "next/link";
import PageHeader from "../Common/PageHeader";
import { useEffect, useState } from "react";

type LocalItemType = {
  item:
  {id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  coupon: string | undefined;}
};


export default function CartPage() {
      const [cartItems, setCartItems] = useState([]);

        useEffect (() => {
              // fetch data from local storage
              const storedCartItems = JSON.parse(localStorage.getItem("cart")|| "[]");
              setCartItems(storedCartItems);
          }, [])

          const calculateTotalPrice = (item:LocalItemType) => {
            return item.price * item.quantity;
        }
    
         // handel to increase

    const handelIncrease = (item) => {
      item.quantity += 1;
      setCartItems([...cartItems]);

      // update local storage with new cart itmes

      localStorage.setItem("cart", JSON.stringify(cartItems));
  }
  // handel to decrease

  const handelDecraese = (item) => {
      if (item.quantity > 1) {
          item.quantity -= 1;

      }
      setCartItems([...cartItems]);

      // update local storage with new cart itmes

      localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  const handelItemRemove = (item) => {
      const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);

      // updated cart
      setCartItems(updatedCart);

      // update localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
  }


  // cart subtotal
  const cartSubtotal = cartItems.reduce((total, item) => {
      return total + calculateTotalPrice(item);

  }, 0)

  // order total

  const orderTotal = cartSubtotal;

  
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
