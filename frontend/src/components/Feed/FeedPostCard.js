import React from 'react'
import { Typography, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import { formatDate } from '../../Functions/formatDate'

const FeedPostCard = ({ post }) => {

  return (
    <Container
    component={Link}
    to={`/feed/${post.id}`}
      sx={{
        backgroundColor: 'white',
        color: 'black',
        padding: '1rem',
        borderRadius: '0.5rem',
        marginBottom: '1rem',
        display: 'flex',
        height: '10rem',
        flexDirection: 'column',
        textDecoration: 'none',
        '@media (max-width: 1020px)': {
          marginLeft: '0.1rem',
          marginRight: '0.1rem',
        },
        transition: '0.2s ease',
        '&:hover': {
          transform: 'scale(1.01)',}
      }}
    >
  
      <Typography>{post.user.name}</Typography>
      <Typography>Julkaistu {formatDate(post.timeStamp)}</Typography>
      <Typography sx={{ color: '#555',
        overflow: 'hidden',
        whiteSpace: 'break-spaces',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 5,
        WebkitBoxOrient: 'vertical',
        marginTop: '2rem',
        lineHeight: '1.4', // Increase line height for better readability
       }}>{post.description}</Typography>
       <Typography>{post.likes.length} Tykkäystä</Typography>
    </Container>
  )
}

export default FeedPostCard