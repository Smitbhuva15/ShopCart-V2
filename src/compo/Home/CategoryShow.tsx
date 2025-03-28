"use client"
import React, { useState } from 'react'
import { ProductData } from '@/lib/data';
import Link from 'next/link';
const title = "Our Products";


export default function CategoryShow() {
        const [item, setItem] = useState(ProductData);

        const filterItem=(item1:string)=>{
           
             const addeditem=ProductData.filter((data)=>{
                
               return data.cate===item1
             })
            
             setItem(addeditem)
        }
    
  return (
    <div className='course-section style-3 padding-tb'>
        {/* shapes */}
        <div className='course-shape one'>
                <img src="/images/shape-img/icon/01.png" alt="" />
            </div>
            <div className='course-shape two'>
                <img src="/images/shape-img/icon/02.png" alt="" />  
            </div>

            <div className='container'>
            <div className='section-header'>
                    <h2 className='title'>{title}</h2>
                    <div className='course-filter-group'>
                        <ul className='lab-ul'>
                            <li onClick={() => setItem(ProductData)}>All</li>
                            <li onClick={() => filterItem("Shoes")}>Shoes</li>
                            <li onClick={() => filterItem("Bags")}>Bags</li>
                            <li onClick={() => filterItem("Phones")}>Phones</li>
                            <li onClick={() => filterItem("Beauty")}>Beauty</li>
                        </ul>
                    </div>
                </div>


                 <div className='section-wrapper'>
                                    <div className='row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-lg-3 row-cols-md-2 row-cols-1 course-filter'>
                                        {
                                            item.map((product) => <div className='col' key={product.id}>
                                                <Link href='/shop'>
                                                <div className='course-item style-4'>
                                                    <div className='course-inner'>
                                                        <div className='course-thumb'>
                                                            <img src={product.imgUrl} alt="" />
                                                            <div className='course-category'>
                                                                <div className='course-cate'>
                                                                    <a href="#">{product.cate}</a>
                                                                </div>
                                                                <div className='course-review'>
                                                                    {/* <Ratting /> */}
                                                                </div>
                                                            </div>
                                                        </div>
                
                                                        {/* content */}
                                                        <div className='course-content'>
                                                            <Link href={`/shop`}><h5>{product.title}</h5></Link>
                                                            <div className='course-footer'>
                                                                <div className='course-author'>
                                                                    <Link href="/shop" className='ca-name' >{product.brand}</Link>
                                                                </div>
                
                                                                <div className='course-price'>
                                                                    {product.price}
                                                                </div>
                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </Link>
                                            </div>
                
                                            )
                                        }
                
                                    </div>
                                </div>
                

            </div>
    </div>
  )
}
