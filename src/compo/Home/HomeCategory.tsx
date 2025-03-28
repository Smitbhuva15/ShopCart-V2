import React from 'react'
import { categoryList } from '@/lib/data'
import Link from 'next/link';

const subTitle = "Choose Any Products";
const title = "Buy Anything, Anytime, with Us";
const btnText = "Get Started Now";


// onClick={() => window.scrollTo(0, 0)}

export default function HomeCategory() {
    return (
        <div className='category-section style-4 padding-tb'>
            <div className='container'>
                {/* section header */}
                <div className='section-header text-center'>
                    <span className='subtitle'>
                        {subTitle}
                    </span>
                    <h2 className='title'>
                        {title}
                    </h2>
                </div>

                {/* section card */}
                <div className='section-wrapper'>
                    <div className='row g-4 justify-content-center row-cols-md-3 rows-cols-sm-2 row-col-1'>
                        {
                            categoryList.map((val, i) => (
                                <Link href="/shop" key={i} className='category-item'>
                                    <div className='category-inner'>
                                        {/* image thumbnail */}
                                        <div className='category-thumb'>
                                            <img src={val.imgUrl} alt="" />
                                        </div>

                                        {/* content */}
                                        <div className='category-content'>
                                            <div className='cate-icon'>
                                                <i className={val.iconName}></i>
                                            </div>
                                            <Link
                                                href="/shop"><h6>{val.title}</h6></Link>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }

                        <div className='text-center mt-5'>
                            <Link href="/shop" className='lab-btn'><span>{btnText}</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
