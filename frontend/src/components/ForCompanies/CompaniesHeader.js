import React from 'react'
import { Box, Typography } from '@mui/material'
import remoteworkPic from '../../Assets/remote-work.png'

const CompaniesHeader = () => {
  return (
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
            <Typography>Oletko tekoälyprojekteja toteuttava kehittäjä, yritys tai freelancer?</Typography><br>
            </br>
            <Typography>Tekoalyautomaatio.fi kokoaa palvelujasi etsivät asiakkaasi yhteen paikkaan!</Typography>
          </Box>
        </Box>
        <Box>
          <img src={remoteworkPic} alt='pic of mobile app' style={{ maxWidth: '15rem', height: 'auto',
        }}/>
        </Box>
      </Box>
  )
}

export default CompaniesHeader