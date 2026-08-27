import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from "@heroui/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export default function ChangePassword() {
    const [apiTrue, setApiTrue] = useState('');
    const [apiFalse, setApiFalse] = useState('');
    const navigate = useNavigate();

    const { register, formState, handleSubmit } = useForm({
        defaultValues: {
            password: "",
            newPassword: ""
        },
        mode: 'all'
    });

    // 1. استخدام useMutation للتعامل مع عمليات التعديل والإرسال (PATCH)
    const { mutate, isPending } = useMutation({
        mutationFn: (userData) => {
            return axios.patch(
                `https://route-posts.routemisr.com/users/change-password`, 
                userData, 
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
        },
        onSuccess: (response) => {
            setApiTrue('Password updated successfully!');
            setApiFalse('');
            // اختياري: توجيه المستخدم لصفحة تسجيل الدخول أو الملف الشخصي بعد نجاح العملية
            setTimeout(() => navigate('/profile'), 2000);
        },
        onError: (error) => {
            setApiTrue('');
            setApiFalse(error.response?.data?.message || 'Something went wrong, please try again.');
            console.error(error.response);
        }
    });

    // 2. دالة تشغيل الإرسال عند نجاح الـ Validation
    function submitForm(userData) {
        setApiFalse('');
        setApiTrue('');
        // استدعاء الميوتيشن وتمرير البيانات لها
        mutate(userData);
    }

    return (
        <div className='bg-[#1A0B2E] text-[#FFFFFF] flex justify-center p-5 min-h-[calc(100vh-4rem)] items-center relative overflow-hidden'>

            {/* تأثير الإضاءة الخلفية النيون (Glow Effect) */}
            <div className="absolute top-1/4 right-10 w-80 h-80 bg-[#FF0050] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
            <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-[#00F2FE] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

            <div className="w-full max-w-lg border bg-[#1A0B2E]/90 backdrop-blur-md border-[#00F2FE]/30 p-6 rounded-2xl shadow-[0_0_25px_rgba(0,242,254,0.05)] relative z-10">

                {/* أيقونة حماية علوية مودرن */}
                <div className="mx-auto w-12 h-12 rounded-full bg-[#FF0050]/10 flex items-center justify-center text-[#FF0050] mb-4 shadow-[0_0_15px_rgba(255,0,80,0.1)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>

                <h2 className='text-2xl text-[#FFFFFF] text-center font-extrabold tracking-wide mb-2'>Update Password</h2>
                <p className="text-center text-xs text-[#94A3B8] mb-6">Ensure your account stays secure by using a strong password</p>

                <form className='space-y-4' onSubmit={handleSubmit(submitForm)}>

                    {/* Current Password Field */}
                    <div>
                        <Input
                            {...register('password', { required: { value: true, message: 'Current password is required' } })}
                            type='password'
                            aria-label="Current Password"
                            className="w-full my-1"
                            placeholder="Current Password"
                        />
                        {formState.errors.password && formState.touchedFields.password ? (
                            <div className='text-red-500 font-medium text-xs mt-1 px-1'>{formState.errors.password.message}</div>
                        ) : null}
                    </div>

                    {/* New Password Field */}
                    <div>
                        <Input
                            {...register('newPassword', {
                                required: { value: true, message: 'New password is required' },
                                pattern: {
                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                    message: "Must be 8+ chars with uppercase, lowercase, number, and special character."
                                }
                            })}
                            type='password'
                            aria-label="New Password"
                            className="w-full my-1"
                            placeholder="New Password"
                        />
                        {formState.errors.newPassword && formState.touchedFields.newPassword ? (
                            <div className='text-red-500 font-medium text-xs mt-1 px-1'>{formState.errors.newPassword.message}</div>
                        ) : null}
                    </div>

                    {/* API Status Messages */}
                    {apiTrue && <div className='text-emerald-400 font-semibold text-center text-sm py-1'>{apiTrue}</div>}
                    {apiFalse && <div className='text-red-500 font-semibold text-center text-sm py-1'>{apiFalse}</div>}

                    {/* Action Buttons Container */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="w-full order-2 sm:order-1 bg-[#1A0B2E] text-[#00F2FE] border border-[#00F2FE]/30 font-bold text-sm rounded-xl py-3 hover:bg-[#00F2FE]/10 active:scale-[0.98] transition-all"
                        >
                            Cancel
                        </button>
                        <Button
                            isLoading={isPending}
                            className='w-full order-1 sm:order-2 bg-[#FF0050] text-[#FFFFFF] font-extrabold text-sm rounded-xl py-6 shadow-[0_4px_12px_rgba(255,0,80,0.3)] hover:opacity-90 active:scale-[0.98] transition-all'
                            type='submit'
                        >
                            Save Changes
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}
