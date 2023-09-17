import { Box, Typography } from '@mui/material'
import React from 'react'
import FeedItems from './FeedItems'
import remoteworkPic from '../../Assets/remote-work.png'

const DevsPosts = () => {
  return (
    <Box sx={{ marginTop: '6rem', minHeight: '90vh' }}>
        <Typography sx={{
          fontSize: '1.8rem',
          textAlign: 'center',
          marginBottom: '2rem',
          '@media (max-width: 442px)': {
            fontSize: '1.3rem',
          },
        }}>
            Kehittäjien ilmoitukset
        </Typography>
        <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: '1rem'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          textAlign: 'left',
          width: '40vw',
          '@media (max-width: 600px)': {
            width: '80vw',
          },
        }}>
          <Box sx={{ background: 'linear-gradient(to right, blue, black);', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
            <Typography>Selaa kehittäjien ilmoituksia: Työvoima, projektit, osaajat, koulutukset, tapahtumat ja kurssit yhdessä paikassa!</Typography>
          </Box>
        </Box>
        <Box>
          <img src={remoteworkPic} alt='pic of mobile app' style={{ maxWidth: '15rem', height: 'auto',
        }}/>
        </Box>
      </Box>
        <FeedItems />
    </Box>
  )
}

export default DevsPosts