import React from 'react'
import { Typography, Box, } from '@mui/material'
import { Link } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EuroIcon from '@mui/icons-material/Euro';

const FeedPostCard = ({ post }) => {

  return (
    <Box
      component={Link}
      to={`/kehittajienilmoitukset/${post.id}`}
      sx={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        marginLeft: '2rem',
        marginRight: '2rem',
        color: 'black',
        display: 'flex',
        textDecoration: 'none',
        flexDirection: 'column',
        '@media (max-width: 820px)': {
          marginLeft: '0.1rem',
          marginRight: '0.1rem',
        },
        transition: 'transform 0.2s', // Add transition property for smooth effect
        '&:hover': {
          transform: 'scale(1.01)', // Apply scaling effect on hover
        },
      }}
    >
        <Typography sx={{ fontSize: '1.5rem' }}>{post.title}</Typography>
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
       <Typography sx={{ marginTop: '1rem' }}><EuroIcon />{post.price}</Typography>
       {post.location && post.location.length > 0 && (
        <Typography><LocationOnIcon />{post.location}</Typography>
       )}
       {post.time && post.time.length > 0 && (
        <Typography><AccessTimeIcon />{post.time}</Typography>
       )}
    </Box>
  )
}

export default FeedPostCard