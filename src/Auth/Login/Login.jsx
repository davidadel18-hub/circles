import React, { use, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button } from "@heroui/react";
import { useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  let { userToken, setUserToken } = useContext(AuthContext)
  let [apiTrue, setApiTrue] = useState('')
  let [apiFalse, setApiFalse] = useState('')
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  const { register, formState, setError, handleSubmit } = useForm(
    {
      defaultValues: {
        email: "",
        password: ""
      }, mode: 'all'
    }
  )

  function submitForm(userData) {
    setApiFalse('')
    setApiTrue('')
    setLoading(true)
    axios.post('https://route-posts.routemisr.com/users/signin', userData)
      .then((response) => {
        



        setApiTrue(response.data.message)
        setUserToken(response.data.data.token)
        localStorage.setItem('token', response.data.data.token)
        navigate('/home')

      })
      .catch((error) => {
      
        setApiFalse(error.response.data.message)
      })
      .finally(() => { setLoading(false) })


  }

  return (
    <>
      <form className='' onSubmit={handleSubmit(submitForm)}>
        <div className='bg-[#1A0B2E] text-[#FFFFFF] flex justify-center p-5 min-h-[calc(100vh-4rem)] items-center'>
          <div className="w-full max-w-lg border bg-[#1A0B2E] border-[#00F2FE]/30 p-6 rounded-2xl shadow-[0_0_20px_rgba(0,242,254,0.05)]">
            <h2 className='bg-[#FF0050] text-2xl text-[#FFFFFF] text-center container mx-auto rounded-2xl p-4 font-extrabold tracking-wide shadow-[0_0_15px_rgba(255,0,80,0.2)] mb-6'>Login Now</h2>

            <div className="space-y-4">
              <div>           <Input  {...register('email', { required: { value: true, message: 'email is required' }, pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Please enter a valid email address (e.g., name@example.com)' } })} type='email' aria-label="Email" className="w-full my-1" placeholder="Enter your user email" />
                {formState.errors.email && formState.touchedFields.email ? <div className='text-center text-red-500 font-medium text-sm mt-1'>{formState.errors.email.message}</div> : null}

              </div>
              <div>            <Input  {...register('password', { required: { value: true, message: 'password is required' }, pattern: { value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, message: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g., @, #, $)." } })} type='password' aria-label="password" className="w-full my-1" placeholder="Enter your user password" />
                {formState.errors.password && formState.touchedFields.password ? <div className='text-center text-red-500 font-medium text-sm mt-1'>{formState.errors.password.message}</div> : null}

              </div>
            </div>

            {apiTrue && <div className='text-emerald-400 font-semibold text-center my-3'>{apiTrue}</div>}
            {apiFalse && <div className='text-red-500 font-semibold text-center my-3'>{apiFalse}</div>}

            <Button isDisabled={loading} className='w-full my-2 bg-[#FF0050] text-[#FFFFFF] font-extrabold text-base rounded-xl py-6 shadow-[0_4px_12px_rgba(255,0,80,0.3)] hover:opacity-90 active:scale-[0.98] transition-all' type='submit' >{loading ? 'loading...' : 'Submit'}</Button>
          
           
          </div>
        </div>
      </form>

    </>
  )
}
