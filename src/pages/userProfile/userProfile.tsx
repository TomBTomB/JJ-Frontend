import React, { useCallback } from 'react'
import { MainFrame } from '../../components/mainFrame'
import { useParams } from 'react-router-dom'
import { usePostData, useUserData } from '../../data/dataContext'
import { Post } from '../../data/posts'
import { User } from '../../data/users'
import { useLoadElementById } from '../../components/hooks/useLoadElementById'
import { mapUndefined } from '../../utils/undefined'
import { Feed } from '../../components/feed'
import { LoadableElement } from '../../components/loadableElement'
import { Container } from '@mui/material'
import { ProfileHeader } from '../../components/profileHeader'

type UserProfileParams = {
  userId: string
}

type UserProfileValue = {
  posts: Post[]
  user: User
}

export const UserProfile = () => {
  const {userId} = useParams<UserProfileParams>()

  const postData = usePostData()
  const userData = useUserData()

  const getUserProfileValue = useCallback((id: string) => {
    return Promise.all([userData.getUserById(id), postData.getPostsByUser(id)])
      .then(([maybeUser, posts]) => mapUndefined(maybeUser, user => ({user, posts})))
  }, [postData])

  const {state} = useLoadElementById<UserProfileValue>(userId, getUserProfileValue)

  const renderUserProfile = useCallback(({user, posts}: UserProfileValue) => (
    <Container>
      <ProfileHeader user={user}/>
      <Feed posts={posts}/>
    </Container>
  ), [])

  return (
    <MainFrame title="User profile">
      <LoadableElement state={state} renderValue={renderUserProfile}/>
    </MainFrame>
  )
}