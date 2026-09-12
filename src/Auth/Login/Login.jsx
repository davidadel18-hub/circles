import React, { useContext, useState } from 'react';
import { Button } from '@heroui/react'; // تركنا الزر فقط من هيرو يو آي للحفاظ على المظهر الاحترافي
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

export default function Login() {
  let { userToken, setUserToken } = useContext(AuthContext);
  let [apiTrue, setApiTrue] = useState('');
  let [apiFalse, setApiFalse] = useState('');
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  let { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }, 
    mode: 'all'
  });

  function submitForm(userData) {
    setApiFalse('');
    setApiTrue('');
    setLoading(true);

    axios.post('https://routemisr.com', userData)
      .then((response) => {
        console.log(response.data.message); 
        setApiTrue(response.data.message); 
        if (response.data.message === 'success') {
          localStorage.setItem('token', response.data.token);
          setUserToken(response.data.token);
          navigate('/home'); // أو المسار الذي ترغب في التوجيه إليه بعد تسجيل الدخول
        }
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
        setApiFalse(error.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // الـ classes المشتركة لتوحيد شكل الحقول وتأثير الـ Focus باللون #12506C
  const inputStyle = "w-full my-1 block px-3 py-2.5 bg-transparent border border-[#00F2FE]/30 rounded-xl text-white outline-none focus:border-[#12506C] focus:ring-1 focus:ring-[#12506C] transition-all placeholder:text-gray-500 text-left";

  return (
    <>
      <div className='bg-[#1A0B2E] text-[#FFFFFF] flex justify-center p-5 min-h-[calc(100vh-4rem)] items-center'>
        <div className="w-full max-w-lg bg-[#1A0B2E] border border-[#00F2FE]/30 p-6 rounded-2xl shadow-[0_0_20px_rgba(0,242,254,0.05)]">
          <h2 className='bg-[#FF0050] text-2xl text-[#FFFFFF] text-center container mx-auto rounded-2xl p-4 font-extrabold tracking-wide shadow-[0_0_15px_rgba(255,0,80,0.2)] mb-6'>Login Now</h2>
          
          <form className='container mx-auto space-y-4' onSubmit={handleSubmit(submitForm)}>
            
            {/* Email */}
            <div className="flex flex-col text-left">
              <label htmlFor="email" className="text-xs font-medium text-gray-400 mb-1 px-1">Email</label>
              <input 
                id="email" 
                {...register('email', { 
                  required: 'email is required', 
                  pattern: { 
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                    message: 'Please enter a valid email address' 
                  } 
                })} 
                type='email' 
                className={inputStyle} 
                placeholder="Enter your user email" 
              />
              {formState.errors.email && <div className='text-center text-red-500 font-medium text-sm mt-1'>{formState.errors.email.message}</div>}
            </div>

            {/* Password */}
            <div className="flex flex-col text-left">
              <label htmlFor="password" className="text-xs font-medium text-gray-400 mb-1 px-1">Password</label>
              <input 
                id="password" 
                {...register('password', { 
                  required: 'password is required' 
                })} 
                type='password' 
                className={inputStyle} 
                placeholder="Enter your user password" 
              />
              {formState.errors.password && <div className='text-center text-red-500 font-medium text-sm mt-1'>{formState.errors.password.message}</div>}
            </div>

            {apiTrue && <div className='text-emerald-400 font-semibold text-center my-2'>{apiTrue}</div>}
            {apiFalse && <div className='text-red-500 font-semibold text-center my-2'>{apiFalse}</div>}

            <Button isDisabled={loading} className='w-full my-2 bg-[#FF0050] text-[#FFFFFF] font-extrabold text-base rounded-xl py-6 shadow-[0_4px_12px_rgba(255,0,80,0.3)] hover:opacity-90 active:scale-[0.98] transition-all' type='submit'>
              {loading ? 'loading...' : 'Submit'}
            </Button>

          </form>
        </div>
      </div>
    </>
  );
}
