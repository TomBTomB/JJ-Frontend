import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FullPost } from '../../data/posts'
import { usePostData } from '../../data/dataContext'
import { Loading } from '../../components/loading'
import { NotFound } from '../../components/notFound'
import { useParams } from 'react-router-dom'
import { PostDetail } from '../../components/postDetail'
import { MainFrame } from '../../components/mainFrame'
import { useUserContext } from '../../components/contexts/userContext'

export type PostPageParams = {
  postId: string
}

type PostPageState =
  | {
  loadingState: 'loading'
}
  | {
  loadingState: 'post-not-found'
}
  | {
  loadingState: 'loaded'
  post: FullPost
}

export const PostPage = () => {
  const {postId} = useParams<PostPageParams>()
  const user = useUserContext()

  const postData = usePostData()

  const [state, setState] = useState<PostPageState>({loadingState: 'loading'})

  const loadPost = useCallback(() => {
    if (postId === undefined)
      setState({loadingState: 'post-not-found'})
    else
      postData.getFullPostById(postId).then(post => {
        if (post === undefined)
          setState({loadingState: 'post-not-found'})
        else
          setState({loadingState: 'loaded', post})
      })
  }, [state, postId])

  useEffect(() => loadPost(), [])

  const handlePostAnswer = useCallback((postText: string) => {
    if (state.loadingState === 'loaded') {
      postData.answerPost(state.post.id, {user, text: postText})
        .then(() => loadPost())
        .catch(error => console.error('Error while creating new post', error))
    }
  }, [state, postData])

  const content = useMemo(() => {
    switch (state.loadingState) {
      case 'loading':
        return <Loading/>
      case 'post-not-found':
        return <NotFound/>
      case 'loaded':
        const {post} = state
        return (
          <PostDetail post={post} onPostAnswer={handlePostAnswer}/>
        )
    }
  }, [state])

  return (
    <MainFrame title="Post">
      {content}
    </MainFrame>
  )
}
