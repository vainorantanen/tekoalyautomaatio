import React from 'react'
import { Typography, Box, } from '@mui/material'
import { Link } from 'react-router-dom'

const FeedPostCard = ({ post }) => {

  return (
    <Box
    component={Link}
    to={`/feed/${post.id}`}
      sx={{
        backgroundColor: 'white',
        color: 'black',
        padding: '1rem',
        borderRadius: '0.5rem',
        //marginLeft: '5rem',
        //marginRight: '5rem',
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
      <Typography>Julkaistu {post.timeStamp.split('T')[0]}</Typography>
      <Typography sx={{ color: '#555',
        overflow: 'hidden',
        whiteSpace: 'break-spaces',
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