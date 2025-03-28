"use client"
import React from 'react'
import { countList } from '@/lib/data'
import CountUp from 'react-countup';
import Link from 'next/link';


const subTitle = "Why Choose Us";
const title = "Start Your Journey as a Merchant";
const desc = "Learn business on the go! Our app lets you take courses on any device just download, install, and start exploring something new.";
const btnText = "Apply Now";

export default function AboutUs() {
    return (
        <div className='instructor-section style-2 padding-tb section-bg-ash mt-56'>
            <div className='container'>
                <div className='section-wrapper'>
                    <div className='row g-4 justify-content-center align-items-center row-cols-1 row-cols-md-2 row-cols-xl-3'>
                        <div className='col'>
                            {
                                countList.map((val, i) => (
                                    <div className='count-item' key={i}>
                                        <div className='count-inner'>
                                            <div className='count-icon'>
                                                <i className={val.iconName}></i>
                                            </div>
                                            <div className='count-content'>
                                                <h2>
                                                    <span><CountUp end={val.count} /></span>
                                                    <span >+</span>
                                                </h2>
                                                <p>{val.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className='col'>
                            <div className='instructor-content'>
                                <span className='subtitle'>{subTitle}</span>
                                <h2 className='title'>{title}</h2>
                                <p>{desc}</p>
                                <Link href="/singup" className='lab-btn' >{btnText}</Link>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='instructor-thumb'>
                                <img src="/instructor/01.png" alt="" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
