import React, { useState } from 'react';

import {Link, useNavigate} from 'react-router-dom';
import { loginDOM } from '../services/authication';
import { Alert } from '../components/alert';
export default function Login() {

  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });
  const [showalert, setShowalert] = useState(false)
  const Navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setloginData({
      ...loginData,
      [name]: value,
    });
  };
  const handleCloseAlert = () => {
    setShowalert(false);
  };
  
const loginHandler = async(e) =>{
  e.preventDefault();
  const res = await loginDOM(loginData);
  if(res.status === 200){
    Navigate('/');
  }
  else if(res.status === 202){
    setShowalert(true);
  }
// console.log(loginData);
}

  return (
    <>
    
    <Alert bgcolor={"red"} title={"Login Failed"} desc={"Unauthorized User"} bool={showalert} onClose={handleCloseAlert}/>
    

    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={loginHandler} >
          <div>
            <label htmlFor="email" className="block text-sm  font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2 text-center">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleInputChange}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        
      </div>
    </div>



    

  </>
  )
}

