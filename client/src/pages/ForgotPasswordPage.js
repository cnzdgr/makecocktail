import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiOutlineMail } from 'react-icons/ai';

const logo = "https://freesvg.org/img/Cocktail.png"


function ChangePasswordPage() {
  const postEndpoint = "https://drinks-backend.lm.r.appspot.com/api/users/forgotPassword";
    const [passwordSent, setPasswordSent] = useState({
      email: "",
      sent: false,
      error: false,
      });


    const handleSubmit = ((e) => {
        e.preventDefault();
        axios.post(postEndpoint, {email:passwordSent.email})
        .then((response)=> {
          setPasswordSent({
            email:"",
            sent: true,
            error: false,
          })
        })
        .catch((err) => {
          passwordSent(prevState => ({...prevState, sent:false, error:true}))
        })
      });

    return (

        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src={logo}
                alt="Site logo"
              />
              <h3 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Forgot your password?
              </h3>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Your Email address"
                    onChange={(e) => setPasswordSent(prevState => ({...prevState, email:e.target.value}))}
                  />
                </div>
              </div>
  
              <div className="flex items-center justify-between">
  
                {passwordSent.error && <div className="flex items-center bg-orange-50">
                  <p className="ml-1 block text-sm text-red-500 font-semibold">
                  Could not find this email on our database. You may register.
                  </p>
                </div>}
  
                {passwordSent.sent && <div className="flex items-center bg-lime-50">
                  <p className="ml-1 block text-sm text-green-500 font-semibold">
                  An email is sent to you. Please check your mailbox and click the link inside the email.
                  </p>
                </div>}
  
              </div>
  
              <div>
                <button
                  type="submit"
                  
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-800 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <AiOutlineMail className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  Send Password Link
                </button>
              </div>
            </form>
          </div>
        </div>
    )
};

export default ChangePasswordPage;

