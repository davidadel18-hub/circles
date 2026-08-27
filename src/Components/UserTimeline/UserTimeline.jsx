import React from 'react'
import PostCard from '../PostCard/PostCard'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function UserTimeline({userId , profile = false}) {

  function userPostsApi(){
    return axios.get(`https://route-posts.routemisr.com/users/${userId}/posts` , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    )
    
  }
let {data , isPending} = useQuery({
    queryKey:['getUserPosts' , userId] ,
    queryFn:userPostsApi ,
    enabled:!!userId
  })



  return (
    <>
    <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">

       {data?.data?.data?.posts?.map((post) => (
                    <PostCard key={post._id} post={post} manyComments={false} profile={profile}/>
                  ))}
    </div>
    </>
  )
}
