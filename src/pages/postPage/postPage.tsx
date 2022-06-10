import React, { useCallback } from 'react'
import { FullPost } from '../../data/posts'
import { usePostData } from '../../data/dataContext'
import { useParams } from 'react-router-dom'
import { PostDetail } from '../../components/postDetail'
import { MainFrame } from '../../components/mainFrame'
import { useUserContext } from '../../components/contexts/userContext'
import { useLoadElementById } from '../../components/hooks/useLoadElementById'
import { LoadableElement } from '../../components/loadableElement'

export type PostPageParams = {
  postId: string
}

export const PostPage = () => {
  const {postId} = useParams<PostPageParams>()
  const user = useUserContext()

  const postData = usePostData()
  const getFullPostById = useCallback(postData.getFullPostById.bind(postData), [postData])

  const {state, load} = useLoadElementById<FullPost>(postId, getFullPostById)

  const handlePostAnswer = useCallback((postText: string) => {
    if (state.status === 'loaded') {
      postData.answerPost(state.value.id, {user, text: postText})
        .then(() => load())
        .catch(error => console.error('Error while creating new post', error))
    }
  }, [state, postData])

  const renderPost = useCallback((post: FullPost) => (
    <PostDetail post={post} onPostAnswer={handlePostAnswer}/>
  ), [handlePostAnswer])

  return (
    <MainFrame title="Post">
      <LoadableElement state={state} renderValue={renderPost}/>
    </MainFrame>
  )
}
