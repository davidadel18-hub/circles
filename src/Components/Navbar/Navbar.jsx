import { useContext, useState } from 'react';
import { NavLink, useNavigate , Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export default function Navbar() {
  // حالة التحكم في فتح وإغلاق قائمة الموبايل (والدروب داون للشاشات الكبيرة)
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { userToken, setUserToken , userDataReq } = useContext(AuthContext);
  

  function logout() {
    setUserToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
      <nav className="bg-[#1A0B2E] text-[#FFFFFF] sticky top-0 z-50 shadow-md border-b border-[#00F2FE]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* تم إضافة الكلاس relative هنا لكي نتمكن من توسيط الروابط بدقة بالنسبة للهيدر */}
          <div className="flex items-center justify-between h-16 relative">
            
            {/* الجزء الأيمن: الشعار فقط */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to={'/'} className="text-xl font-extrabold tracking-wider text-[#00F2FE] drop-shadow-[0_0_6px_rgba(0,242,254,0.4)]">
                  Circles...
                </Link>
              </div>
            </div>

            {/* 🎯 روابط التنقل للشاشات الكبيرة (Desktop) - متموضعة في منتصف النافبار تماماً */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-8 font-medium items-center">
              {localStorage.getItem('token') == null ? null : (
                <> 
                  <NavLink to={'/home'} className="text-[#FFFFFF]/80 hover:text-[#FF0050] transition-colors duration-200">Home</NavLink>
                  <NavLink to={'/profile'} className="text-[#FFFFFF]/80 hover:text-[#FF0050] transition-colors duration-200">Profile</NavLink>
                </>
              )}
            </div>

            {/* الجزء الأيسر: الأزرار وزر القائمة (Burger Menu) */}
            <div className="flex items-center space-x-4">
              
              {/* أزرار اللوجن والساين أب - تظهر في الشاشات الكبيرة على اليسار */}
              <div className="hidden md:flex items-center space-x-4">
                {localStorage.getItem('token') == null && (
                  <> 
                    <NavLink to={'/login'} className="text-[#FFFFFF]/80 hover:text-[#FF0050] px-3 py-2 text-sm font-medium transition-colors duration-200">
                      Login
                    </NavLink>
                    <NavLink to={'/register'} className="text-[#00F2FE] border border-[#00F2FE]/40 hover:border-[#FF0050] hover:text-[#FF0050] px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200">
                      Sign Up
                    </NavLink>
                  </>
                )}
              </div>

              {/* زر البرجر منيو */}
              <div className={`flex items-center ${localStorage.getItem('token') == null ? 'md:hidden' : ''}`}>
                  <Link to={'/profile'}>
                  <img
                            className="w-8 h-8 sm:w-9 h-9 rounded-full object-cover ring-2 ring-[#00F2FE]/40 flex-shrink-0"
                             src={userDataReq.data?.data?.data?.user?.photo}
                            alt="Current logged-in avatar"
                        />
                  </Link>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-[#00F2FE] hover:text-[#FF0050] hover:bg-[#00F2FE]/10 focus:outline-none transition-colors"
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
             
              </div>

              {/* 🎯 قائمة الدروب داون للشاشات الكبيرة - تظهر تحت زر البرجر منيو تماماً من الجهة اليمنى */}
              {localStorage.getItem('token') != null && (
                <div className={`hidden ${isOpen ? 'md:block' : 'hidden'} absolute right-0 sm:right-4 lg:right-8 top-16 w-48 bg-[#1A0B2E] border border-[#00F2FE]/20 rounded-xl shadow-xl py-2 z-50 text-center`}>
                  <NavLink to={'/change-password'} onClick={() => setIsOpen(false)} className="block text-[#FFFFFF]/80 hover:text-[#FF0050] hover:bg-[#00F2FE]/5 px-4 py-2 text-sm font-medium transition-colors">
                    Change Password
                  </NavLink> 
                  <NavLink onClick={() => { logout(); setIsOpen(false); }} to={'/login'} className="block text-[#FFFFFF]/80 hover:text-[#FF0050] hover:bg-[#FF0050]/5 px-4 py-2 text-sm font-medium transition-colors border-t border-[#00F2FE]/10">
                    Logout
                  </NavLink>
                  
                </div>
              )}

            </div>

          </div>
        </div>

        {/* قائمة الشاشات الصغيرة للموبايل (Mobile Menu) */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-[#1A0B2E] border-t border-[#00F2FE]/20`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            {localStorage.getItem('token') == null ? null : (
              <>
                <NavLink to={'/home'} onClick={() => setIsOpen(false)} className="block bg-[#1A0B2E] text-[#00F2FE] px-3 py-2 rounded-md text-base font-medium border border-[#00F2FE]/30">Home</NavLink>
                <NavLink to={'/profile'} onClick={() => setIsOpen(false)} className="block text-[#FFFFFF]/80 hover:bg-[#FF0050]/10 hover:text-[#FF0050] px-3 py-2 rounded-md text-base font-medium transition-colors">Profile</NavLink>
              </>
            )}
            
            {/* أزرار تسجيل الدخول داخل قائمة الموبايل */}
            <div className="pt-4 pb-2 border-t border-[#00F2FE]/20 flex flex-col space-y-2 px-3">
              {localStorage.getItem('token') == null ? (
                <>
                  <NavLink to={'/login'} onClick={() => setIsOpen(false)} className="w-full text-[#FFFFFF]/80 hover:text-[#FF0050] px-3 py-2 text-base font-medium transition-colors">
                    Login
                  </NavLink>
                  <NavLink to={'/register'} onClick={() => setIsOpen(false)} className="w-full text-[#00F2FE] hover:text-[#FF0050] bg-[#00F2FE]/10 hover:bg-[#FF0050]/10 px-3 py-2 rounded-md text-base font-medium transition-all">
                    Sign Up
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to={'/change-password'} onClick={() => setIsOpen(false)} className="block text-[#FFFFFF]/80 hover:text-[#FF0050] px-3 py-2 text-base font-medium transition-colors duration-200">
                    Change Password
                  </NavLink> 
                  <NavLink onClick={() => { logout(); setIsOpen(false); }} to={'/login'} className="w-full text-[#FFFFFF]/80 hover:text-[#FF0050] px-3 py-2 text-base font-medium transition-colors">
                    Logout
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
