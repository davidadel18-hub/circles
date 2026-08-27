import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';


export default function CreateComment({ user, postId, queryKey }) {


    let query = useQueryClient()

    // إدارة مدخلات النص والصورة بالكامل عبر react-hook-form وبدون State يدوية
    let { register, handleSubmit, reset } = useForm({
        defaultValues: {
            content: '',
            image: ''
        }
    })

    function createCommentApi() {

        return axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })


    }

    let { data, mutate, error, isPending } = useMutation({
        mutationFn: createCommentApi,
        onSuccess: () => {
            console.log('comment created'); reset(); query.invalidateQueries({ queryKey: queryKey });
             toast('Just connected with your real circle!',
                {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#1A0B2E',
                        color: '#00F2FE',
                         boxShadow: '0 4px 15px rgba(0, 242, 254, 0.15)' ,
                         border: '1px solid #00F2FE/30', 
                    },
                }
            )
        },
        onError: (error) => { console.log('comment not created', error); }

    })
    
    let formData = new FormData()

    function createCommentFun(comment) {
   


        if (!comment.content && !comment.image[0]) {
            return
        }

        if (comment.content) {

            formData.append('content', comment.content)
        }

        if (comment.image[0]) {
            formData.append('image', comment.image[0])
        }

        mutate(formData)

    }





    return (
        <>


            <div className="mt-4 flex gap-2.5 sm:gap-3 items-center w-full" dir="ltr">
                {/* صورة المستخدم الحالي */}
                <img
                    className="w-7 h-7 sm:w-8 h-8 rounded-full object-cover ring-1 ring-[#00F2FE]/20 flex-shrink-0"
                    src={user?.photo || "/docs/images/people/profile-picture-3.jpg"}
                    alt="Current logged-in avatar"
                />

                {/* تم إضافة flex-1 للـ form ليمتد الحقل ويأخذ المساحة الكاملة */}
                <form onSubmit={handleSubmit(createCommentFun)} className="flex-1">
                    <div className="w-full flex items-center gap-2">
                        {/* حقل إدخال النص - تم مسح value و useState اليدوية */}
                        <input
                            {...register('content')}
                            type="text"
                            placeholder="Write a comment..."
                            className="w-full bg-[#1A0B2E]/60 border border-[#00F2FE]/20 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00F2FE]/50 transition-colors"
                        />

                        {/* زر اختيار الصورة (Label مرتبط بالـ Input المخفي عبر الـ id) */}
                        <label

                            htmlFor='image'
                            className="p-2 bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/20 rounded-xl hover:bg-[#00F2FE]/20 transition-all active:scale-95 flex-shrink-0 cursor-pointer"
                        >
                            <svg
                                className="w-5 h-5 text-[#00F2FE] hover:text-[#FF0050] transition-colors duration-200 drop-shadow-[0_0_4px_rgba(0,242,254,0.3)]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://w3.org"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9" />
                            </svg>

                            {/* الـ Input الفعلي المربوط بـ react-hook-form ومخفي عن العين */}
                            <input {...register('image')} type="file" id='image' className='hidden' />
                        </label>

                        {isPending ? <BeatLoader color="#00F2FE" /> : <button
                            type="submit"
                            className="p-2 bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/20 rounded-xl hover:bg-[#00F2FE]/20 transition-all active:scale-95 flex-shrink-0"
                        >
                            <svg className="w-5 h-5 transform rotate-45" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>}


                        {/* زر إرسال الـ Form */}

                    </div>
                </form>
            </div>
        </>
    )

}