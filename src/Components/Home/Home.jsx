import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { CounterContext } from '../../Context/CounterContext'
import { Button } from '@heroui/react'
import axios from 'axios'
import PostCard from '../PostCard/PostCard'
import { useQuery } from '@tanstack/react-query'
import CreatePost from '../CreatePost/CreatePost'
import { Helmet } from 'react-helmet'
import FollowSuggestions from '../FollowSuggestions/FollowSuggestions'

export default function Home() {

  function getAllPosts() {
    return axios.get("https://route-posts.routemisr.com/posts", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
  }

  let { data, error, isLoading, isError } = useQuery({
    queryKey: ['getPosts'],
    queryFn: getAllPosts,
    initialData:2 * 60 * 1000,
  })

 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-[#1A0B2E]" dir="ltr">
        <div className="inline-flex items-center gap-2.5 bg-[#1A0B2E] border border-[#00F2FE]/30 shadow-[0_0_15px_rgba(0,242,254,0.1)] font-semibold rounded-2xl text-sm px-5 py-3 text-[#00F2FE]">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-[#1A0B2E] animate-spin fill-[#00F2FE]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="tracking-wide text-[#FFFFFF]">Loading posts...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-[#1A0B2E]" dir="ltr">
        <div className="inline-flex items-center gap-2.5 bg-[#1A0B2E] border border-[#FF0050]/30 shadow-[0_0_15px_rgba(255,0,80,0.1)] font-semibold rounded-2xl text-sm px-5 py-3 text-[#FF0050]">
          <span className="tracking-wide">{error.message}</span>
        </div>
      </div>
    );
  }

  return (
 <>
      <div className="w-full bg-[#1A0B2E] text-[#FFB7A5] min-h-screen">
        <div className="container mx-auto p-4 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* العمود الرئيسي: يحتوي على إنشاء البوست والمنشورات */}
          <div className="lg:col-span-2 space-y-6">
            <CreatePost />
            
            {/* يظهر الفولو ساجيشن هنا في الشاشات الصغيرة فقط والموبايل */}
            <div className="block lg:hidden">
              <FollowSuggestions />
            </div>

            <div className="grid grid-cols-1 gap-6">
              {data?.data?.data?.posts?.map((post) => { return <PostCard key={post._id} post={post} /> })}
            </div>
          </div>

          {/* العمود الجانبي: يظهر هنا في الشاشات الكبيرة فقط */}
          <div className="hidden lg:block relative">
            <FollowSuggestions />
          </div>

        </div>
      </div>
    </>
  )
}
