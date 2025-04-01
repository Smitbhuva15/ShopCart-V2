"use client"
import Link from 'next/link'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, SubmitHandler } from "react-hook-form"
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';



type Inputs = {
  email: string;
  password: string;
};

const schema = yup
  .object()
  .shape({
    email: yup.string().email("proper email is required").required(),
    password: yup.string().min(8, "Password must be at least 8 characters").required(),

  })
  .required();


const title = "Login";
const btnText = "Login Now"

export default function Login() {

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
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
  }

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setIsLoading(true)

    const signinData = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    })

    console.log(signinData)
    if (!signinData || !signinData.ok) {
      toast.error("Invalid Email or Password!!");
    } else {
      toast.success("User Login Successfully!!");
      reset();
      router.push("/");
    }
    setIsLoading(false)


  };

  return (
    <div>
      <div className='login-section padding-tb section-bg'>
        <div className='container'>
          <div className='account-wrapper'>

            <h3 className='title'>{title}</h3>
            <form className='account-form' onSubmit={handleSubmit(onSubmit, handleFormError)}>
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
                Don't Have an Account? <Link href="/singup">Sign Up</Link>
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


