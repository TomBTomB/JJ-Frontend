import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/home/home'
import { PostPage } from '../pages/postPage/postPage'
import { UserProfile } from '../pages/userProfile/userProfile'

export const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/users/:userId" element={<UserProfile/>}/>
      <Route path="/posts/:postId" element={<PostPage/>}/>
    </Routes>
  )
}