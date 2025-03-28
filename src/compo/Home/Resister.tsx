"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import toast, { Toaster } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const subTitle = "Save The Day";
const desc = "Limited Time Offer Hurry!";

const title = (
    <h2 className='title'>Join on Day Long Free Workshop for <b>Advance <span>Mastering</span>on Sales</b></h2>
)
type Inputs = {
    email: string
    username: string
    phone_no: string
}


const schema = yup
  .object()
  .shape({
    username: yup.string().min(3,"userName must be at least 3 characters").required(),
    phone_no: yup.string().length(10,"Phone Number must be exact 10 characters").required(),
    email:yup.string().email("proper email is required").required()
  })
  .required();

export default function Resister() {

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
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                const message = await res.json();
                reset()
                toast.success(message.message)

            }
            else{
                const errmessage = await res.json();
                toast.error(errmessage.message)
            }
        } catch (error) {
            console.log(error, "error found");
        }
    };
    return (
        <section className='register-section padding-tb pb-0'>
            <div className='container'>
                <div className='row g-4 row-cols-lg-2 row-cols-1 align-item-center'>
                    <div className='col'>
                        <div className='section-header'>
                            <span className='subtitle'>{subTitle}</span>
                            {title}
                            <p>{desc}</p>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='section-wrapper'>
                            <h4>Register Now</h4>
                            <form className='register-form' onSubmit={handleSubmit(onSubmit, handleFormError )}>
                                <input type="text" placeholder='Username' className='reg-input' {...register("username")} />
                                <input type="email" placeholder='Email' className='reg-input' {...register("email")} />
                                <input type="number" placeholder='Number' className='reg-input' {...register("phone_no")} />
                                <button type='submit' className='lab-btn'>Resister Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </section>
    )
}
