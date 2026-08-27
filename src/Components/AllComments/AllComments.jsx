import { useMutation, useQueryClient } from '@tanstack/react-query'; // 1. Added useQueryClient
import React from 'react';
import axios from 'axios'; // Ensure axios is imported

export default function AllComments({ comment , post }) {
    // 2. Initialize the query client inside your component
    const queryClient = useQueryClient(); 

    const formattedCommentDate = comment?.createdAt
        ? new Date(comment.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        })
        : '';

    console.log(comment);

    function deleteCommentApi() {
        return axios.delete(`https://route-posts.routemisr.com/posts/${post._id}/comments/${comment._id}`, { 
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
        });
    }

    let { mutate } = useMutation({
        mutationFn: deleteCommentApi,
        onSuccess: () => {
            // 3. Use queryClient to invalidate the keys properly
            queryClient.invalidateQueries({ queryKey: ['allPostComments'] });
           
        }
    });

    return (
        <>
            <div className=" mb-4 bg-[#1A0B2E]/80 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 border border-[#00F2FE]/10">
                <div className="flex items-start gap-2.5 mb-2">
                    <img
                        className="w-7 h-7 sm:w-8 h-8 rounded-full object-cover ring-1 ring-[#00F2FE]/20 flex-shrink-0"
                        src={comment?.commentCreator?.photo || "/docs/images/people/profile-picture-3.jpg"}
                        alt={comment?.commentCreator?.name}
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                            <div className="flex items-baseline gap-1 min-w-0">
                                <span className="text-xs font-bold text-[#FFFFFF] truncate">
                                    {comment?.commentCreator?.name}
                                </span>
                                <span className="text-[10px] text-[#00F2FE] truncate hidden xs:inline">
                                    @{comment?.commentCreator?.username}
                                </span>
                            </div>

                            <div className="flex w-1/4 justify-between">  
                                <span className="text-[10px] text-[#94A3B8] font-medium whitespace-nowrap">
                                    {formattedCommentDate || comment?.createdAt}
                                </span>
                                <button className='cursor-pointer' onClick={() => mutate()}>  
                                    <svg xmlns="http://w3.org" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed whitespace-pre-line break-words">
                            {comment?.content}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
