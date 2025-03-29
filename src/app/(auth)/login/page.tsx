import Link from 'next/link'
import React from 'react'


const title = "Login";
const btnText = "Login Now"

export default function Login() {

  return (
    <div>
      <div className='login-section padding-tb section-bg'>
        <div className='container'>
          <div className='account-wrapper'>

            <h3 className='title'>{title}</h3>
            <form className='account-form'>
              <div className='form-group'>
                <input type="email" name="email" id="email" placeholder='Email Address *' required />
              </div>
              <div className='form-group'>
                <input type="password" name="password" id="password" placeholder='Password * ' required />
              </div>



              <div className='form-group'>
                <button type='submit' className='d-block lab-btn'>
                  <span>
                    {btnText}
                  </span>
                </button>
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
    </div>
  )
}


