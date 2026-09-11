import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CreatePost from '../CreatePost/CreatePost';
import UserTimeline from '../UserTimeline/UserTimeline';

export default function UsersProfile() {
    const params = useParams();
    const [activeFullImg, setActiveFullImg] = useState(null);

    // استخراج داتا المستخدم باختصار
    function getUserApi() {
        return axios.get(`https://route-posts.routemisr.com/users/${params.id}/profile`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
    }

    const { data, isLoading } = useQuery({
        queryKey: ['getUserProfile', params.id],
        queryFn: getUserApi
    });

    const user = data?.data?.data?.user;

    let formattedDate = user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    }) : "No birth date provided";

    console.log(user);

    // حماية الـ Loading
    if (isLoading || !user) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-[#1A0B2E]">
                <div className="w-5 h-5 border-2 border-[#00F2FE] border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-[#00F2FE] font-semibold text-sm">Connecting to circle's profile...</span>
            </div>
        );
    }

    return (
        <>
            <div className="w-full bg-[#1A0B2E] text-[#FFFFFF] min-h-[calc(100vh-4rem)] pb-12 relative" dir="ltr">

                {/* قسم الهيدر / الغلاف والصورة الشخصية */}
                <div className="w-full relative bg-[#0F051D]">

                    {user?.cover ? (
                        // 🎯 الكافر متاح: عند الضغط عليه يفتح بالحجم الكامل
                        <div className="w-full h-48 sm:h-64 md:h-80 overflow-hidden relative border-b border-[#00F2FE]/20 cursor-pointer">
                            <button onClick={() => setActiveFullImg(user.cover)} className="w-full h-full block focus:outline-none">
                                <img src={user?.cover} alt="Cover" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                            </button>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B2E] to-transparent pointer-events-none"></div>
                        </div>
                    ) : (
                        // 🎯 الكافر غير متاح: نفتح الصورة الشخصية البديلة عند الضغط على منطقة الكافر
                        <div className="w-full h-48 sm:h-64 md:h-80 overflow-hidden relative border-b border-[#00F2FE]/20 cursor-pointer">
                            <button onClick={() => setActiveFullImg(user?.photo)} className="w-full h-full block focus:outline-none">
                                <img src={user?.photo} alt="Cover Backup" className="w-full h-full object-cover opacity-80 blur-[2px] hover:blur-0 transition-all duration-300" />
                            </button>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B2E] to-transparent pointer-events-none"></div>
                        </div>
                    )}

                    {/* محاذاة الصورة الشخصية والمعلومات الأساسية */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 sm:-mt-24 flex flex-col sm:flex-row sm:items-end sm:justify-between pb-6 border-b border-[#00F2FE]/10 gap-4">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left min-w-0">

                            {/* 🎯 الصورة الشخصية: عند الضغط عليها تفتح بـ الـ Photo الفعلي */}
                            <img
                                src={user?.photo}
                                alt={user?.name}
                                onClick={() => setActiveFullImg(user?.photo)}
                                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover ring-4 ring-[#00F2FE] shadow-[0_0_20px_rgba(0,242,254,0.4)] flex-shrink-0 bg-[#1A0B2E] cursor-pointer hover:scale-105 transition-transform duration-200"
                            />
                            <div className="flex flex-col mb-2 min-w-0">
                                <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide truncate flex items-center justify-center sm:justify-start gap-1.5">
                                    {user?.name}
                                    <span className="text-[#00F2FE] text-sm animate-pulse">⚡</span>
                                </h1>
                                <span className="text-xs sm:text-sm text-[#00F2FE] font-medium truncate">@{user?.username}</span>
                                <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-md font-medium leading-relaxed">
                                    Born: {formattedDate}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* قسم العدادات والإحصائيات الرقمية (Metrics Bar) */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    <div className="grid grid-cols-3 gap-2 bg-[#1A0B2E]/60 border border-[#00F2FE]/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center backdrop-blur-md">
                        <div className="flex flex-col">
                            <span className="text-base sm:text-xl font-black text-[#FFFFFF]">{user?.bookmarksCount || 0}</span>
                            <span className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">bookmarks</span>
                        </div>
                        <div className="flex flex-col border-x border-[#00F2FE]/10">
                            <span className="text-base sm:text-xl font-black text-[#00F2FE] drop-shadow-[0_0_5px_rgba(0,242,254,0.3)]">{user?.followersCount || 0}</span>
                            <span className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">Followers</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base sm:text-xl font-black text-[#FF0050] drop-shadow-[0_0_5px_rgba(255,0,80,0.3)]">{user?.followingCount || 0}</span>
                            <span className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">Following</span>
                        </div>
                    </div>
                </div>

                {/* خلاصة المنشورات */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    <div className="w-full max-w-2xl mx-auto space-y-6">
                        <div className="flex items-center gap-2 border-b border-[#00F2FE]/10 pb-2">
                            <span className="text-sm font-bold text-[#00F2FE] tracking-widest uppercase">My Timeline</span>
                            <div className="h-[2px] bg-gradient-to-r from-[#00F2FE] to-transparent flex-1 rounded"></div>
                        </div>

                        <UserTimeline userId={user?.id} />
                    </div>
                </div>

                {/* نافذة عرض الصورة بالحجم الكامل إذا كانت مفعلة */}
                {activeFullImg && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setActiveFullImg(null)}>
                        <div className="relative max-w-4xl max-h-full">
                            <img src={activeFullImg} alt="Full view" className="max-w-full max-h-[85vh] object-contain rounded" />
                            <button className="absolute -top-10 right-0 text-white text-xl font-bold">✕ Close</button>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}
