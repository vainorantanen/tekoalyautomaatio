import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useNotification } from '../../hooks'
import { Box, TextField, Typography } from '@mui/material'

const CommentSection = () => {
    const id = useParams().id

  const user = useSelector(({ user }) => user)
  const feedPost = useSelector(({ feedPosts }) => feedPosts.find(p => p.id === id))

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
            <Box key={comment.id} sx={{ backgroundColor: 'white', color: 'black', borderRadius: '0.5rem', padding: '1rem' }}>
                <Typography>{comment.user.name}</Typography>
                <Typography>{comment.timeStamp.split('T')[0]}</Typography>
                <Typography>{comment.content}</Typography>
            </Box>
        ))}
    </Box>
  )
}

export default CommentSection