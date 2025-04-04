"use client"
import React, { useEffect, useState } from 'react'
import SelectedCategory from '../Common/SelectedCategory';
import Link from 'next/link';


export type producttype = {
    id: string;
    category: string;
    name: string;
    seller: string;
    price: number;
    stock: number;
    ratings: number;
    ratingsCount: number;
    shipping: number;
    quantity: number;
    image: string;


}[]

const title = (

    <h2>Find Your Perfect Match from <span>Thousands</span> of Products</h2>
)
const desc = "We have the largest collection of product";

export default function Banner() {

    const [searchInput, setSearchInput] = useState("")
    const [filterProducts, setFilterProducts] = useState<producttype>([])
    const [allProducts, setAllProducts] = useState<producttype>([])


const getData = async () => {
        
        try {
            const res = await fetch('/api/newproductadd', {
                method: "GET"
            })
            if (res.ok) {
                const data = await res.json();
                setFilterProducts(data.items)
                setAllProducts(data.items)
                console.log(data.message)
            }
            else {
                const errdata = await res.json();
                console.log(errdata.message)
            }

        } catch (error) {
            console.log("error found", error)
        }
      

    }
    
    useEffect(() => {
        getData();
    }, [])

    const handelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    const filter_Products = allProducts.filter((product) => product.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))
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
