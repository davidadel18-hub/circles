import React from 'react';

export default function Hero() {
  return (
    <div className="bg-[#1A0B2E] text-[#FFFFFF] min-h-[calc(100vh-4rem)] flex items-center relative overflow-hidden select-none">
      
      {/* الدوائر الخلفية المضيئة (Glow Effects) المتناسقة مع الألوان الجديدة */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#00F2FE] rounded-full blur-[140px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#FF0050] rounded-full blur-[160px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* الجزء الأيسر: النصوص والدعوة للإجراء (CTA) */}
        <div className="space-y-6 text-center md:text-left">
        
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Connect with <br />
            <span className="bg-gradient-to-r from-[#FF0050] via-[#00F2FE] to-[#FF0050] bg-clip-text text-transparent">
              Your Real Circle
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-lg mx-auto md:mx-0">
            Share moments, join live audio spaces, and chat securely with your friends. No algorithm manipulation, just real connections.
          </p>

          {/* أزرار التحميل من المتاجر */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <a href="#" className="flex items-center justify-center gap-3 bg-[#FF0050] text-[#FFFFFF] px-6 py-3 rounded-xl font-semibold shadow-[0_0_15px_rgba(255,0,80,0.3)] hover:bg-[#FF0050]/90 transition-all duration-200 hover:-translate-y-0.5">
              {/* أيقونة آبل */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z"/>
              </svg>
              App Store
            </a>
            
            <a href="#" className="flex items-center justify-center gap-3 bg-[#1A0B2E] text-[#00F2FE] border border-[#00F2FE]/30 px-6 py-3 rounded-xl font-semibold hover:bg-[#00F2FE]/10 transition-all duration-200 hover:-translate-y-0.5">
              {/* أيقونة جوجل بلاي */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M5.23 2.18c-.23.23-.37.58-.37 1.02v17.6c0 .44.14.79.37 1.02l.06.06L15.35 12l-10.06-10.12-.06.3zM18.71 8.65l-3.36 1.92-3.31-3.3 3.31-3.3 3.36 1.91c.96.55.96 1.45 0 2.01zM12.04 12.63l-3.36-3.36L2 15.99c.31.33.82.37 1.41.03l8.63-4.91zM12.04 11.37L3.41 6.46C2.82 6.12 2.31 6.16 2 6.49l6.68 6.69 3.36-3.36z"/>
              </svg>
              Google Play
            </a>
          </div>

          {/* إحصائيات سريعة */}
          <div className="flex gap-8 justify-center md:justify-start pt-6 text-sm border-t border-[#FFFFFF]/10">
            <div>
              <p className="text-xl font-bold text-[#00F2FE]">2M+</p>
              <p className="text-[#94A3B8]">Active Users</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#FF0050]">4.9</p>
              <p className="text-[#94A3B8]">App Rating</p>
            </div>
          </div>
        </div>

        {/* الجزء الأيمن: محاكاة واجهة التطبيق (Mockup Section) */}
        <div className="relative flex justify-center items-center">
          
          {/* البطاقة الرئيسية (منشور مستخدم) */}
          <div className="w-full max-w-[340px] bg-[#1A0B2E] border border-[#00F2FE]/20 rounded-3xl p-5 shadow-2xl relative z-20 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF0050] to-[#00F2FE] p-0.5">
                  <div className="w-full h-full bg-[#1A0B2E] rounded-full flex items-center justify-center font-bold text-xs text-[#00F2FE]">JD</div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#FFFFFF]">John Doe</h4>
                  <p className="text-xs text-[#94A3B8]">@johndoe • 2m ago</p>
                </div>
              </div>
              <button className="text-[#94A3B8] text-lg hover:text-[#FF0050]">•••</button>
            </div>
            
            <p className="text-sm text-[#FFFFFF]/90 mb-4 leading-relaxed">
              Just launching our new product design space tonight! Who is ready to look inside? 🚀 <span className="text-[#00F2FE]">#design</span> <span className="text-[#FF0050]">#tech</span>
            </p>
            
            <div className="h-40 bg-[#1A0B2E]/50 rounded-2xl border border-[#FFFFFF]/5 flex items-center justify-center text-[#94A3B8] text-sm">
              [ Feed Media Preview ]
            </div>
          </div>

          {/* بطاقة جانبية طائرة (إشعار متابعة) */}
          <div className="absolute top-10 -right-4 bg-[#1A0B2E]/90 backdrop-blur-md border border-[#FF0050]/30 p-3 rounded-2xl shadow-xl z-30 flex items-center gap-3 animate-bounce [animation-duration:4s] max-w-[200px]">
            <div className="w-8 h-8 rounded-full bg-[#FF0050] text-[#FFFFFF] flex items-center justify-center text-xs font-bold shadow-[0_0_8px_rgba(255,0,80,0.5)]">🎯</div>
            <div>
              <p className="text-xs font-semibold text-[#FFFFFF]">Sarah followed you</p>
              <p className="text-[10px] text-[#94A3B8]">Just now</p>
            </div>
          </div>

          {/* بطاقة غرف الصوت الحية (Live Audio Space) */}
          <div className="absolute -bottom-6 -left-4 bg-[#1A0B2E]/90 backdrop-blur-md border border-[#00F2FE]/30 p-4 rounded-2xl shadow-xl z-30 w-56">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#1A0B2E] bg-[#00F2FE] px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(0,242,254,0.5)]">● Live Space</span>
              <span className="text-xs text-[#94A3B8]">🔥 1.2k listening</span>
            </div>
            <h5 className="text-xs font-bold truncate text-[#FFFFFF]">Crypto & Web3 Future Tech</h5>
          </div>

        </div>

      </div>
    </div>
  );
}
