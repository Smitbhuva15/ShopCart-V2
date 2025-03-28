"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay } from 'swiper/modules';
import { sponsorList } from '@/lib/newdata';

export default function Sponser() {
 
    return (
        <div className='sponsor-section section-bg'>
            <div className='container'>
                <div className='section-wrapper'> 
                    <div className='sponsor-slider'>
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={20}
                            autoplay={
                                {
                                    delay:2000,
                                    disableOnInteraction:false,
                                }
                            }
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 40,
                                },
                                1024: {
                                    slidesPerView: 5,
                                    spaceBetween: 50,
                                },
                            }}
                            modules={[Autoplay]}
                            className="mySwiper"
                        >
                            {
                               sponsorList.map((val,i)=>(
                                <SwiperSlide key={i}>
                                    <div className='sponser-item'>
                                        <div className='sponser-thumb'>
                                            <img src={val.imgUrl} alt="" />
                                        </div>
                                    </div>
                                </SwiperSlide>
                               ))
                            }

                        </Swiper>
                    </div>
                </div>
            </div>

        </div>
    )
}
