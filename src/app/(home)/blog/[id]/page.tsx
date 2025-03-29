// "use client"
import PageHeader from '@/compo/Common/PageHeader';
import PopulerPost from '@/compo/Common/PopulerPost';
import Tag from '@/compo/Common/Tag';
import blogList from '@/lib/blogdata';
import { socialList } from '@/lib/footerdata';
import Image from 'next/image';
import Link from 'next/link';




const tag1 = " Eviscalate parallel Processes via Technica Sound Model Authoritative";

const tag2 = "This product addresses common concerns and solves problems effectively";

const par1 = "In a world filled with countless products, finding the right one that truly enhances your life can be overwhelming. However, Im here to tell you about a product that stands out from the crowd and is worth every penny. Whether you're looking for convenience, quality, or value, this product has it all. Lets dive into why this is the one thing you should definitely add to your collection.First and foremost, quality matters, and this product is crafted with the highest standards in mind. It's built to last, offering long-term durability, so you dont have to worry about replacing it after a few months of use. The materials used are top-notch, ensuring that you get a reliable and sturdy product that delivers great performance every time.";

const par2 = "Ease of use is another key feature that sets this product apart. Its designed with user-friendly features, making it simple to use from the moment you unbox it. Whether you're tech-savvy or not, youll find that it integrates seamlessly into your daily routine";

const par3 = "Lastly, the positive reviews speak for themselves. Customers are raving about how it has made their lives easier, and the satisfaction rate is through the roof. When you buy this product, you’re not just getting something for yourself; you’re making a decision to improve your everyday experience.Don’t miss out on this incredible opportunity. Add it to your cart today and experience the difference for yourself!"

const par4 = "  The quality of this product is what truly sets it apart. Carefully designed and crafted with premium materials, it ensures longevity and reliable performance over time. Whether it’s for daily use or special occasions, this product can handle it all. You can trust that it will stand up to the demands of everyday life, giving you peace of mind with every use.This product is all about delivering results. Its innovative design makes it incredibly versatile, adapting to various needs and preferences. Whether you need it for work, home, or leisure, it’s built to do the job efficiently and effectively."

const par5 = "Designed with you in mind, this product addresses common concerns and solves problems effectively. Whether it's enhancing comfort, increasing convenience, or improving efficiency, this item has been engineered to offer solutions that fit seamlessly into your lifestyle. You'll find it’s not just an item – it’s an investment in making your daily routines simpler and more enjoyable."




export default function BlogpageId({params}:{params:{id:string}}) {


    const result = blogList.filter((b) => b.id === Number(params.id));


    return (
         <div>
                    <PageHeader title={"Single Blog Pages"} curPage={"Blog     /     Blog Details"} />
        
                    <div className='blog-section blog-single padding-tb section-bg'>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                <div className='col-lg-8 col-12'>
                                    <article>
                                        <div className='section-wrapper'>
                                            <div className='row row-cols-1 justify-content-center g-4'>
                                                <div className='col'>
                                                    <div className='post-item style-2'>
                                                        <div className='post-inner'>
                                                            {
                                                                result.map((item) => (
                                                                    <div key={item.id}> 
                                                                        <div className='post-thumb  '>
                                                                            <Image
                                                                                src={item.imgUrl}
                                                                                alt=""
                                                                                className="w-100"
                                                                                width={100}
                                                                                height={100}
                                                                                unoptimized
                                                                            />
        
                                                                        </div>
                                                                        <div className='post-content'>
                                                                            <h3>{item.title}</h3>
                                                                            <div className='meta-post'>
                                                                                <ul className='lab-ul'>
                                                                                    {
                                                                                        item.metaList.map((val, i) => (
                                                                                            <li key={i}><i className={val.iconName}>{val.text}</i></li>
                                                                                        ))
                                                                                    }
        
                                                                                </ul>
                                                                            </div>
                                                                            <p>{par1}</p>
        
                                                                            <blockquote>
                                                                                <p>
                                                                                {par2}
                                                                                </p>
                                                                                <cite>
                                                                                    <a href="#">...Melisha Hunter</a>
                                                                                </cite>
                                                                            </blockquote>
                                                                            <p>
                                                                            {par3}
                                                                            </p>
                                                                            <Image src="/images/blog/single/01.jpg" alt="" width={100} height={100} unoptimized/>
        
                                                                            <p>
                                                                          {par4}
                                                                            </p>
        
                                                                            <div className='video-thumb'>
                                                                            <Image src="/images/blog/single/02.jpg" alt="" width={100} height={100} unoptimized/>
                                                                            <a href="https://www.youtube.com/watch?v=Iaqt64BafTc" className='video-button popup' target='_blank'>  <i className='icofont-ui-play'></i></a>
                                                                          
                                                                            </div>
                                                                            <p>
                                                                            {par5}
                                                                            </p>
                                                                            <div className='tags-section'>
                                                                                <ul className='tags lab-ul'>
                                                                                    <li>
                                                                                        <a href="#">Agency</a>
        
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#">Business</a>
        
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#">Personal</a>
        
                                                                                    </li>
                                                                                </ul>
                                                                                <ul className='lab-ul social-icons'>
                                                                                    {
                                                                                        socialList.map((val,i)=>(
                                                                                            <li key={i}>
                                                                                                <a href="#" className={val.className}><i className={val.iconName}></i></a>
                                                                                            </li>
        
                                                                                            
                                                                                        ))
                                                                                    }
                                                                                </ul>
        
                                                                            </div>
        
                                                                        </div>
        
                                                                    </div>
                                                                ))
                                                            }
        
                                                        </div>
        
                                                    </div>
                                                    <div className='navigations-part'>
                                                        <div className='left'>
                                                            <Link href="#" className='prev'>
                                                                <i className='icofont-double-left'></i>Previous Blog
                                                            </Link>
                                                            <Link href="#">
                                                               {tag1}
                                                            </Link>
        
                                                        </div>
                                                        <div className='right'>
                                                            <Link href="#" className='next'>
                                                                Next Blog<i className='icofont-double-right'></i>
                                                            </Link>
                                                            <Link href="#">
                                                               {tag2}
                                                            </Link>
        
                                                        </div>
        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div className='col-lg-4 col-12'>
                                <aside>
                                    <Tag />
                                    <PopulerPost />
                                   </aside>
                                </div>
                                   
                            </div>
                        </div>
        
                    </div>
        
                </div>
    )
}

