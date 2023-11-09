import React from 'react'
import { Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper, } from '@mui/material'
import EuroIcon from '@mui/icons-material/Euro';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { formatDate } from '../../Functions/formatDate';

const SingleProjectInfo = ({post}) => {

  if (!post) {
    return null
  }

  return (
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
        transition: '0.3s ease',
        flexDirection: 'column',
        '@media (max-width: 820px)': {
          marginLeft: '0.1rem',
          marginRight: '0.1rem',
        },
      }}
    >
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
      justifyContent: 'space-between', padding: '0.3rem', borderRadius: '0.3rem',
      backgroundColor: 'white', boxShadow: '0rem 0.1rem 0.3rem gray' }}>
          <Box>
          {post.isOpen ? (
            <Typography>Avoinna oleva ilmoitus</Typography>
          ) : (
            <Typography>Ilmoitus suljettu</Typography>
          )}
          <Typography>{post.user.name}</Typography>
          {post.timeStamp ? (
            <Typography>Julkaistu {formatDate(post.timeStamp)}</Typography>
          ) : (
            <Typography>Ei tietoa</Typography>
          )}
          </Box>
          <Box>
          <Typography><EuroIcon />{post.minPrice} - {post.maxPrice}</Typography>
          <Typography><AccessTimeIcon />{formatDate(post.dueDate)}</Typography>
          </Box>
      </Box>

      {/* Displaying answers */}
      <Box sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Typography sx={{ borderBottom: '1px solid black', fontSize: '1.2rem'
       }}>Tarkoitus</Typography>
        <Typography style={{ 
          whiteSpace: 'break-spaces',
         }}>{post.description}</Typography>
        <Typography sx={{ borderBottom: '1px solid black', fontSize: '1.2rem',
        marginBottom: '0.5rem', marginTop: '1rem'}}
        >Tietoa</Typography>
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
              <TableCell>{post.question4}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {post.other.length > 0 && (
        <Box>
            <Typography sx={{ borderBottom: '1px solid black', fontSize: '1.2rem',
        marginBottom: '0.5rem', marginTop: '1rem'}}
        >Muuta</Typography>
            <Typography style={{ 
                whiteSpace: 'break-spaces',
               }}>{post.other}</Typography>
            </Box>
      )}
      </Box>
    </Box>
  )
}

export default SingleProjectInfo