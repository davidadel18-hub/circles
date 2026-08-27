import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0F051D] text-[#FFFFFF] border-t border-[#00F2FE]/10 relative overflow-hidden pt-12 pb-6" dir="ltr">
      {/* تأثيرات الإضاءة الخلفية النيون المدمجة بذكاء بالفوتر */}
      <div className="absolute -bottom-10 -right-10 w-60 h-64 bg-[#FF0050] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-60 h-64 bg-[#00F2FE] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          
          {/* العمود الأول: اسم التطبيق والبايو التعريفي */}
          <div className="md:col-span-1 space-y-3">
            <Link to="/" className="text-xl font-black tracking-wider text-[#00F2FE] drop-shadow-[0_0_6px_rgba(0,242,254,0.4)]">
              Next.Generation
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed font-medium max-w-sm mx-auto md:mx-0">
              Just connected with your real circle! Experience the next era of decentralized tech space built for modern cyber creators.
            </p>
          </div>

          {/* العمود الثاني: روابط التنقل الداخلي بالموقع */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#FF0050] tracking-widest uppercase drop-shadow-[0_0_4px_rgba(255,0,80,0.2)]">Platform</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li><Link to="/home" className="hover:text-[#00F2FE] transition-colors">Home Timeline</Link></li>
              <li><Link to="/profile" className="hover:text-[#00F2FE] transition-colors">Personal Profile</Link></li>
              <li><Link to="/bookmarks" className="hover:text-[#00F2FE] transition-colors">Bookmarks</Link></li>
            </ul>
          </div>

          {/* العمود الثالث: روابط الدعم والأمان */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#00F2FE] tracking-widest uppercase drop-shadow-[0_0_4px_rgba(0,242,254,0.2)]">Security</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li><Link to="/change-password" className="hover:text-[#FF0050] transition-colors">Change Password</Link></li>
              <li><Link to="/privacy" className="hover:text-[#FF0050] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#FF0050] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* العمود الرابع: أيقونات السوشيال ميديا التفاعلية بالتأثير المضيء */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#FFFFFF] tracking-widest uppercase">Connect</h4>
            <div className="flex items-center justify-center md:justify-start gap-4">
              {/* أيقونة فيسبوك */}
              <a href="#" className="p-2 bg-[#1A0B2E] border border-[#00F2FE]/20 text-[#00F2FE] rounded-xl hover:bg-[#00F2FE] hover:text-[#1A0B2E] transition-all active:scale-90 shadow-[0_0_8px_rgba(0,242,254,0.05)]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              {/* أيقونة إكس / تويتر */}
              <a href="#" className="p-2 bg-[#1A0B2E] border border-[#FF0050]/20 text-[#FF0050] rounded-xl hover:bg-[#FF0050] hover:text-white transition-all active:scale-90 shadow-[0_0_8px_rgba(255,0,80,0.05)]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-5.427 3.746L22.5 21.75H15.79L10.53 14.806L4.517 21.75H1.207l5.416-6.196L1.25 2.25h6.88l4.752 6.287 5.356-6.287zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
              </a>
              {/* أيقونة لينكد إن */}
              <a href="#" className="p-2 bg-[#1A0B2E] border border-[#00F2FE]/20 text-[#00F2FE] rounded-xl hover:bg-[#00F2FE] hover:text-[#1A0B2E] transition-all active:scale-90 shadow-[0_0_8px_rgba(0,242,254,0.05)]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* سطر الحقوق السفلي وعلامة التصميم الاحترافية */}
        <div className="pt-6 border-t border-[#00F2FE]/5 text-center flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-500 font-semibold tracking-wide">
          <p>© {currentYear} Next.Generation App. All cyber rights reserved.</p>
          <p className="flex items-center gap-1">
            Designed with <span className="text-[#FF0050] animate-pulse">❤️</span> David Poctor
          </p>
        </div>
      </div>
    </footer>
  );
}
