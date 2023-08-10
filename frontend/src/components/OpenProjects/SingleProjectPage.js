import { Box, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useNotification } from '../../hooks'


const SingleProjectPage = () => {

  const dispatch = useDispatch()
  const notifyWith = useNotification()
  const navigate = useNavigate()

  const id = useParams().id

  const user = useSelector(({ user }) => user)
  const projectPost = useSelector(({ projectPosts }) => projectPosts.find(p => p.id === id))

  return (
    <Box sx={{ minHeight: '90vh', marginTop: '5rem' }}>
        <Typography>{projectPost.description}</Typography>
    </Box>
  )
}

export default SingleProjectPage