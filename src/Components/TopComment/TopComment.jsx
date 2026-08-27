import React from 'react'

export default function TopComment({ topComment }) {



    // Format top comment date if it exists
    const formattedCommentDate = topComment?.createdAt
        ? new Date(topComment.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        })
        : '';

    return (
        <>
            <div className="mb-4 bg-[#1A0B2E]/80 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 border border-[#00F2FE]/10">
                <div className="flex items-start gap-2.5">
                    <img
                        className="w-7 h-7 sm:w-8 h-8 rounded-full object-cover ring-1 ring-[#00F2FE]/20 flex-shrink-0"
                        src={topComment?.commentCreator?.photo || "/docs/images/people/profile-picture-3.jpg"}
                        alt={topComment?.commentCreator?.name}
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                            <div className="flex items-baseline gap-1 min-w-0">
                                <span className="text-xs font-bold text-[#FFFFFF] truncate">
                                    {topComment?.commentCreator?.name}
                                </span>
                                <span className="text-[10px] text-[#00F2FE] truncate hidden xs:inline">
                                    @{topComment?.commentCreator?.username}
                                </span>
                            </div>
                            <span className="text-[10px] text-[#94A3B8] font-medium whitespace-nowrap">
                                {formattedCommentDate || topComment?.createdAt}
                            </span>
                        </div>
                        <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed whitespace-pre-line break-words">
                            {topComment?.content}
                        </p>
                    </div>
                </div></div>
        </>
    )
}
