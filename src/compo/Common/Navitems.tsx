"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';

export default function Navitems() {
    const [menuToggle, setMenuToggle] = useState(false);
    const [socialToggle, setSocialToggle] = useState(false);
    const [headerFixed, setHeaderFixed] = useState(false);


    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            setHeaderFixed(true);
        }
        else {
            setHeaderFixed(false);
        }
    })

    const handelclose = () => {
        setMenuToggle(!menuToggle);
    }

    return (
        <header className={`header-section style-4 ${headerFixed ? "header-fixed fadeInUp" : ""}`} >
            <div className={`header-top d-xl-none ${socialToggle ? "open" : ""}`}>
                <div className='container'>
                    <div className='header-top-area'>
                        <Link href="/singup" className='lab-btn me-3'>Create Account</Link>
                        <Link href="/login">Log in</Link>
                    </div>
                </div>
            </div>

            <div className='header-bottom'>
                <div className='container'>
                    <div className='header-wrapper'>
                        <div className='logo-search-acte'>

                            <div className='logo'>
                                <Link href="/">
                                    <img src="/images/logo/logo.png" alt="Logo" />
                                </Link>
                            </div>
                        </div>

                        <div className='menu-area'>
                            <div className='menu xl:flex block'>
                                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                                    <li><Link href="/" onClick={handelclose}>Home</Link></li>
                                    <li><Link href="/shop" onClick={handelclose}>Shop</Link></li>
                                    <li><Link href="/blog" onClick={handelclose}>Blog</Link></li>
                                    <li><Link href="/about" onClick={handelclose}>About</Link></li>
                                    <li><Link href="/contact" onClick={handelclose}>Contact</Link></li>
                                    <li><Link href="/yourorder" onClick={handelclose}>Your Order</Link></li>
                                </ul>


                            </div>

                            {/* sign in and log in */}
                            <Link href="/singup" className='lab-btn me-3 d-none d-xl-block'>Create Account</Link>
                            <Link href="/login" className='d-none d-xl-block'>Log In</Link>

                            {/* menu toggle */}
                            <div onClick={() => { setMenuToggle(!menuToggle) }} className={`header-bar d-lg-none  ${menuToggle ? "active" : ""}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            {/*scoial toggle */}
                            <div className='ellepsis-bar d-lg-none'
                                onClick={() => { setSocialToggle(!socialToggle) }}>
                                <i className="icofont-info-square"></i>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
