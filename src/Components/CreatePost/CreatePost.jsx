import { Input } from '@heroui/react'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'
import { AuthContext } from '../../Context/AuthContext'

export default function CreatePost() {

    let userDataResponse = useContext(AuthContext)

    let [srcImg, setSrcImg] = useState(null)

    // 🎯 تم تعديل اسم المتغير هنا إلى query ليطابق استدعائك له بالأسفل
    let query = useQueryClient()
    let postBodyInput = useRef(null)
    let postImageInput = useRef(null)

    function imgPreview(e) {
        const file = e.target.files[0]
        if (file) {
            setSrcImg(URL.createObjectURL(file))
        }
    }

    function removeImgPreview() {
        setSrcImg(null)
        if (postImageInput.current) {
            postImageInput.current.value = ''
        }
    }

    function postData() {
        let formData = new FormData()

        if (!postBodyInput.current.value.trim() && !postImageInput.current.files[0]) return;

        if (postBodyInput.current.value) {
            formData.append('body', postBodyInput.current.value);
        }

        if (postImageInput.current.files[0]) {
            formData.append('image', postImageInput.current.files[0])
        }

        console.log(formData);
        mutate(formData)
    }

    function createPostApi(formData) {
        return axios.post('https://route-posts.routemisr.com/posts', formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    let { data, mutate, error, isPending } = useMutation({
        mutationFn: createPostApi,
        onSuccess: () => {
            toast('Just connected with your real circle!', {
                icon: '👏',
                style: {
                    borderRadius: '10px',
                    background: '#1A0B2E',
                    color: '#00F2FE',
                    boxShadow: '0 4px 15px rgba(0, 242, 254, 0.15)',
                    border: '1px solid rgba(0, 242, 254, 0.3)', 
                },
            });

            // تنظيف الحقول والمعاينة بعد نجاح النشر تماماً
            if (postBodyInput.current) postBodyInput.current.value = '';
            if (postImageInput.current) postImageInput.current.value = '';
            setSrcImg(null);

            // 🎯 تم تصحيح الأخطاء الاستدعائية هنا واستخدام المتغير الموحد query وتحديث الكاش بشكل سليم
            query.invalidateQueries({ queryKey: ['getPosts'] });
            query.invalidateQueries({ queryKey: ['getUserPosts'] });
        },
        onError: () => {
            toast('Ooops! something went wrong.', {
                icon: (
                    <svg
                        className="w-6 h-6 text-[#FF0050] drop-shadow-[0_0_6px_rgba(255,0,80,0.6)] animate-pulse flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://w3.org"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                ),
                style: {
                    borderRadius: '10px',
                    background: '#1A0B2E',
                    color: '#00F2FE',
                    boxShadow: '0 4px 15px rgba(0, 242, 254, 0.15)',
                    border: '1px solid rgba(0, 242, 254, 0.3)', 
                },
            })
        }
    })

    return (
        <>
            <div className='w-3/4 mx-auto mb-6 bg-gradient-to-r from-[#1A0B2E]/90 to-[#25123e]/90 border border-[#00F2FE]/40 rounded-2xl sm:rounded-3xl shadow-[0_0_20px_rgba(0,242,254,0.1)] p-4 sm:p-5 transition-all duration-300 hover:border-[#FF0050]/50 hover:shadow-[0_0_25px_rgba(255,0,80,0.15)] text-[#FFFFFF] backdrop-blur-md'>
                <div className='container mx-auto flex flex-col space-y-4' >
                    <div className="flex gap-2.5 sm:gap-3 items-center w-full" dir="ltr">
                        {/* صورة المستخدم الحالي */}
                        <img
                            className="w-8 h-8 sm:w-9 h-9 rounded-full object-cover ring-2 ring-[#00F2FE]/40 flex-shrink-0"
                            src={userDataResponse?.userDataReq?.data?.data?.data?.user?.photo}
                            alt="Current logged-in avatar"
                        />

                        {/* الـ Form ممتد بالكامل ليملأ المساحة المتاحة بالتساوي */}
                        <form className="flex-1 min-w-0" onSubmit={(e) => { e.preventDefault(); postData() }}>
                            <div className="w-full flex items-center gap-2">
                                {/* حقل إدخال النص */}
                                <input
                                    ref={postBodyInput}
                                    type="text"
                                    disabled={isPending}
                                    placeholder="what's on your mind..."
                                    className="w-full bg-[#0F051D]/80 border border-[#00F2FE]/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00F2FE]/60 focus:bg-[#0F051D] transition-all disabled:opacity-50"
                                />

                                {/* زر اختيار الصورة */}
                                <label
                                    htmlFor='image'
                                    className={`p-2 bg-[#FF0050]/10 text-[#FF0050] border border-[#FF0050]/20 rounded-xl hover:bg-[#FF0050]/20 hover:text-white transition-all active:scale-95 flex-shrink-0 cursor-pointer flex items-center justify-center min-w-[38px] min-h-[38px] ${isPending ? 'pointer-events-none opacity-50' : ''}`}
                                >
                                    <svg
                                        className="w-5 h-5 drop-shadow-[0_0_4px_rgba(255,0,80,0.3)]"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://w3.org"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9" />
                                    </svg>
                                    <input ref={postImageInput} onChange={imgPreview} type="file" id='image' className='hidden' disabled={isPending} />
                                </label>

                                {/* زر إرسال المنشور التفاعلي - تم إكمال الكود المقطوع وإغلاق العناصر */}
                                {isPending ? (
                                    <div className="p-2 min-w-[38px] flex items-center justify-center flex-shrink-0">
                                        <BeatLoader size={6} color="#00F2FE" />
                                    </div>
                                ) : (
                                    <button
                                        type="submit"
                                        className="p-2 bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/20 rounded-xl hover:bg-[#00F2FE]/20 transition-all active:scale-95 flex-shrink-0 flex items-center justify-center min-w-[38px] min-h-[38px]"
                                    >
                                        <svg className="w-4 h-4 transform rotate-45" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* حاوية معاينة الصورة بعد الاختيار وقبل الرفع */}
                    {srcImg && (
                        <div className="relative w-full max-w-xs mt-2 overflow-hidden rounded-xl border border-[#00F2FE]/20 bg-[#0F051D]/50 aspect-video group">
                            <img src={srcImg} alt="Preview" className="w-full h-full object-cover" />
                            <button 
                                type="button" 
                                onClick={removeImgPreview}
                                className="absolute top-2 right-2 p-1.5 bg-[#1A0B2E]/80 text-[#FF0050] border border-[#FF0050]/30 rounded-full hover:bg-[#FF0050] hover:text-white transition-all shadow-md"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
