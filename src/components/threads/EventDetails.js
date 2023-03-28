import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentChildPosts, getCurrentPost } from '../../reducers/postSlice'
import { Button, Paper, Typography, Avatar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { strings } from '../../utils/localization'
import { saveNavigate } from '../../reducers/currentPageSlice'
import { getCurrentEventById } from '../../reducers/eventsSlice'

const EventDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { post, childPosts } = useSelector(state => state.post)
  const { id } = useSelector(state => state.currentPage)
  const {currentEvent} = useSelector(state => state.eventList)

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
    dispatch(getCurrentEventById(2))
    dispatch(getCurrentPost(4))
    dispatch(currentChildPosts(4))
  }, [dispatch])

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {Object.keys(post).length === 0 ? (
        <Typography>{strings.postThread.wrongPostId}</Typography>
      ) : (
        <Paper
          sx={{
            p: 2,
            width: '75%',
            flexGrow: 1,
            backgroundColor: theme =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
          }}
        >
          <Avatar alt='User' src={post.picture} />
          <Typography variant='subtitle1' fontWeight={'bold'}>
            {post?.title}
          </Typography>
          <Typography variant='body'>{post?.content}</Typography>
          <Typography>{timeFormat(post.timeStamp)}</Typography>
          <Button onClick={() => {
            dispatch(saveNavigate({url: post.user, id: post.userId}))
            navigate(`/profile/${post.user.replace(/\s/g, "_")}`)
          }}>
            {post.user}
          </Button>
        </Paper>
      )}
      {childPosts.childPosts === undefined ? (
        <p>No comments</p>
      ) : (
        childPosts.childPosts.map(child => (
          <Paper
            key={child.id}
            sx={{
              p: 2,
              marginTop: '2%',
              width: '75%',
              flexGrow: 1,
              backgroundColor: theme =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
            }}
          >
            <Avatar alt='User' src={child.pictureUrl} />
            {child.targetUser !== null ? (
              <Typography variant='subtitle1' fontWeight={'bold'}>
                {strings.postThread.reply} {child.targetUser}
              </Typography>
            ) : (
              ''
            )}
            <p>{child.content}</p>
            <p>{timeFormat(child.timeStamp)}</p>

            <Button onClick={() => {
              dispatch(saveNavigate({url: child.username, id: null}))
              navigate(`/profile/${child.username.replace(/\s/g, "_")}`)
            }}>
              {child.username}
            </Button>
          </Paper>
        ))
      )}
    </div>
  )
}
export default EventDetails