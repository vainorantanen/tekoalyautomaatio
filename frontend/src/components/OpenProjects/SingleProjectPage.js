import { Container, Typography } from '@mui/material'
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

  if (!projectPost) {
    return (
      <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography sx={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{projectPost.title}</Typography>
        <Typography sx={{ marginBottom: '1rem' }}>{projectPost.user.name}</Typography>
        <Typography sx={{
          whiteSpace: 'break-spaces'
        }}>{projectPost.description}</Typography>
    </Container>
  )
}

export default SingleProjectPage