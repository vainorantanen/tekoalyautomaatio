import React from 'react'
import { Typography, Box, } from '@mui/material'
import { Link } from 'react-router-dom'

const FeedPostCard = ({ post }) => {

  return (
    <Box
      component={Link}
      to={`/avoimetprojektit/${post.id}`}
      sx={{
        backgroundColor: 'white',
        color: 'black',
        padding: '1rem',
        borderRadius: '0.5rem',
        //marginLeft: '5rem',
        //marginRight: '5rem',
        width: '20vw',
        height: '10rem',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        '@media (max-width: 1020px)': {
          marginLeft: '0.1rem',
          marginRight: '0.1rem',
          width: '70vw'
        },
        transition: 'transform 0.2s', // Add transition property for smooth effect
        '&:hover': {
          transform: 'scale(1.03)', // Apply scaling effect on hover
        },
      }}
    >
      <Typography sx={{ fontSize: '1.3rem' }}>{post.title}</Typography>
      <Typography>{post.user.name}</Typography>
      <Typography>Julkaistu {post.timeStamp.split('T')[0]}</Typography>
      <Typography sx={{ color: '#555',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3, // Show only one line of description
        WebkitBoxOrient: 'vertical',
        lineHeight: '1.4', // Increase line height for better readability
       }}>{post.description}</Typography>
    </Box>
  )
}

export default FeedPostCard