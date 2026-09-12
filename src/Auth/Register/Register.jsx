import React, { useContext, useRef, useState } from 'react'
import { Button, Description, Label, Radio, RadioGroup } from '@heroui/react';
import { Form, useNavigate } from 'react-router-dom';
import { Input } from "@heroui/react";
import { useForm } from "react-hook-form"
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

export default function Register() {
  let { userToken, setUserToken } = useContext(AuthContext)
  let [apiTrue, setApiTrue] = useState('')
  let [apiFalse, setApiFalse] = useState('')
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  let { register, handleSubmit, setError, formState, watch } = useForm(
    {
      defaultValues:
      {
        name: "",
        username: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        password: "",
        rePassword: ""
      }, mode: 'all'

    })
  let passwordValue = watch('password')

  function submitForm(userData) {
    setApiFalse('')
    setApiTrue('')
    setLoading(true)


    console.log(userData);

    axios.post('https://route-posts.routemisr.com/users/signup', userData)
      .then((response) => {
        console.log(response.data.message);
        setApiTrue(response.data.message)
        if (response.data.message === 'account created') {
          localStorage.setItem('token', response.data.data.token)
          setUserToken(response.data.data.token)
          navigate('/')
        }

      })
      .catch((error) => {
        console.log(error.response.data.message);
        setApiFalse(error.response.data.message)
      })
      .finally(() => { setLoading(false) })







  }


  return (
    <>
      <div className='bg-[#1A0B2E] text-[#FFFFFF] flex justify-center p-5 min-h-[calc(100vh-4rem)] items-center'>
        <div className="w-full max-w-lg bg-[#1A0B2E] border border-[#00F2FE]/30 p-6 rounded-2xl shadow-[0_0_20px_rgba(0,242,254,0.05)]">
          <h2 className='bg-[#FF0050] text-2xl text-[#FFFFFF] text-center container mx-auto rounded-2xl p-4 font-extrabold tracking-wide shadow-[0_0_15px_rgba(255,0,80,0.2)] mb-6'>Register Now</h2>
          <form className='container mx-auto space-y-4' onSubmit={handleSubmit(submitForm)}>

            {/* Name Input Field */}
            <div>
              <Input
                {...register('name', {
                  required: { value: true, message: 'name is required' },
                  minLength: { value: 4, message: 'min 4 letters' },
                  maxLength: { value: 30, message: 'max 30 letter' },
                  pattern: {
                    value: /^[a-zA-Z\s\u0600-\u06FF]+$/,
                    message: 'Name can only contain letters and spaces'
                  }
                })}
                type='text'
                aria-label="Name"
                className="w-full my-1 bg-transparent border border-[#12506C] text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-[#12506C] focus:border-[#12506C] transition-all"
                placeholder="Enter your name"
              />
              {formState.errors.name && formState.touchedFields.name ? (
                <div className='text-center text-red-500 font-medium text-sm mt-1'>
                  {formState.errors.name.message}
                </div>
              ) : null}
            </div>

            {/* User Name Input Field */}
            <div>
              <Input
                {...register('username', {
                  required: { value: true, message: 'user name is required' },
                  minLength: { value: 5, message: 'min 5 letter' },
                  maxLength: { value: 30, message: 'max 30 letter' }
                })}
                type='text'
                aria-label="User Name"
                className="w-full my-1 bg-transparent text-white border border-[#12506C] outline-none focus:ring-2 focus:ring-[#12506C] focus:border-[#12506C] transition-all"
                placeholder="Enter your user name"
              />
              {formState.errors.username && formState.touchedFields.username ? (
                <div className='text-center text-red-500 font-medium text-sm mt-1'>{formState.errors.username.message}</div>
              ) : null}
            </div>


            {/* Email Input Field */}
            <div>
              <Input
                {...register('email', {
                  required: { value: true, message: 'email is required' },
                  pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Please enter a valid email address (e.g., name@example.com)' }
                })}
                type='email'
                aria-label="Email"
                className="w-full my-1 text-white bg-transparent border border-[#12506C] outline-none focus:ring-2 focus:ring-[#12506C] focus:border-[#12506C] transition-all"
                placeholder="Enter your user email"
              />
              {formState.errors.email && formState.touchedFields.email ? (
                <div className='text-center text-red-500 font-medium text-sm mt-1'>{formState.errors.email.message}</div>
              ) : null}
            </div>


            {/* Date of Birth */}
            <div className="flex flex-col text-left">
              <label htmlFor="dateOfBirth" className="text-xs font-medium text-gray-400 mb-1 px-1">Date of Birth</label>
              <input
                id="dateOfBirth"
                {...register('dateOfBirth', {
                  required: 'your age is required',
                  validate: (value) => {
                    if (!value) return 'your age is required';
                    let currentYear = new Date().getFullYear();
                    let userYear = new Date(value).getFullYear();
                    let userAge = currentYear - userYear;
                    return userAge > 20 || 'age must be more than 20';
                  }
                })}
                type="text"
                placeholder="Select your birth date (dd/mm/yyyy)"
                className="w-full my-1 block px-3 py-2.5 bg-transparent border border-[#00F2FE]/30 rounded-xl text-white outline-none focus:border-[#12506C] focus:ring-1 focus:ring-[#12506C] transition-all placeholder:text-gray-500 text-left"
                style={{ colorScheme: 'dark' }} // الـ style الصحيح يكتب هنا بالأسفل كمكان طبيعي له

                onFocus={(e) => {
                  e.target.type = 'date';
                  setTimeout(() => {
                    e.target.showPicker?.();
                  }, 100);
                }}

                onBlur={(e) => {
                  if (!e.target.value) {
                    e.target.type = 'text';
                  }
                }}
              />
              {formState.errors.dateOfBirth && <div className='text-center text-red-500 font-medium text-sm mt-1'>{formState.errors.dateOfBirth.message}</div>}
            </div>

            <div className="flex justify-center text-[#00F2FE] py-1 font-medium gap-4">

              <label className='mx-2 flex items-center gap-2 cursor-pointer hover:text-[#FF0050] transition-colors'>
                <input {...register('gender', { required: { value: true, message: 'Gender is required' } })} type="radio" value="male" className="accent-[#00F2FE] w-4 h-4" /> <span className="text-[#FFFFFF]">Male</span>

              </label>
              <label className='mx-2 flex items-center gap-2 cursor-pointer hover:text-[#FF0050] transition-colors'>
                <input {...register('gender', { required: { value: true, message: 'Gender is required' } })} type="radio" value="female" className="accent-[#00F2FE] w-4 h-4" /> <span className="text-[#FFFFFF]">Female</span>

              </label>
              {formState.errors.gender && formState.touchedFields.gender ? <div className='text-center text-red-500 font-medium text-sm mt-1'>{formState.errors.gender.message}</div> : null}

            </div>


            {/* Password Input Field */}
            <div>
              <Input
                {...register('password', {
                  required: { value: true, message: 'password is required' },
                  pattern: { value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, message: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g., @, #, $)." }
                })}
                type='password'
                aria-label="password"
                className="w-full my-1 bg-transparent border border-[#12506C] text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-[#12506C] focus:border-[#12506C] transition-all"
                placeholder="Enter your user password"
              />
              {formState.errors.password && formState.touchedFields.password ? (
                <div className='text-center text-red-500 font-medium text-sm mt-1'>{formState.errors.password.message}</div>
              ) : null}
            </div>

            {/* Re-Password Input Field */}
            <div>
              <Input
                {...register('rePassword', {
                  required: { value: true, message: 'please reEnter your password' },
                  validate: function (reValue) {
                    return passwordValue === reValue || 'Password and re-password do not match';
                  }
                })}
                type='password'
                aria-label="rePassword"
                className="w-full my-1 bg-transparent border border-[#12506C] text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-[#12506C] focus:border-[#12506C] transition-all"
                placeholder="Repassword"
              />
              {formState.errors.rePassword && formState.touchedFields.rePassword ? (
                <div className='text-center text-red-500 font-medium text-sm mt-1'>{formState.errors.rePassword.message}</div>
              ) : null}
            </div>

            {apiTrue && <div className='text-emerald-400 font-semibold text-center my-2'>{apiTrue}</div>}
            {apiFalse && <div className='text-red-500 font-semibold text-center my-2'>{apiFalse}</div>}

            <Button isDisabled={loading} className='w-full my-2 bg-[#FF0050] text-[#FFFFFF] font-extrabold text-base rounded-xl py-6 shadow-[0_4px_12px_rgba(255,0,80,0.3)] hover:opacity-90 active:scale-[0.98] transition-all' type='submit' >{loading ? 'loading...' : 'Submit'}</Button>

          </form ></div>
      </div>
    </>
  )
}
