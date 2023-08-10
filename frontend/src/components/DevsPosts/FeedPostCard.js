import React from 'react'
import { Typography, Box, } from '@mui/material'
import { Link } from 'react-router-dom'

const FeedPostCard = ({ post }) => {

  return (
    <Box
      component={Link}
      to={`/kehittajienilmoitukset/${post.id}`}
      sx={{
        backgroundColor: 'white',
        color: 'black',
        padding: '2rem',
        borderRadius: '0.5rem',
        marginLeft: '5rem',
        marginRight: '5rem',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        '@media (max-width: 820px)': {
          marginLeft: '0.1rem',
          marginRight: '0.1rem',
        },
        transition: 'transform 0.2s', // Add transition property for smooth effect
        '&:hover': {
          transform: 'scale(1.03)', // Apply scaling effect on hover
        },
      }}
    >
      <Typography>{post.user.name}</Typography>
      <Typography sx={{ color: 'GrayText' }}>Julkaistu {post.timeStamp}</Typography>
      <Typography style={{ whiteSpace: 'break-spaces' }}>{post.description}</Typography>
    </Box>
  )
}

export default FeedPostCard