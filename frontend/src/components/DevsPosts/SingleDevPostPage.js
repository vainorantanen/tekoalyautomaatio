import { Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'


const SingleDevPostPage = () => {
  const id = useParams().id

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
        <Typography sx={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{devsPost.title}</Typography>
        <Typography component={Link} to={`/kehittajat/${devsPost.user.id}`} sx={{ marginBottom: '1rem',
      textDecoration: 'underline', color: 'white' }}>{devsPost.user.name}</Typography>
        <Typography sx={{
          whiteSpace: 'break-spaces'
        }}>{devsPost.description}</Typography>
    </Container>
  )
}

export default SingleDevPostPage