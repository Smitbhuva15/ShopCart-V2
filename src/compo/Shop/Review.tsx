"use client"
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, SubmitHandler } from "react-hook-form"
import { ReviewList } from '@/lib/review';

const reviwtitle = "Add a Review";



type Inputs={
    fullName :string;
    email :string;
    message:string
}


const schema = yup
    .object()
    .shape({
        fullName: yup.string().min(3, "userName must be at least 3 characters").required(),
        email: yup.string().email("proper email is required").required(),
        message: yup.string().min(10, "message must be at least 10 characters").required()

    })
    .required();

   

const Review = () => {

    const [reviewShow, setReviewShow] = useState(true);


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm<Inputs>({
        resolver: yupResolver(schema),
      });

      const handleFormError = () => {
        Object.values(errors).forEach((error) => {
          const fieldError = error?.message as string;
          if (fieldError) {
            toast.error(fieldError);
          }
        });
      };

      const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {

        try {
          const res = await fetch("/api/review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
    
          if (res.ok) {
            const message = await res.json();
            reset()
            toast.success(message.message)
    
          }
          else {
            const errmessage = await res.json();
            toast.error(errmessage.message)
          }
        } catch (error) {
          console.log(error, "error found");
        }
      };
    


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
                            <form action='action' className='row' onSubmit={handleSubmit(onSubmit, handleFormError)}>
                                <div className='col-md-6 col-12'>
                                    <input type="text" id='name' placeholder='Full Name *'  {...register("fullName")} />
                                </div>
                                <div className='col-md-6 col-12'>
                                    <input type="email"  id='name' placeholder='email *'  {...register("email")} />
                                </div>

                                <div>
                                    <textarea id="message" rows={8} placeholder='Type Here Message' className='textarea'  {...register("message")}> </textarea>
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
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                />
            </div>
        </>
    )
}

export default Review