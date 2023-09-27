import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EuroIcon from '@mui/icons-material/Euro';

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
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{devsPost.title}</Typography>
        {devsPost.postType !== 'normal' && (
          <Button>Osallistu</Button>
        )}
        </Box>
        <Typography component={Link} to={`/kehittajat/${devsPost.user.id}`} sx={{ marginBottom: '1rem',
      textDecoration: 'underline', color: 'white' }}>{devsPost.user.name}</Typography>
        <Typography sx={{
          whiteSpace: 'break-spaces',
          marginTop: '1rem'
        }}>{devsPost.description}</Typography>

<Typography sx={{ marginTop: '1rem' }}><EuroIcon />{devsPost.price}</Typography>
       {devsPost.location && devsPost.location.length > 0 && (
        <Typography><LocationOnIcon />{devsPost.location}</Typography>
       )}
       {devsPost.time && devsPost.time.length > 0 && (
        <Typography><AccessTimeIcon />{devsPost.time}</Typography>
       )}
    </Container>
  )
}

export default SingleDevPostPage