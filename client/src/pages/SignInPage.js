import React, { useState } from "react";
import axios from "axios";
import { LockClosedIcon } from '@heroicons/react/20/solid';
import {Link} from "react-router-dom";

const logo = "https://freesvg.org/img/Cocktail.png"
const postEndpoint = "https://drinks-backend.lm.r.appspot.com/api/auth";

export default function SignInPage() {

  const [user, setUser] = useState({
    email: "",
    password: "",
    signInError: false,
    signedIn: false,
  });

  let jwtToken = ""; 
  const handleSubmit = ((e) => {
    e.preventDefault();
    axios.post(postEndpoint, {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      jwtToken = response.data.token;
      localStorage.setItem('token', jwtToken);
      setUser({
        email:"",
        password: "",
        signInError: false,
        signedIn: true,
      })
      window.location.reload(false);        //Refresh the page for the NavBar change
    })
    .catch((err) => {
      setUser(prevState => ({...prevState, signInError:true, signedIn:false}))
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
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
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

            <div className="flex items-center justify-between">

              {user.signInError && <div className="flex items-center bg-orange-50">
                <p className="ml-1 block text-sm text-red-500 font-semibold">
                Wrong Email or Password !
                </p>
              </div>}

              {user.signedIn && <div className="flex items-center bg-lime-50">
                <p className="ml-1 block text-sm text-green-500 font-semibold">
                Successfully signed in !
                </p>
                {window.location="/"}
              </div>}

              {user.signedIn || <div className="text-sm">
              <Link to="/forgotpassword">
                <a className="font-medium text-sky-700 hover:text-sky-600">
                  Forgot your password?
                </a>
                </Link>
              </div>}
            </div>

            <div>
              <button
                type="submit"
                
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-800 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}