"use client"
import React, { useState } from 'react'
import SelectedCategory from '../Common/SelectedCategory';

const title = (
    
    <h2>Find Your Perfect Match from <span>Thousands</span> of Products</h2>
)
const desc = "We have the largest collection of product";

export default function Banner() {

    const [searchInput, setSearchInput] = useState("")


    const handelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
        console.log(searchInput)
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
                    </p>
                </div>
            </div>
        </div>
    )
}
