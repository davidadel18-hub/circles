import React, { useContext, useState } from 'react';
import { Button } from '@heroui/react'; // تركنا الزر فقط من هيرو يو آي للحفاظ على شكله الاحترافي
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

export default function Register() {
  let { userToken, setUserToken } = useContext(AuthContext);
  let [apiTrue, setApiTrue] = useState('');
  let [apiFalse, setApiFalse] = useState('');
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  let { register, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: ""
    }, 
    mode: 'all'
  });

  let passwordValue = watch('password');

  function submitForm(userData) {
    setApiFalse('');
    setApiTrue('');
    setLoading(true);

    const payload = { ...userData };
    if (payload.dateOfBirth) {
      payload.dateOfBirth = new Date(payload.dateOfBirth).toISOString();
    }

    axios.post('https://routemisr.com', payload)
      .then((response) => {
        console.log(response.data.message); 
        setApiTrue(response.data.message); 
        if (response.data.message === 'account created') {
          localStorage.setItem('token', response.data.data.token);
          setUserToken(response.data.data.token);
          navigate('/');
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

  // الـ classes المشتركة لتوحيد شكل كل الحقول وتناسقها عند الـ Focus
  const inputStyle = "w-full my-1 block px-3 py-2.5 bg-transparent border border-[#00F2FE]/30 rounded-xl text-white outline-none focus:border-[#12506C] focus:ring-1 focus:ring-[#12506C] transition-all placeholder:text-gray-500 text-left";

  return (
    <>
      <div className='bg-[#1A0B2E] text-[#FFFFFF] flex justify-center p-5 min-h-[calc(100vh-4rem)] items-center'>
        <div className="w-full max-w-lg bg-[#1A0B2E] border border-[#00F2FE]/30 p-6 rounded-2xl shadow-[0_0_20px_rgba(0,242,254,0.05)]">
          <h2 className='bg-[#FF0050] text-2xl text-[#FFFFFF] text-center container mx-auto rounded-2xl p-4 font-extrabold tracking-wide shadow-[0_0_15px_rgba(255,0,80,0.2)] mb-6'>Register Now</h2>
          
          <form className='container mx-auto space-y-4' onSubmit={handleSubmit(submitForm)}>
            
           {/* Name */}
<div className="flex flex-col text-left">
  <label htmlFor="name" className="text-xs font-medium text-gray-400 mb-1 px-1">Name</label>
  <input 
    id="name" 
    {...register('name', { 
      required: 'name is required', 
      minLength: { value: 4, message: 'min 4 letters' }, 
      maxLength: { value: 30, message: 'max 30 letters' },
      // تم إضافة شرط قبول الحروف العربية والإنجليزية والمسافات فقط هنا
      pattern: {
        value: /^[a-zA-Z\u0600-\u06FF\s]+$/,
        message: 'Name must contain letters only (no numbers or special characters)'
      }
    })} 
    type='text' 
    className={inputStyle} 
    placeholder="Enter your name" 
  />
  {formState.errors.name && <div className='text-center text-red-500 font-medium text-sm mt-1'>{formState.errors.name.message}</div>}
</div>


            {/* Username */}
            <div className="flex flex-col text-left">
              <label htmlFor="username" className="text-xs font-medium text-gray-400 mb-1 px-1">Username</label>
              <input id="username" {...register('username', { required: 'user name is required', minLength: { value: 5, message: 'min 5 letters' }, maxLength: { value: 30, message: 'max 30 letters' } })} type='text' className={inputStyle} placeholder="Enter your user name" />
              {formState.errors.username && <div className='text-center text-red-500 font-medium text-sm mt-1'>{formState.errors.username.message}</div>}
            </div>

            {/* Email */}
            <div className="flex flex-col text-left">
              <label htmlFor="email" className="text-xs font-medium text-gray-400 mb-1 px-1">Email</label>
              <input id="email" {...register('email', { required: 'email is required', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Please enter a valid email address' } })} type='email' className={inputStyle} placeholder="Enter your user email" />
              {formState.errors.email && <div className='text-center text-red-500 font-medium text-sm mt-1'>{formState.errors.email.message}</div>}
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



            {/* Gender */}
            <div>
              <div className="flex justify-center text-[#00F2FE] py-1 font-medium gap-4">
                <label className='mx-2 flex items-center gap-2 cursor-pointer hover:text-[#FF0050] transition-colors'>
                  <input {...register('gender', { required: 'Gender is required' })} type="radio" value="male" className="accent-[#00F2FE] w-4 h-4" /> 
                  <span className="text-[#FFFFFF]">Male</span>
                </label>
                <label className='mx-2 flex items-center gap-2 cursor-pointer hover:text-[#FF0050] transition-colors'>
                  <input {...register('gender', { required: 'Gender is required' })} type="radio" value="female" className="accent-[#00F2FE] w-4 h-4" /> 
                  <span className="text-[#FFFFFF]">Female</span>
                </label>
              </div>
              {formState.errors.gender && <div className='text-center text-red-500 font-medium text-sm mt-1'>{formState.errors.gender.message}</div>}
            </div>

            {/* Password */}
            <div className="flex flex-col text-left">
              <label htmlFor="password" className="text-xs font-medium text-gray-400 mb-1 px-1">Password</label>
              <input id="password" {...register('password', { required: 'password is required', pattern: { value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, message: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character." } })} type='password' className={inputStyle} placeholder="Enter your user password" />
              {formState.errors.password && <div className='text-center text-red-500 font-medium text-sm mt-1'>{formState.errors.password.message}</div>}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col text-left">
              <label htmlFor="rePassword" className="text-xs font-medium text-gray-400 mb-1 px-1">Confirm Password</label>
              <input id="rePassword" {...register('rePassword', {
                required: 'please reEnter your password',
                validate: (value) => value === passwordValue || 'Password and re-password do not match'
              })} type='password' className={inputStyle} placeholder="Repassword" />
              {formState.errors.rePassword && <div className='text-center text-red-500 font-medium text-sm mt-1'>{formState.errors.rePassword.message}</div>}
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
