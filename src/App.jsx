import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Login from './Auth/Login/Login'
import Profile from './Components/Profile/Profile'
import Register from './Auth/Register/Register'
import Notfound from './Components/Notfound/Notfound'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import { CounterContextProvider } from './Context/CounterContext'
import { AuthContextProvider } from './Context/AuthContext'
import Hero from './Components/Hero/Hero'
import ProtectRoute from './Components/ProtectRoute/ProtectRoute'
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'
import PostDetails from './Components/PostDeatils/PostDetails'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import { Toaster } from 'react-hot-toast'
import EditProfile from './Components/EditProfile/EditProfile'
import { useNetworkState } from 'react-use'
import FollowSuggestions from './Components/FollowSuggestions/FollowSuggestions'
import UsersProfile from './Components/UsersProfile/UsersProfile'




let queryClint = new QueryClient()

function App() {
 let {online} = useNetworkState()
  let route = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
       {index: true , element: <Hero/>} ,
        { path: 'login', element: <Login /> },
        { path: 'change-password', element: <ChangePassword /> },
        { path: 'home', element: <ProtectRoute><Home /></ProtectRoute> },
        { path: 'profile', element: <ProtectRoute><Profile /></ProtectRoute> },
        { path: ':id/profile', element: <ProtectRoute><UsersProfile /></ProtectRoute> },
        { path: 'post-details/:id', element: <ProtectRoute><PostDetails /></ProtectRoute> },
        { path: 'edit-profile', element: <ProtectRoute><EditProfile/></ProtectRoute> },
        { path: 'follow-suggestions', element: <ProtectRoute><FollowSuggestions/></ProtectRoute> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <Notfound /> },

      ]
    }
  ])

  return (
    <>
    {!online && <div className='flex h-8 inset-0 bg-[#FF0050] items-center justify-center'>
      <h3 className='text-white'>Network Error</h3>
      </div>}
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
