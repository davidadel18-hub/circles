import { useState, lazy, Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CounterContextProvider } from './Context/CounterContext'
import { AuthContextProvider } from './Context/AuthContext'
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { useNetworkState } from 'react-use'

// المكونات الأساسية المشتركة 
import Layout from './Components/Layout/Layout'
import Hero from './Components/Hero/Hero'
import ProtectRoute from './Components/ProtectRoute/ProtectRoute'

// تحميل الصفحات بشكل ديناميكي (Lazy Loading) 
const Login = lazy(() => import('./Auth/Login/Login'))
const Register = lazy(() => import('./Auth/Register/Register'))
const Profile = lazy(() => import('./Components/Profile/Profile'))
const UsersProfile = lazy(() => import('./Components/UsersProfile/UsersProfile'))
const Home = lazy(() => import('./Components/Home/Home'))
const PostDetails = lazy(() => import('./Components/PostDeatils/PostDetails'))
const EditProfile = lazy(() => import('./Components/EditProfile/EditProfile'))
const ChangePassword = lazy(() => import('./Components/ChangePassword/ChangePassword'))
const FollowSuggestions = lazy(() => import('./Components/FollowSuggestions/FollowSuggestions'))
const Notfound = lazy(() => import('./Components/Notfound/Notfound'))

let queryClint = new QueryClient()

function App() {
  let {online} = useNetworkState()
  
  let route = createBrowserRouter([
    {
      path: '', 
      element: <Layout />, 
      children: [
        { index: true , element: <Hero/> } ,
        { path: 'login', element: <Suspense fallback={null}><Login /></Suspense> },
        { path: 'register', element: <Suspense fallback={null}><Register /></Suspense> },
        { path: 'change-password', element: <Suspense fallback={null}><ChangePassword /></Suspense> },
        { path: 'home', element: <ProtectRoute><Suspense fallback={null}><Home /></Suspense></ProtectRoute> },
        { path: 'profile', element: <ProtectRoute><Suspense fallback={null}><Profile /></Suspense></ProtectRoute> },
        { path: ':id/profile', element: <ProtectRoute><Suspense fallback={null}><UsersProfile /></Suspense></ProtectRoute> },
        { path: 'post-details/:id', element: <ProtectRoute><Suspense fallback={null}><PostDetails /></Suspense></ProtectRoute> },
        { path: 'edit-profile', element: <ProtectRoute><Suspense fallback={null}><EditProfile/></Suspense></ProtectRoute> },
        { path: 'follow-suggestions', element: <ProtectRoute><Suspense fallback={null}><FollowSuggestions/></Suspense></ProtectRoute> },
        { path: '*', element: <Suspense fallback={null}><Notfound /></Suspense> },
      ]
    }
  ])

  return (
    <>
      {!online && (
        <div className='flex h-8 inset-0 bg-[#FF0050] items-center justify-center'>
          <h3 className='text-white'>Network Error</h3>
        </div>
      )}
      <Toaster/>
      <QueryClientProvider client={queryClint}>
        <AuthContextProvider>
          <CounterContextProvider>
            <RouterProvider router={route} />
          </CounterContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
