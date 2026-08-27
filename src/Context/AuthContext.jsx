import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useState } from "react";

export let AuthContext = createContext()

export function AuthContextProvider({ children }) {

    let [userToken, setUserToken] = useState(() => { 
        return localStorage.getItem('token') 
    })

    function userProfile() {
        return axios.get('https://route-posts.routemisr.com/users/profile-data', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    let userDataReq = useQuery({
        queryKey: ['getProfileData'], 
        queryFn: userProfile,
        enabled: !!userToken && userToken !== 'undefined' && userToken !== 'null',
        staleTime: 10 * 60 * 1000 
    })

    // 🎯 هندسة حماية التطبيق بالكامل أثناء انتظار رد السيرفر:
    // إذا كان هناك توكن، والـ API ما زال قيد التحميل (Loading)، نوقف رندرة التطبيق ونعرض شاشة تحميل نيون موحدة
    if (userToken && userDataReq.isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#1A0B2E]" dir="ltr">
                <div className="inline-flex items-center gap-2.5 bg-[#1A0B2E] border border-[#00F2FE]/30 shadow-[0_0_15px_rgba(0,242,254,0.14)] font-semibold rounded-2xl text-sm px-6 py-4 text-[#00F2FE]">
                    <div className="w-5 h-5 border-2 border-[#00F2FE] border-t-transparent rounded-full animate-spin"></div>
                    <span className="tracking-wide text-[#FFFFFF]">Connecting to your circle...</span>
                </div>
            </div>
        );
    }

    // بمجرد وصول الرد بنجاح (أو لو كان مفيش توكن أصلاً)، يتم تمرير الداتا وفتح التطبيق بالكامل بأمان تامة
    return (
        <AuthContext.Provider value={{ userToken, setUserToken, userDataReq }}>
            {children}
        </AuthContext.Provider>
    )
}
