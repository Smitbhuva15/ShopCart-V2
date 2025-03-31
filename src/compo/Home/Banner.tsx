"use client"
import React, { useState } from 'react'
import SelectedCategory from '../Common/SelectedCategory';
import { product_data } from '@/lib/product';
import Link from 'next/link';

const title = (

    <h2>Find Your Perfect Match from <span>Thousands</span> of Products</h2>
)
const desc = "We have the largest collection of product";

export default function Banner() {

    const [searchInput, setSearchInput] = useState("")
    const [filterProducts, setFilterProducts] = useState(product_data);


    const handelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    const filter_Products = product_data.filter((product) => product.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))
       setFilterProducts(filter_Products)

    }

  

    return (
        <div className='banner-section style-4'>
            <div className='container'>
                <div className='banner-content'>
                    {title}

                    <form >
                        <SelectedCategory />
                        <input type="text" name="search" id="search" placeholder='search your product' value={searchInput} onChange={handelSearch} />
                        <button type='submit'>
                            <i className='icofont-search'></i>
                        </button>
                    </form>

                    <p>
                        {desc}
                        <ul className='lab-ul'>
                            {
                                searchInput && filterProducts.map((product, i) => (
                                    <li ><Link href={`/shop/${product.id}`}>{product.name}</Link> </li>
                                )
                                )
                            }
                        </ul>
                    </p>
                </div>
            </div>
        </div>
    )
}
