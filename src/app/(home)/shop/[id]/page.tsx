import PageHeader from '@/compo/Common/PageHeader'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductDisplay from '@/compo/Shop/ProductDisplay';
import { product_data } from '@/lib/product';
import { Autoplay } from 'swiper/modules';
import Review from '@/compo/Shop/Review';


export default function page({ params }: { params: { id: string } }) {


    const result = product_data.filter((product) => product.id === params.id);
    console.log(result)


    return (
        <div>
            <PageHeader title={"OUR SHOP SINGLE"} curPage={"Shop      /     Single Product"} />
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


                                                     < div  className="mySwiper">

                                                        {
                                                            result.map((item, i) => (
                                                                <div key={i}>
                                                                    <div className='single-thumb'>
                                                                        <img src={item.img} alt="" />
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
        </div>
    )
}
