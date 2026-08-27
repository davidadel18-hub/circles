import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import TopComment from '../TopComment/TopComment';
import AllComments from '../AllComments/AllComments';
import CreateComment from '../CreateComment/CreateComment';
import { jwtDecode } from 'jwt-decode';

export default function PostCard({ post, manyComments = false, profile = false }) {
  let { body, createdAt, image, user, likesCount, sharesCount, commentsCount, topComment, postDetails } = post;
  const token = localStorage.getItem('token');
  let myId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      // 🎯 قراءة المعرف من الحقل الصحيح المخزن داخل التوكن
      myId = decoded.user;
    } catch (e) {
      console.error(e);
    }
  }

  // الـ useState الابتدائية ستقرأ الـ ID الآن بشكل صحيح وتطابقه مع مصفوفة الـ likes
  const [liked, setLiked] = useState(() => {
    return post?.likes?.includes(myId) || false;
  });


  console.log(post._id);
  let query = useQueryClient()
  // حالة التحكم في فتح وإغلاق القائمة المنسدلة للثلاث نقاط
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // حالات التحكم في مودال التعديل ومعاينة الصورة الجديدة
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editImgPreview, setEditImgPreview] = useState(image || null);

  // الـ Refs الخاصة بمدخلات مودال التعديل للوصول للداتا
  const editBodyInput = useRef(null);
  const editImageInput = useRef(null);



  // 1. دالة الـ API التي تقبل الـ postID وتستخدم ميثود PUT
  function likeAndUnlikeApi(postID) {
    return axios.put(`https://route-posts.routemisr.com/posts/${postID}/like`, undefined, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  // 2. كائن الـ Mutation للتحكم في الطلب وإعادة إنعاش كاش المنشورات
  let { mutate: toggleLike, data: toggleData } = useMutation({
    mutationFn: likeAndUnlikeApi,
    onSuccess: (response) => {
      // 1. تحديث العدادات وإعادة جلب المنشورات لضمان دقة الأرقام
      query.invalidateQueries({ queryKey: ['getPosts'] });
      query.invalidateQueries({ queryKey: ['getUserPosts'] });

      // 2. قراءة القيمة من المسار الصحيح الموضح في رد السيرفر المرفق
      const currentLikeStatus = response?.data?.data?.liked;

      if (currentLikeStatus !== undefined) {
        setLiked(currentLikeStatus);
      }
    }
    ,
    onError: (err) => {
      console.error("Like toggle failed:", err.response?.data);
    }
  });
  console.log("My ID from Token:", myId);
  console.log("Post Likes Array:", post?.likes);


  function getPostComments() {
    return axios.get(`https://route-posts.routemisr.com/posts/${post._id}/comments?page=1&limit=10`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
  }

  let { data, isError, error } = useQuery({
    queryKey: ['allPostComments'],
    queryFn: getPostComments,
    enabled: manyComments
  })



  // Format the main post creation date nicely
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  // 1. دالة الـ API الخاصة بحذف البوست
  function deletePostApi(postID) {
    return axios.delete(`https://route-posts.routemisr.com/posts/${postID}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
  }


  let { mutate } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      // 🎯 تحديث كاش الصفحة الرئيسية وكاش البروفايل تلقائياً
      query.invalidateQueries({ queryKey: ['getPosts'] });
      query.invalidateQueries({ queryKey: ['getUserPosts'] });
    }
  });



  // 1. دالة الـ API الخاصة بتعديل البوست (PUT) باستعمال FormData
  function editPostApi({ postID, formData }) {
    return axios.put(`https://route-posts.routemisr.com/posts/${postID}`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
  }

  // 2. كائن الـ Mutation للتعديل
  let { mutate: editMutate, isPending: isEditPending } = useMutation({
    mutationFn: editPostApi,
    onSuccess: () => {
      setIsEditModalOpen(false); // إغلاق المودال عند النجاح
      query.invalidateQueries({ queryKey: ['getUserPosts', user?._id] });
      query.invalidateQueries({ queryKey: ['getPosts'] });
    }
  })

  // 3. دالة معالجة واختيار صورة جديدة داخل مودال التعديل للمعاينة
  function handleEditImgChange(e) {
    const file = e.target.files[0];
    if (file) {
      setEditImgPreview(URL.createObjectURL(file));
    }
  }

  // 4. دالة تجميع وإرسال الـ FormData الخاصة بالتعديل عند الضغط على حفظ
  function submitEditPost(e) {
    e.preventDefault();
    let formData = new FormData();

    if (editBodyInput.current.value) {
      formData.append('body', editBodyInput.current.value);
    }
    if (editImageInput.current.files[0]) {
      formData.append('image', editImageInput.current.files[0]);
    }

    editMutate({ postID: post._id, formData });
  }

  return (
    <div className="w-full mx-auto bg-[#1A0B2E] border border-[#00F2FE]/20 rounded-2xl sm:rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.2)] p-4 sm:p-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,242,254,0.08)] mb-6 text-[#FFFFFF]" dir="ltr">

      {/* Header: User Information & Date */}
      <div className="flex items-center justify-between mb-4 gap-2 relative">
        <Link to={`/${post.user._id}/profile`}>
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <img
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-[#00F2FE]/30 flex-shrink-0"
              src={user?.photo || "/docs/images/people/profile-picture-3.jpg"}
              alt={user?.name}
            />
            <div className="flex flex-col min-w-0">
              <h5 className="text-sm sm:text-base font-bold tracking-tight text-[#FFFFFF] leading-tight truncate">
                {user?.name}
              </h5>
              <span className="text-xs text-[#00F2FE] font-medium truncate">
                @{user?.username}
              </span>
            </div>
          </div>
        </Link>

        <div className="flex justify-end items-center gap-4 w-1/3">
          {/* Post Date */}
          <span className="text-[11px] sm:text-xs text-[#94A3B8] font-medium whitespace-nowrap">
            {formattedDate !== "Invalid Date" ? formattedDate : createdAt}
          </span>

          {/* زر الثلاث نقاط والقائمة المنسدلة */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="focus:outline-none p-1 rounded-full hover:bg-[#00F2FE]/10 transition-colors"
            >
              <svg
                className="w-4 h-4 text-[#FFB7A5] hover:text-[#FFB7A5]/80 transition-colors duration-200 cursor-pointer"
                aria-hidden="true"
                xmlns="http://w3.org"
                fill="currentColor"
                viewBox="0 0 4 15"
              >
                <path d="M2 3.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              </svg>
            </button>

            {/* الـ Dropdown Menu مع الحفاظ على نفس هوية الكود المرسل */}
            {dropdownOpen && (
              <>
                {/* طبقة خلفية شفافة لإغلاق المنيو عند الضغط في أي مكان خارجها */}
                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>

                <div className="absolute right-0 mt-2 w-40 bg-[#1A0B2E] border border-[#00F2FE]/20 rounded-xl shadow-xl z-20 overflow-hidden py-1">
                  {profile ? (
                    <>
                      {/* الخيارات التي تظهر فقط داخل صفحة البروفايل */}
                      <button
                        type="button"
                        onClick={() => { setDropdownOpen(false); setIsEditModalOpen(true); }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[#00F2FE]/10 text-[#FFFFFF] transition-colors"
                      >
                        Edit Post
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          mutate(post._id);
                        }}

                        className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[#FF0050]/10 text-[#FF0050] transition-colors"
                      >
                        Delete Post
                      </button>


                    </>
                  ) : (
                    <>
                      {/* الخيارات التي تظهر خارج البروفايل (مثل صفحة الهوم) */}
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(false)}
                        className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[#FF0050]/10 text-[#FF0050] transition-colors"
                      >
                        Save Post
                      </button>
                    </>
                  )}
                </div>
              </>
            )}

          </div>
        </div>
      </div>

      <Link to={`/post-details/${post._id}`} >
        {/* Post Body Text */}
        <div className="mb-4">
          <p className="text-[#FFFFFF]/90 text-sm sm:text-base leading-relaxed whitespace-pre-line break-words">
            {body}
          </p>
        </div>

        {/* Post Image */}
        {image && (
          <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl border border-[#00F2FE]/20 mb-4 bg-[#1A0B2E]/50 aspect-video">
            <img
              src={image}
              alt="Post content"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.01]"
            />
          </div>
        )}
      </Link>

      {/* Action & Metrics Bar */}
      <div className="flex flex-wrap items-center justify-between py-2 border-t border-b border-[#00F2FE]/20 gap-2 mb-4">
        {/* Counter Display Stats */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-[#94A3B8]">
          <span className="whitespace-nowrap">
            <strong className="text-[#FF0050] font-bold">{liked ? likesCount + 1 : likesCount}</strong> Likes
          </span>
          <span className="whitespace-nowrap">
            <strong className="text-[#00F2FE] font-bold">{commentsCount}</strong> Comments
          </span>
          <span className="whitespace-nowrap">
            <strong className="text-[#94A3B8] font-bold">{sharesCount}</strong> Shares
          </span>
        </div>

        {/* Interactive Like Toggler Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // 🎯 تمنع الضغطة من فتح صفحة تفاصيل البوست

            // 1. تحديث الـ UI محلياً فوراً ليشعر المستخدم بالسرعة (Optimistic UI)


            // 2. إرسال الطلب الفوري للسيرفر باستخدام الـ ID الصحيح للبوست الحالي
            toggleLike(post._id);
          }}
          className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 focus:outline-none active:scale-90 ${liked ? 'text-[#FF0050] bg-[#FF0050]/10 shadow-[0_0_10px_rgba(255,0,80,0.2)]' : 'text-[#94A3B8] hover:bg-[#00F2FE]/10 hover:text-[#00F2FE]'
            }`}
        >
          <svg className="w-5 h-5" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Conditionally Rendered Top Comment Box */}
      {!manyComments && topComment && (
        <TopComment topComment={topComment} />
      )}

      {/* Conditionally Rendered Full Comments Array */}
      {manyComments && data?.data?.data?.comments?.map((comment) => (
        <AllComments key={comment._id} comment={comment} post={post} />
      ))}

      {/* Write Comment Field Section */}
      <CreateComment user={user} postId={post._id} queryKey={manyComments ? ['allPostComments'] : ['getPosts']} />


      {/* هيكل ومودال التعديل المنبثق (Edit Post Modal) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#1A0B2E] border border-[#00F2FE]/30 rounded-2xl p-5 shadow-2xl space-y-4 text-white" dir="ltr">

            {/* هيدر المودال */}
            <div className="flex justify-between items-center pb-2 border-b border-[#00F2FE]/10">
              <h3 className="text-lg font-bold text-white">Edit Post</h3>
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="text-[#94A3B8] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* فورم التعديل */}
            <form onSubmit={submitEditPost} className="space-y-4">
              <textarea
                ref={editBodyInput}
                defaultValue={body}
                disabled={isEditPending}
                rows="4"
                className="w-full bg-[#0F051D]/80 border border-[#00F2FE]/20 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00F2FE]/60 resize-none disabled:opacity-50"
                placeholder="Modify your text content..."
              />

              {/* معاينة الصورة المحدثة إن وجدت */}
              {editImgPreview && (
                <div className="relative w-full overflow-hidden rounded-xl border border-[#00F2FE]/20 bg-[#0F051D]/50 aspect-video">
                  <img src={editImgPreview} alt="Edit preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { setEditImgPreview(null); editImageInput.current.value = ''; }}
                    className="absolute top-2 right-2 p-1 bg-[#1A0B2E]/80 text-[#FF0050] border border-[#FF0050]/30 rounded-full hover:bg-[#FF0050] hover:text-white transition-all shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              )}

              {/* أزرار التحكم والرفع */}
              <div className="flex justify-between items-center pt-2 border-t border-[#00F2FE]/10">
                <label htmlFor={`edit-image-${post._id}`} className="px-4 py-2 bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/20 rounded-xl hover:bg-[#00F2FE]/20 transition-all text-xs font-bold cursor-pointer flex items-center gap-1.5 disabled:opacity-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Change Image
                  <input ref={editImageInput} onChange={handleEditImgChange} type="file" id={`edit-image-${post._id}`} className="hidden" disabled={isEditPending} />
                </label>

                <div className="flex gap-2">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-transparent text-[#94A3B8] hover:text-white text-xs font-bold transition-all">
                    Cancel
                  </button>
                  <button type="submit" disabled={isEditPending} className="px-5 py-2 bg-[#00F2FE] hover:bg-[#00F2FE]/80 text-[#1A0B2E] rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50">
                    {isEditPending ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
