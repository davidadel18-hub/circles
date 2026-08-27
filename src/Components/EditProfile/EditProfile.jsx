import { Button } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // 1. 🎯 تم إضافة الاستيراد المفقود للتوست هنا
import { BeatLoader } from 'react-spinners';

export default function EditProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // لتحديث كاش بيانات الحساب فوراً بالخلفية
  const changePicInput = useRef(null)
  
  // حالة وهمية لحفظ رابط المعاينة السريعة للصورة قبل ضغط حفظ
  const [previewUrl, setPreviewUrl] = useState(null)

  function changePhotoApi(finalFormData) {
    return axios.put('https://route-posts.routemisr.com/users/upload-photo', finalFormData, { 
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
    })
  }

  let { data, mutate, isPending } = useMutation({
    mutationFn: changePhotoApi,
    onSuccess: () => {
      toast('Woohooo! Amazing new photo', {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#1A0B2E',
          color: '#00F2FE',
          boxShadow: '0 4px 15px rgba(0, 242, 254, 0.15)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
        },
      });
      // 2. 🎯 تحديث فوري لكاش البروفايل العالمي لكي تتحدث الصورة الشخصية بالنافبار وكل الصفحات تلقائياً
      queryClient.invalidateQueries({ queryKey: ['getProfileData'] });
      navigate('/profile'); // التوجيه لصفحة البروفايل لرؤية اللمسة الجديدة
    },
    onError: (err) => {
      console.error(err);
      toast('Ooops! something went wrong.', {
        icon: (
          <svg
            className="w-6 h-6 text-[#FF0050] drop-shadow-[0_0_6px_rgba(255,0,80,0.6)] animate-pulse flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://w3.org"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        ),
        style: {
          borderRadius: '10px',
          background: '#1A0B2E',
          color: '#00F2FE',
          boxShadow: '0 4px 15px rgba(0, 242, 254, 0.15)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
        },
      })
    }
  })

  // 3. 🎯 دالة المعاينة والتقاط الصورة فور حدوث الـ onChange
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file)); // توليد رابط للمعاينة بالـ UI
    }
  }

  // 4. دالة التعبئة والرفع النهائي عند الضغط على زر الحفظ
  function changePhotoData(e) {
    e.preventDefault();
    if (!changePicInput.current?.files[0]) {
       toast('Ooops! you forget to choose a photo.', {
        icon: (
          <svg
            className="w-6 h-6 text-[#FF0050] drop-shadow-[0_0_6px_rgba(255,0,80,0.6)] animate-pulse flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://w3.org"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        ),
        style: {
          borderRadius: '10px',
          background: '#1A0B2E',
          color: '#00F2FE',
          boxShadow: '0 4px 15px rgba(0, 242, 254, 0.15)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
        },
      })
      return;
    }

    // إنشاء كائن الـ FormData هنا بالداخل ليكون نظيفاً ومحدثاً بالكامل
    const fileFormData = new FormData()
    fileFormData.append('photo', changePicInput.current.files[0])

    mutate(fileFormData)
  }

  return (
    <>
      <div className='bg-[#1A0B2E] text-[#FFFFFF] flex justify-center p-5 min-h-[calc(100vh-4rem)] items-center relative overflow-hidden'>

        {/* تأثير الإضاءة الخلفية النيون (Glow Effect) */}
        <div className="absolute top-1/4 right-10 w-80 h-80 bg-[#FF0050] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-[#00F2FE] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

        <div className="w-full max-w-lg border bg-[#1A0B2E]/90 backdrop-blur-md border-[#00F2FE]/30 p-6 rounded-2xl shadow-[0_0_25px_rgba(0,242,254,0.05)] relative z-10">

          {/* أيقونة رفع وحركة التنطيط المشروطة بالتمرير */}
          <div className="mx-auto w-16 h-12 rounded-full flex items-center justify-center mb-4 relative">
            <div className="w-12 h-12 rounded-full bg-[#FF0050]/10 flex items-center justify-center text-[#FF0050] shadow-[0_0_15px_rgba(255,0,80,0.1)] animate-bounce hover:animate-none flex-shrink-0 transition-all duration-300">
              <label htmlFor='updatePicPhoto' className="cursor-pointer flex items-center justify-center w-full h-full">
                {/* 5. 🎯 تم ربط الـ handleFileChange بحدث الـ onChange هنا لقراءة الصورة فوراً */}
                <input ref={changePicInput} onChange={handleFileChange} className='hidden' type='file' id='updatePicPhoto' accept="image/*" disabled={isPending} />
                <svg
                  className="w-6 h-6 text-[#00F2FE] hover:text-[#FF0050] cursor-pointer transition-colors duration-200 drop-shadow-[0_0_5px_rgba(0,242,254,0.4)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://w3.org"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.435-.135-3.623M19.5 12l2.25-2.25M19.5 12l-2.25-2.25" />
                </svg>
              </label>
            </div>
          </div>

          <h2 className='text-2xl text-[#FFFFFF] text-center font-extrabold tracking-wide mb-2'>Shining with your new photo</h2>
          <p className="text-center text-xs text-[#94A3B8] mb-6">You are awesome anyway</p>

          {/* 🎯 جزء اختياري مميز لعرض معاينة مصغرة للصورة المختارة بداخل المودال قبل الحفظ لزيادة الجمالية */}
          {previewUrl && (
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.3)] mb-6 aspect-square">
               <img src={previewUrl} alt="Selected Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <form className='space-y-4' onSubmit={changePhotoData}>
            {/* Action Buttons Container */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              
              
              {/* تبديل الـ Button تلقائياً بالـ BeatLoader ليعطي مؤشر رفع نيون احترافي */}
             {isPending? <>
             <Button
                type="submit"
                disabled={isPending}
                className=' hidden w-full order-1 sm:order-2 bg-[#FF0050] text-[#FFFFFF] font-extrabold text-sm rounded-xl py-6 shadow-[0_4px_12px_rgba(255,0,80,0.3)] hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center min-h-[48px]'
              >

              </Button><button
                type="button"
                disabled={isPending}
                onClick={() => navigate(-1)}
                className="hidden w-full order-2 sm:order-1 bg-[#1A0B2E] text-[#00F2FE] border border-[#00F2FE]/30 font-bold text-sm rounded-xl py-3 hover:bg-[#00F2FE]/10 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                Cancel
              </button>
                <div className="flex items-center justify-center w-full"><BeatLoader size={6} color="#FF0050" /></div>
             </>
              :
              <>
               <Button
                type="submit"
                disabled={isPending}
                className='w-full order-1 sm:order-2 bg-[#FF0050] text-[#FFFFFF] font-extrabold text-sm rounded-xl py-6 shadow-[0_4px_12px_rgba(255,0,80,0.3)] hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center min-h-[48px]'
              >
               {'Save Changes'}
                
              </Button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => navigate(-1)}
                className="w-full order-2 sm:order-1 bg-[#1A0B2E] text-[#00F2FE] border border-[#00F2FE]/30 font-bold text-sm rounded-xl py-3 hover:bg-[#00F2FE]/10 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              </>
            }
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
