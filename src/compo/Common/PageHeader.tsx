import Link from 'next/link'
import React from 'react'
import { string } from 'yup'

type headertype={
    title:string,
    curPage:string
}

export default function PageHeader({title,curPage}:headertype) {
    return (
        <div className='pageheader-section'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='pageheader-content text-center'>
                            <h2>{title}</h2>
                            <nav aria-label='breadcrumb'>
                                <ol className='breadcrumb justify-content-center'>
                                    <li className='breadcrumb-item'><Link href="/">Home</Link></li>
                                    <li className='breadcrumb-item active'>{curPage}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
