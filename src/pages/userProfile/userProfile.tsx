import React, { useCallback } from 'react'
import { MainFrame } from '../../components/mainFrame'
import { useParams } from 'react-router-dom'
import { usePostData, useUserData } from '../../data/dataContext'
import { Post } from '../../data/posts'
import { User } from '../../data/users'
import { useLoadElementById } from '../../components/hooks/useLoadElementById'
import { mapUndefined, nonUndefined } from '../../utils/undefined'
import { Feed } from '../../components/feed'
import { LoadableElement } from '../../components/loadableElement'
import { Container } from '@mui/material'
import { ProfileHeader } from '../../components/profileHeader'
import { useUserContext } from '../../components/contexts/userContext'
import { FollowActions } from '../../components/followActions'

type UserProfileParams = {
  userId: string
}

type UserProfileValue = {
  posts: Post[]
  user: User
  isFollowed: boolean
}

export const UserProfile = () => {
  const user = useUserContext()
  const {userId} = useParams<UserProfileParams>()

  const isSelf: boolean = user.id === userId

  const postData = usePostData()
  const userData = useUserData()

  const getUserProfileValue = useCallback((id: string) => {
    return Promise.all([userData.getUserById(id), userData.isFollowed(id), postData.getPostsByUser(id)])
      .then(([maybeUser, isFollowed, posts]) =>
        mapUndefined(maybeUser, user => ({user, posts, isFollowed: nonUndefined(isFollowed, false)})),
      )
  }, [postData])

  const {state, load} = useLoadElementById<UserProfileValue>(userId, getUserProfileValue)

  const handleFollowToggle = useCallback((userId: string) => {
    userData.toggleFollow(userId)
      .then(() => load())
  }, [userData, userId])

  const renderUserProfile = useCallback(({user, posts, isFollowed}: UserProfileValue) => (
    <Container>
      <ProfileHeader
        user={user}
        actions={isSelf ? undefined : (
          <FollowActions userId={user.id} isFollowed={isFollowed} onToggle={handleFollowToggle}/>
        )}
      />
      <Feed posts={posts}/>
    </Container>
  ), [isSelf, handleFollowToggle])

  return (
    <MainFrame title="User profile">
      <LoadableElement state={state} renderValue={renderUserProfile}/>
    </MainFrame>
  )
}