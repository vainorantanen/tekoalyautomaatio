import React from 'react'
import { Typography, Box, } from '@mui/material'
import { Link } from 'react-router-dom'

const FeedUserCard = ({ user }) => {

  return (
    <Box
      component={Link}
      to={`/users/${user.id}`}
      sx={{
        backgroundColor: 'white',
        color: 'black',
        padding: '1rem',
        borderRadius: '0.5rem',
        //marginLeft: '5rem',
        //marginRight: '5rem',
        width: '20vw',
        display: 'flex',
        height: '10rem',
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
      <Typography>{user.name}</Typography>
      <Typography sx={{ color: '#555',
        overflow: 'hidden',
        whiteSpace: 'break-spaces',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 6, // Show only one line of description
        WebkitBoxOrient: 'vertical',
        lineHeight: '1.4', // Increase line height for better readability
       }}>{user.description}</Typography>
    </Box>
  )
}

export default FeedUserCard