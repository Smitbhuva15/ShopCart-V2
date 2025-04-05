import Link from 'next/link';
import React from 'react'


type producttype = {
    gridList: boolean
    products: {
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
    }[]
}
export default function ProductCard({ gridList, products }: producttype) {

    return (
        <div className={`shop-product-wrap row justify-content-center ${gridList ? "grid" : "list"}`}>
            {
                products.map((product, i) => (

                    <div key={i} className='col-lg-4 col-md-6 col-12'>


                        {/* product grid item */}
                        <div className='product-item'>
                            {/* product image */}
                            <div className='product-thumb'>
                                <div className='pro-thumb'>
                                    <img src={product.image} alt="" />
                                </div>

                                {/* product action link */}

                                <div className='product-action-link'>
                                    <Link href={`/shop/${product.id}`}><i className='icofont-eye'></i></Link>
                                   
                                    <Link href="/cart-page"><i className='icofont-cart-alt'></i></Link>
                                </div>
                                {/* product content */}
                                <div className='product-content'>
                                    <h5>
                                        <Link href={`/shop/${product.id}`}>{product.name}</Link>
                                    </h5>
                                    <p>

                                    </p>
                                    <h6>₹{product.price}</h6>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>

                        {/* product list item */}

                        <div className='product-list-item  '>
                            {/* product image */}
                            <div className='product-thumb d-flex'>
                                <div className='pro-thumb'>
                                    <img src={product.image} alt="" />
                                </div>

                                {/* product action link */}

                                <div className='product-action-link '>
                                    <Link href={`/shop/${product.id}`}><i className='icofont-eye'></i></Link>
                                   
                                    <Link href="/cart-page"><i className='icofont-cart-alt'></i></Link>
                                </div>
                                {/* product content */}
                                <div className='product-content '>
                                    <h5>
                                        <Link href={`/shop/${product.id}`}>{product.name}</Link>
                                    </h5>
                                    <h6>₹{product.price}</h6>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>


                    </div>
                ))
            }
        </div>
    )
}
