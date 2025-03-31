"use client"
import Link from "next/link";
import React, { useState } from "react";


type producttype = {
    products: {
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
    }[],
    gridList: boolean
}

export default function Search({ products, gridList }: producttype) {
    const [searchTerm, setSearchTerm] = useState("");

    const findThePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)

    }

    const filterPoducts = products.filter((product) => product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));

    return (
        <div className='widget-search widget'>
            <form className='search-wrapper mb-3'>
                <input type="text" name="search" placeholder='Search....' defaultValue={searchTerm} onChange={findThePhoto} />
                <button type='submit'>
                    <i className='icofont-search-2'></i>
                </button>
            </form>


            {/* showing serach result */}

            <div>
                {
                    searchTerm && filterPoducts.map((product) => (
                        <Link key={product.id} href={`shop/${product.id}`}>
                            <div className='d-flex gap-3 p-2'>
                                <div>
                                    <div className='pro-thumb h-25'>
                                        <img src={product.img} alt="" width={70} className='flex-{grow|shink}-0' />
                                    </div>
                                </div>
                                <div className='product-content'>
                                    <p >
                                        <Link href={`/shop/${product.id}`}>{product.name}</Link>
                                    </p>
                                    <h6>${product.price}</h6>
                                </div>

                            </div>
                        </Link>

                    ))
                }
            </div>
        </div>
    )
}
