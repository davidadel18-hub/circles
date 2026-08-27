import React from 'react';
import SingleUserSuggestions from './SingleUserSuggestion/SingleUserSuggestions';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function FollowSuggestions() {

    function followSuggestionsApi(){
        return axios.get('https://route-posts.routemisr.com/users/suggestions?limit=10' , {
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        })
    }
let { data } = useQuery({
    queryKey:['getFollowSuggestions'] , 
    queryFn:followSuggestionsApi
})


    return (
        <div className="sticky top-4 right-4 w-full max-w-sm mx-auto bg-[#1A0B2E] border border-[#FFB7A5]/20 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl text-[#FFB7A5]" dir="ltr">

            {/* العنوان العلوي */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#FFB7A5]/10">
                <h4 className="text-sm sm:text-base font-bold tracking-wide">
                    Expand your social circle
                </h4>
                
            </div>

            {/* قائمة الاقتراحات الثابتة (Static UI) */}
            <div className="space-y-4">

           {data?.data?.data?.suggestions.map((suggestion)=>{return <SingleUserSuggestions key={suggestion._id} suggestion={suggestion}/>})}

            </div>

        </div>
    );
}
