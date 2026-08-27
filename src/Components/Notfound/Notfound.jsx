import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1A0B2E] text-[#FFFFFF] min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden select-none px-4">
      
      {/* الدوائر الخلفية المضيئة النيون (Neon Glow Effects) لطاقة بصرية مودرن */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#FF0050] rounded-full blur-[160px] opacity-15 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-[#00F2FE] rounded-full blur-[140px] opacity-10 pointer-events-none"></div>

      <div className="max-w-md w-full text-center relative z-10 space-y-6">
        
        {/* الأنيميشن الرقمي الصارخ */}
        <div className="relative inline-block">
          <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#FF0050] via-[#00F2FE] to-[#FF0050] drop-shadow-[0_0_30px_rgba(255,0,80,0.2)] animate-pulse">
            404
          </h1>
          {/* تأثير خطأ رقمي (Glitch Vibe) خفيف */}
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#00F2FE] text-[#1A0B2E] text-xs uppercase font-extrabold tracking-widest px-2 py-0.5 rounded shadow-[0_0_10px_rgba(0,242,254,0.5)]">
            Lost in Space
          </span>
        </div>

        {/* النصوص التوضيحية */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF]">
            This post or page skipped the feed!
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-sm mx-auto">
            The link might be broken, or the creator has deleted this piece of history. Let's get you back to your circle.
          </p>
        </div>

        {/* أزرار التوجيه (Call to Actions) المتناسقة مع الـ Hero والـ Navbar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link 
            to="/home" 
            className="flex items-center justify-center bg-[#FF0050] text-[#FFFFFF] px-6 py-3 rounded-xl font-extrabold text-sm shadow-[0_4px_15px_rgba(255,0,80,0.3)] hover:bg-[#FF0050]/90 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Go to Home Feed
          </Link>
          
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center justify-center bg-[#1A0B2E] text-[#00F2FE] border border-[#00F2FE]/30 px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#00F2FE]/10 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            ← Back to Safety
          </button>
        </div>

      </div>
    </div>
  );
}
