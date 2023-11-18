import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EuroIcon from '@mui/icons-material/Euro';
import SendInfoToDevPost from '../SendInfoToDevPost';
import { formatDate } from '../../Functions/formatDate';

const SingledevsPostPage = () => {
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
    <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
            <Box
      sx={{
        padding: '1rem',
        backgroundColor: '#f0f0f0',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        color: 'black',
        marginLeft: '3rem',
        marginRight: '3rem',
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width: 820px)': {
          marginLeft: '0.1rem',
          marginRight: '0.1rem',
        },
      }}
    >
      <Typography sx={{ fontSize: '1.2rem', marginBottom: '0.5rem',
    borderBottom: '1px solid black' }}>{devsPost.title}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
      justifyContent: 'space-between', padding: '0.3rem', borderRadius: '0.3rem',
      backgroundColor: 'white', boxShadow: '0rem 0.1rem 0.3rem gray' }}>
          <Box>
          <Typography><Button component={Link} to={`/kehittajat/${devsPost.user.id}`}>{devsPost.user.name}</Button></Typography>
          {devsPost.timeStamp ? (
            <Typography>Julkaistu {formatDate(devsPost.timeStamp)}</Typography>
          ) : (
            <Typography>Julkaistu: Ei tietoa</Typography>
          )}
          </Box>
          <Box>
          <Typography><EuroIcon />{devsPost.price}</Typography>
          {devsPost.time && devsPost.location &&
          (
            <Box>
              <Typography><AccessTimeIcon />{devsPost.time}</Typography>
          <Typography><AccessTimeIcon />{devsPost.location}</Typography>
              </Box>
          )}
          </Box>
      </Box>

      {/* Displaying answers */}
      <Box sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Typography sx={{ borderBottom: '1px solid black', fontSize: '1.2rem'
       }}>Kuvaus</Typography>
        <Typography style={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'break-spaces',
          display: '-webkit-box',
          WebkitLineClamp: 5,
          WebkitBoxOrient: 'vertical',
          lineHeight: '1.4',
         }}>{devsPost.description}</Typography>
      </Box>
      <Box>
        <SendInfoToDevPost devPost={devsPost}/>
      </Box>
      </Box>
    </Container>
  )
}

export default SingledevsPostPage