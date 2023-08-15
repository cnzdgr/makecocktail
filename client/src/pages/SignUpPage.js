import React, { useState } from "react";
import axios from "axios";
import { LockClosedIcon } from '@heroicons/react/20/solid';

const logo = "https://freesvg.org/img/Cocktail.png"
const postEndpoint = "https://drinks-backend.lm.r.appspot.com/api/users";


export default function SignUpPage() {
  const [user, setUser] = useState({
    name:"",
    email: "",
    password: "",
    signUpError: false,
    registered: false,
  });

  let jwtToken = ""; 
  const handleSubmit = ((e) => {
    e.preventDefault();
    axios.post(postEndpoint, {
      name: user.name,
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      jwtToken = response.data.jwtToken;
      localStorage.setItem('token', jwtToken);
      setUser({
        name:"",
        email:"",
        password: "",
        signUpError: false,
        registered: true,
      })
    })
    .catch((err) => {
      setUser(prevState => ({...prevState, signUpError:err.response.data, registered:false}))
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
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create a New Account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
            <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Name"
                  onChange={(e) => setUser(prevState => ({...prevState, name:e.target.value}))}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setUser(prevState => ({...prevState, email:e.target.value}))}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setUser(prevState => ({...prevState, password:e.target.value}))}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-800 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Create an Account
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between">

            {user.signUpError && <div className="flex items-center">
              <p className="ml-1 block text-sm text-red-500 font-semibold">
              {user.signUpError}
              </p>
            </div>}

            {user.registered && <div className="flex items-center">
              <p className="ml-1 block text-sm text-green-500 font-semibold">
              Successfully registered. Please check your mailbox for the verification email.
              </p>
              {window.location="/"}
            </div>}
          </div>
        </div>
      </div>
  )
}