import { Container, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useNotification } from '../../hooks'


const SingleFeedPostPage = () => {

  const dispatch = useDispatch()
  const notifyWith = useNotification()
  const navigate = useNavigate()

  const id = useParams().id

  const user = useSelector(({ user }) => user)
  const feedPost = useSelector(({ feedPosts }) => feedPosts.find(p => p.id === id))

  if (!feedPost) {
    return (
      <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography component={Link} to={`/kehittajat/${feedPost.user.id}`} sx={{ marginBottom: '1rem',
      textDecoration: 'underline', color: 'white' }}>{feedPost.user.name}</Typography>
        <Typography sx={{
          whiteSpace: 'break-spaces'
        }}>{feedPost.description}</Typography>
    </Container>
  )
}

export default SingleFeedPostPage