import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  currentChildPosts,
  getCurrentPost,
  getcurrentPostUser
} from '../../reducers/postSlice'
import { Paper } from '@mui/material'
function Post () {
  const dispatch = useDispatch()
  const { post, childPosts, postUser } = useSelector(state => state.post)

  const timeFormat = timeStamp => {
    const formatTime = new Date(timeStamp).toLocaleString('en-Fi', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    return formatTime
  }

  useEffect(() => {
    dispatch(getCurrentPost(5))
    dispatch(currentChildPosts(post.id))
    dispatch(getcurrentPostUser(post.userId))
  }, [dispatch])

  return (
    <div>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: '75%',
          flexGrow: 1,
          backgroundColor: theme =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
        }}
      >
        <h3>{post?.title}</h3>
        <p>{post?.content}</p>
        <p>{timeFormat(post.timeStamp)}</p>
        <p>{postUser?.username}</p>
      </Paper>
      {childPosts.childPosts === undefined ? (
        <p>dddd</p>
      ) : (
        childPosts.childPosts.map(child => (
          <Paper
            key={child.id}
            sx={{
              p: 2,
              margin: 'auto',
              maxWidth: '75%',
              flexGrow: 1,
              backgroundColor: theme =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
            }}
          >
            <p>{child.content}</p>
            <p>{timeFormat(child.timeStamp)}</p>
            <p>{child.username}</p>
          </Paper>
        ))
      )}
    </div>
  )
}
export default Post
