import React from 'react'
import { Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Divider, } from '@mui/material'
import { Link } from 'react-router-dom'
import EuroIcon from '@mui/icons-material/Euro';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { formatDate } from '../../Functions/formatDate';

const FeedPostCard = ({ post }) => {

  return (
    <Paper
    elevation={3}
    component={Link}
        to={`/avoimetprojektit/${post.id}`}
      sx={{
        padding: '1rem',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        color: 'black',
        backgroundColor: 'white',
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.1s linear',
        boxShadow: '0rem 0.1rem 0.2rem 0.1rem gray',
        '@media (max-width: 820px)': {
          marginLeft: '0.1rem',
          marginRight: '0.1rem',
        },
        '&:hover': {
          backgroundColor: '#ebebeb',
          boxShadow: '0rem 0.1rem 0.2rem 0.2rem gray',
      },
      }}
    >
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
      justifyContent: 'space-between', padding: '0.3rem', borderRadius: '0.3rem',
      backgroundColor: 'white', boxShadow: '0rem 0.1rem 0.3rem gray' }}>
          <Box>
          {post.isOpen ? (
            <Typography variant='h6'>Avoinna oleva ilmoitus</Typography>
          ) : (
            <Typography variant='h6'>Ilmoitus suljettu</Typography>
          )}
          <Typography>{post.user.name}</Typography>
          {post.timeStamp ? (
            <Typography>Julkaistu {formatDate(post.timeStamp)}</Typography>
          ) : (
            <Typography>Julkaistu: Ei tietoa</Typography>
          )}
          </Box>
          <Box>
          <Typography><EuroIcon />{post.minPrice} - {post.maxPrice}</Typography>
          <Typography><AccessTimeIcon />{formatDate(post.dueDate)}</Typography>
          </Box>
      </Box>

      {/* Displaying answers */}
      <Box sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Typography variant='h6'>Tarkoitus</Typography>
        <Divider sx={{ my: 1 }}/>
        <Typography style={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'break-spaces',
          display: '-webkit-box',
          WebkitLineClamp: 5,
          WebkitBoxOrient: 'vertical',
          lineHeight: '1.4',
         }}>{post.description}</Typography>
        <Typography variant='h6'>Tietoa</Typography>
        <Divider sx={{ my: 1 }}/>
        <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Sivut on suunnattu:</TableCell>
              <TableCell>{post.question1}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Teknologiset rajoitteet:</TableCell>
              <TableCell>{post.question2}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sisällönhallintatyökalut:</TableCell>
              <TableCell>{post.question3}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Toiminnallisuudet:</TableCell>
              <TableCell
              sx={{
                overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'break-spaces',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
              }}
              >{post.question4}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </Paper>
  )
}

export default FeedPostCard