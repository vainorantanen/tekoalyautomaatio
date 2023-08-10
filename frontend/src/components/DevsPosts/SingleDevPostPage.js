import { Container, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useNotification } from '../../hooks'


const SingleDevPostPage = () => {

  const dispatch = useDispatch()
  const notifyWith = useNotification()
  const navigate = useNavigate()

  const id = useParams().id

  const user = useSelector(({ user }) => user)
  const devsPost = useSelector(({ devsPosts }) => devsPosts.find(p => p.id === id))

  if (!devsPost) {
    return (
      <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography>{devsPost.description}</Typography>
    </Container>
  )
}

export default SingleDevPostPage