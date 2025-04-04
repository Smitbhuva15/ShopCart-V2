"use client"
import PageHeader from '@/compo/Common/PageHeader'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductDisplay from '@/compo/Shop/ProductDisplay';
import { product_data } from '@/lib/product';
import { Autoplay } from 'swiper/modules';
import Review from '@/compo/Shop/Review';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

type producttype = {
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

export default function page() {
    const [isLoading, setIsLoading] = useState(true)
    const [productData, setProductData] = useState<producttype>([])
    const { id } = useParams()
    const getData = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/newproductadd', {
                method: "GET"
            })
            if (res.ok) {
                const data = await res.json();
                setProductData(data.items)
                console.log(data.message)
            }
            else {
                const errdata = await res.json();
                console.log(errdata.message)
            }

        } catch (error) {
            console.log("error found", error)
        }
        finally {
            setIsLoading(false)
        }

    }
    useEffect(() => {
        getData();
    }, [])


    const result = productData.filter((product) => product.id === id);

    return (
        <div>
            <PageHeader title={"OUR SHOP SINGLE"} curPage={"Shop      /     Single Product"} />
            {
                isLoading?
                (
                    <div className="fixed inset-0 flex justify-center items-center z-50 bg-white">
                    <Loader2 className="h-9 w-9 animate-spin text-gray-500" />
                  </div>
                )
                :(
                    <div className='shop-single padding-tb aside-bg'>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-lg-8 col-12'>
                                <article>
                                    <div className='product-details'>
                                        <div className='row align-items-center'>
    
                                            {/* image */}
                                            <div className='col-md-6 col-12'>
                                                <div className='product-thumb'>
                                                    <div className='swiper-container pro-single-top'>
    
    
                                                        < div className="mySwiper">
    
                                                            {
                                                                result.map((item, i) => (
                                                                    <div key={i}>
                                                                        <div className='single-thumb'>
                                                                            <img src={item.image} alt="" />
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
    
    
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-6 col-12'>
                                                <div className='post-content'>
                                                    {
                                                        result.map(item => <ProductDisplay key={item.id} item={item} />)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    
                                    {/* review */}
    
                                    <div className='review'>
                                        <Review />
                                    </div>
    
    
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
           
        </div>
    )
}
