import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useNotification } from '../../hooks'
import { Box, Button, TextField, Typography } from '@mui/material'
import { removeCommentFromFeedPost } from '../../reducers/feedPosts'

const CommentSection = () => {
    const id = useParams().id

    const dispatch = useDispatch()
    const notify = useNotification()
  const user = useSelector(({ user }) => user)
  const users = useSelector(({ users }) => users)
  const feedPost = useSelector(({ feedPosts }) => feedPosts.find(p => p.id === id))


  const handleCommentDelete = async (commentId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tämän kommentin?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      dispatch(removeCommentFromFeedPost(feedPost.id, commentId))
      notify('Poisto onnistui', 'success')
    } catch (error) {
      notify('Poisto epäonnistui', 'error')
    }
  }

    if (!feedPost || feedPost.comments.length === 0) {
        return(
        <Box>
            <Typography>Ei kommentteja</Typography>
        </Box>
        )    
}

  return (
    <Box>
        {feedPost.comments.map(comment => (
            <Box key={comment.id} sx={{ backgroundColor: 'white', color: 'black', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
                <Typography>{comment.commentorName}</Typography>
                <Typography>{comment.timeStamp.split('T')[0]}</Typography>
                <Typography>{comment.content}</Typography>
                {user && (user.id === comment.user || user.id === feedPost.user.id) ? (
                  <Button onClick={() => handleCommentDelete(comment.id)} sx={{ color: 'red' }}>Poista kommentti</Button>
                ): null}
            </Box>
        ))}
    </Box>
  )
}

export default CommentSection