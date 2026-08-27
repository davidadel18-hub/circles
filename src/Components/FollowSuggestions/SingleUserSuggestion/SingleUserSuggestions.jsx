import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function SingleUserSuggestions({suggestion}) {


    function followReq(){

        return axios.put(`https://route-posts.routemisr.com/users/${suggestion._id}/follow` , undefined , {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    }
let query = useQueryClient()
  let {mutate } = useMutation({
        mutationFn:followReq , 
        onSuccess:()=>{query.invalidateQueries({queryKey:['getFollowSuggestions'] })}
    })

  return (
   <>
   <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <img
                            className="w-9 h-9 rounded-full object-cover ring-1 ring-[#FFB7A5]/20 flex-shrink-0"
                            src={suggestion?.photo}
                            alt={suggestion?.name}
                        />
                        <div className="flex flex-col min-w-0">
                            <span className="text-xs sm:text-sm font-bold truncate leading-tight  text-white">
                                {suggestion?.name}
                            </span>
                            <span className="text-[11px]  text-[#00F2FE] truncate">
                                @{suggestion?.username}
                            </span>
                            <span className="text-[11px]  text-[#FFB7A5]/20 ">
                                {suggestion?.followersCount} Followers
                            </span>
                        </div>
                    </div>
                    <button onClick={(e)=> mutate()} type="button" className=" px-3 py-1 text-xs font-bold bg-[#FFB7A5] text-[#1A0B2E] rounded-full hover:bg-[#FFB7A5]/90 transition-all flex-shrink-0">
                        Follow
                    </button>
                </div>
   </>
  )
}
