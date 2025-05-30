import blogList from '@/lib/blogdata'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function BlogMainPage() {
    return (
        <div className='blog-section padding-tb section-bg'>
            <div className='container'>
                <div className='section-wrapper'>
                    <div className='row row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center g-4'>
                        {
                            blogList.map((blog, i) => (
                                <div key={i} className='col'>
                                    <div className='post-item'>
                                        <div className='post-inner'>
                                            <div className='post-thumb'>
                                                <Link href={`/blog/${blog.id}`}><Image src={blog.imgUrl} alt="" width={100} height={100} unoptimized/></Link>
                                            </div>
                                            <div className='post-content'>
                                                <Link href={`/blog/${blog.id}`}><h4>{blog.title}</h4></Link>
                                                <div className='meta-post'>
                                                    <ul className='lab-ul'>
                                                        {
                                                            blog.metaList.map((val, i) => (
                                                                <li key={i}><i className={val.iconName}>{val.text}</i></li>
                                                            ))
                                                        }

                                                    </ul>
                                                </div>
                                                <p>{blog.desc}</p>
                                            </div>
                                            <div className='post-footer'>
                                                <div className='pf-left'>
                                                    <Link href={`/blog/${blog.id}`} className="lab-btn-text">{blog.btnText}<i className='icofont-external-link'></i></Link>
                                                </div>
                                                <div className='pf-right'>
                                                    <i className='icofont-comment'></i>
                                                    <span className='comment-count'>{blog.commentCount}</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
