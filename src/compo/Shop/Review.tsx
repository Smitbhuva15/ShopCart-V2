"use client"
import React, { useState } from 'react'


const reviwtitle = "Add a Review";

let ReviewList = [
    {
        imgUrl: "/images/instructor/01.jpg",
        imgAlt: "Client thumb",
        name: "Ganelon Boileau",
        date: "Posted on feb 17, 2021 at 9:07 am",
        desc: "This cap provides great shade and keeps me cool. I wear it every time I go out.",
    },
    {
        imgUrl: "/images/instructor/02.jpg",
        imgAlt: "Client thumb",
        name: "Morgana Cailot",
        date: "Posted on Jun 10, 2022 at 6:57 am",
        desc: "This T-shirt is incredibly soft and fits perfectly. The fabric is breathable, and it doesn’t shrink after washing. Definitely buying more colors!",
    },
    {
        imgUrl: "/images/instructor/03.jpg",
        imgAlt: "Client thumb",
        name: "Telford Bois",
        date: "Posted on July 03, 2017 at 9:01 pm",
        desc: "These shoes feel like walking on clouds! The cushioning is amazing, and they fit true to size. Definitely worth the purchase.",
    },
    {
        imgUrl: "/images/instructor/04.jpg",
        imgAlt: "Client thumb",
        name: "Cher Daviau",
        date: "Posted on Jun 11, 2024 at 1:37 pm",
        desc: "The design is sleek, and I can throw it in my bag without worrying about leaks. Great quality!.",
    },
];

const Review = () => {

    const [reviewShow, setReviewShow] = useState(true);

    return (
        <>
            <ul className={`review-nav lab-ul ${reviewShow ? "RevActive" : "DescActive"}`}>
                <li className='desc' onClick={() => setReviewShow(!reviewShow)}>Description</li>
                <li className='rev' onClick={() => setReviewShow(!reviewShow)}>Reviews 4</li>
            </ul>

            {/* desc & review content */}
            <div className={` review-content ${reviewShow ? "review-content-show" : "description-show"}`}>
                <div className='review-showing'>
                    <ul className='content lab-ul'>
                        {
                            ReviewList.map((review, i) => (
                                <li key={i}>
                                    <div className='post-thumb'>
                                        <img src={review.imgUrl} alt="" />
                                    </div>
                                    <div className='post-content'>
                                        <div className='entry-meta'>
                                            <div className='posted-on'>
                                                <a href="#">{review.name}</a>
                                                <p>{review.date}</p>

                                            </div>
                                        </div>
                                        <div className='entry-content'>
                                            <p>{review.desc}</p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>

                    {/* add review field */}

                    <div className='client-review'>
                        <div className='review-form'>
                            <div className='review-title'>
                                <h5>{reviwtitle}</h5>
                            </div>
                            <form action='action' className='row'>
                                <div className='col-md-4 col-12'>
                                    <input type="text" name='name' id='name' placeholder='Full Name *' />
                                </div>
                                <div className='col-md-4 col-12'>
                                    <input type="email" name='Email' id='name' placeholder='Full Name *' />
                                </div>
                                <div className='col-md-4 col-12'>
                                    <div className='rating'>
                                        <span className='me-2'>Your Rating </span>
                                        
                                    </div>
                                </div>
                                <div>
                                    <textarea name="message" id="message" rows={8} placeholder='Type Here Message' className='textarea'> </textarea>
                                </div>
                                <div className='col-12'>
                                    <button type='submit' className='defualt-butoon'>
                                        <span>Submit Review</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

                {/* descripation */}
                {
                    !reviewShow && <div className='description'>
                        <p> Facere id animi perspiciatis eos voluptatum non aperiam possimus voluptate consequatur pariatur ab, velit aspernatur veniam provident suscipit recusandae iure labore saepe alias! Deserunt adipisci at veritatis quos vero ipsam natus quidem culpa inventore non hic beatae soluta eos eveniet animi blanditiis, odio amet aliquid laudantium quisquam iure sint assumenda similique. Sapiente corrupti numquam quis iste iusto animi repellendus aut amet unde!</p>
                        <div className='post-item'>
                            <div className='post-thumb'>
                                <img src="/images/shop/01.jpg" alt="" />
                            </div>


                            <div className='post-content'>
                                <ul className='lab-ul'>
                                    <li> Stay stylish and comfortable with this premium cotton T-shirt. !</li>
                                    <li> Designed for everyday wear, it features a soft, breathable fabric that keeps you cool throughout the day!</li>
                                    <li> The classic fit, crew neckline, and durable stitching make it a versatile choice for any occasion . </li>
                                    <li>
                                    Available in a variety of colors and sizes, this T-shirt is perfect for layering or wearing on its own.
                                    </li>
                                    <li>
                                        asperiores sed perferendis cumque impedit aliquid. Amet aspernatur neque.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p> Assumenda suscipit, voluptatem et ea explicabo ab magnam esse. Eos saepe, fuga quae, aperiam expedita dolores, labore neque assumenda non omnis itaque accusamus veritatis? Ipsum dolores quibusdam voluptates magni cum cupiditate nisi est ut impedit, magnam odio omnis porro nobis nihil sit quidem eius molestiae vitae repellat unde expedita fuga. Repellendus animi praesentium quisquam dicta delectus in maiores corporis et facilis.</p>
                    </div>
                }
            </div>
        </>
    )
}

export default Review