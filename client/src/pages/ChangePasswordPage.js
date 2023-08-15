import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { LockClosedIcon } from '@heroicons/react/20/solid';

const logo = "https://freesvg.org/img/Cocktail.png";
const postEndpoint = "https://drinks-backend.lm.r.appspot.com/api/users/changePassword";


export default function ChangePasswordPage() {
  const [user, setUser] = useState({
    oldPassword:"",
    newPassword:"",
    email:"",
    changeError:false,
    changed:false,
    token:[],
  });

useEffect(() => {
  const jwtToken = localStorage.getItem('token');
  if (jwtToken) {
    setUser(prevState => ({...prevState, token:jwtToken, email:jwtDecode(jwtToken).email}))
  }
}, []);

  let axiosConfig = {
    headers: {
      "x-auth-token": user.token
    }
  };

  const handleSubmit = ((e) => {
    e.preventDefault();
    axios.post(postEndpoint, {
      email: user.email,
      oldPassword: user.oldPassword,
      newPassword: user.newPassword,
    }, axiosConfig)
    .then((response) => {
      setUser(prevState => ({...prevState, changeError:false, changed:true, oldPassword:"", newPassword:""}))
      window.location.reload();
    })
    .catch((err) => {
      setUser(prevState => ({...prevState, changeError:true, changed:false}))
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
              Change Password
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="password" className="sr-only">
                  Old Password
                </label>
                <input
                  id="old-password"
                  name="old-password"
                  type="password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Old Password"
                  onChange={(e) => setUser(prevState => ({...prevState, oldPassword:e.target.value}))}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  New Password
                </label>
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="New Password"
                  onChange={(e) => setUser(prevState => ({...prevState, newPassword:e.target.value}))}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">

              {user.changeError && <div className="flex items-center bg-orange-50">
                <p className="ml-1 block text-sm text-red-500 font-semibold">
                Wrong Password !
                </p>
              </div>}

              {user.changed && <div className="flex items-center bg-lime-50">
                <p className="ml-1 block text-sm text-green-500 font-semibold">
                Success !
                </p>
              </div>}
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-800 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};