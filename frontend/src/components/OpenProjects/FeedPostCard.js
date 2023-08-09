import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const FeedPostCard = ({ post }) => {

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        color: 'black',
        padding: '2rem',
        borderRadius: '0.5rem',
        marginLeft: '5rem',
        marginRight: '5rem',
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width: 820px)': {
          marginLeft: '0.1rem',
          marginRight: '0.1rem',
        },
      }}
    >
      <Typography style={{ whiteSpace: 'break-spaces' }}>{post.description}</Typography>
      <Button
        component={Link}
        to={`/avoimetprojektit/${post.id}`}
        variant="contained"
        sx={{
          backgroundColor: 'blue',
          color: 'white',
          transition: 'transform 0.3s',
          marginTop: '1rem',
          maxWidth: '9rem',
          marginBottom: '1rem',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)',
          },
        }}
      >
        Tarkastele
      </Button>
    </Box>
  )
}

export default FeedPostCard