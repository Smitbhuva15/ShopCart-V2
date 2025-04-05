"use client"
import Link from 'next/link'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, SubmitHandler } from "react-hook-form"
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const schema = yup
  .object()
  .shape({
    firstName: yup.string().min(3, "FirstName must be at least 3 characters").required(),
    lastName: yup.string().min(3, "LastName must be at least 3 characters").required(),
    email: yup.string().email("proper email is required").required(),
    password: yup.string().min(8, "Password must be at least 8 characters").required(),

  })
  .required();



const title = "Resister";
const btnText = "Resister Now"

export default function SignUp() {

  const{data:session,status}=useSession();
   const router=useRouter()
  if(status==='authenticated'){
    router.push('/');
  }

  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true)
    
    try {
      const res = await fetch("/api/auth/signup", {
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
    finally {
      setIsLoading(false)
      
    }
  };

  return (
    <div>
      <div className='login-section padding-tb section-bg'>
        <div className='container'>
          <div className='account-wrapper'>

            <h3 className='title'>{title}</h3>
            <form className='account-form' onSubmit={handleSubmit(onSubmit, handleFormError)}>
              <div className='form-group'>
                <input type="text" id="name" placeholder='First Name *' {...register("firstName")} required />
              </div>
              <div className='form-group'>
                <input type="text" id="name" placeholder='Last Name *' {...register("lastName")} required />
              </div>
              <div className='form-group'>
                <input type="email" id="email" placeholder='Email Address *' {...register("email")} required />
              </div>
              <div className='form-group'>
                <input type="password" id="password" placeholder='Password * ' {...register("password")} required />
              </div>



              <div className='form-group'>

                {
                  isLoading ? (
                    <button type='submit' className='d-block lab-btn'>
                      <span>
                        Loading...
                      </span>
                    </button>
                  )
                    :
                    (
                      <button type='submit' className='d-block lab-btn'>
                        <span>
                          {btnText}
                        </span>
                      </button>
                    )
                }

              </div>
            </form>

            {/* account bottom */}
            <div className='account-bottom'>
              <span className='d-block cate pt-10'>
                Have an Account? <Link href="/login" >Login</Link>
              </span>



            </div>

          </div>
        </div>
      </div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />

    </div>
  )
}
