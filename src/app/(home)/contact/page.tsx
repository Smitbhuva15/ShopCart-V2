"use client"
import PageHeader from "@/compo/Common/PageHeader";
import GoogleMap from "./GoogleMap";
import { contactList } from "@/lib/newdata";
import toast, { Toaster } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, SubmitHandler } from "react-hook-form"


const subTitle = "Get in touch with us";
const title = "We're Always Eager To Hear From You!";
const conSubTitle = "Get in touch with Contact us";
const conTitle =
  "Help us get to know you better by completing the form below.";
const btnText = "Send our Message";


type Inputs = {
  Name: string;
  phone_no: string;
  email: string;
  subject: string;
  message: string;
};

const schema = yup
  .object()
  .shape({
    Name: yup.string().min(3, "userName must be at least 3 characters").required(),
    phone_no: yup.string().length(10, "Contact Number must be exact 10 characters").required("Contact Number is require"),
    email: yup.string().email("proper email is required").required(),
    subject: yup.string().min(10, "Subject must be at least 10 characters").required(),
    message: yup.string().min(10, "message must be at least 10 characters").required()

  })
  .required();


export default function Contact() {

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
      const res = await fetch("/api/contact", {
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
    <div>
      <PageHeader title={"Get In Touch With US"} curPage={"Contact Us"} />
      <div className='map-address-section padding-tb section-bg'>
        <div className='container'>
          <div className='section-header text-center'>
            <span className='subtitle'>{subTitle}</span>
            <h2 className='title'>{title}</h2>
          </div>

          <div className='section-wrapper'>
            <div className='row flex-row-reverse'>
              <div className='col-xl-4 col-lg-5 col-12'>
                <div className='contact-wrapper'>
                  {
                    contactList.map((val, i) => (
                      <div className='contact-item' key={i}>
                        <div className='contact-thumb' key={i}>
                          <img src={val.imgUrl} alt="" />
                        </div>
                        <div className='contact-content'>
                          <h6 className='title'>{val.title}</h6>
                          <p>{val.desc}</p>
                        </div>
                      </div>
                    ))

                  }
                </div>
              </div>

              {/* google map */}

              <div className='col-xl-8 col-lg-7 col-12'>
                <GoogleMap />

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='contact-section padding-tb'>
        <div className='container'>
          <div className='section-header text-center'>
            <span className='subtitle'>{conSubTitle}</span>
            <h2 className='title'>{conTitle}</h2>
          </div>

          <div className='section-wrapper'>
            <form className='contact-form' onSubmit={handleSubmit(onSubmit, handleFormError)}>
              <div className='form-group'>
                <input type="text" id="name" placeholder='Your Name *' {...register("Name")} />

              </div>
              <div className='form-group'>
                <input type="email" id="email" placeholder='Your Email *' {...register("email")} />

              </div>
              <div className='form-group'>
                <input type="number" id="number" placeholder='Phone Number *' {...register("phone_no")} />

              </div>
              <div className='form-group'>
                <input type="text" id="subject" placeholder='Subject' {...register("subject")} />

              </div>
              <div className='form-group w-100'>
                <textarea id="message" rows={8} placeholder='Your Message' className='textarea ' {...register("message")}></textarea>
              </div>
              <div className='form-group w-100 text-center'>
                <button className='lab-btn'>
                  <span>{btnText}</span>
                </button>
              </div>
            </form>

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
