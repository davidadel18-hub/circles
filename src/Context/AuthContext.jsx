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
        queryKey: ['getProfileData', userToken], // أضفنا userToken هنا لتحديث البيانات تلقائياً فور تسجيل الدخول
        queryFn: userProfile,
        enabled: !!userToken && userToken !== 'undefined' && userToken !== 'null',
        staleTime: 10 * 60 * 1000 
    })

    // ✅ تم إزالة شرط الـ return المبكر للـ Spinner من هنا لضمان عدم تدمير الـ Router وحظر الـ Navigation

    return (
        <AuthContext.Provider value={{ userToken, setUserToken, userDataReq }}>
            {children}
        </AuthContext.Provider>
    )
}
