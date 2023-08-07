import { Box, Typography } from '@mui/material'
import React from 'react'
import seoPic from '../../Assets/seo.png'

const AiHeader = () => {
  return (
    <Box>
        <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
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
          <Box sx={{ background: 'linear-gradient(to right, blue, black);', borderRadius: '0.5rem', padding: '1rem' }}>
          <Typography
            sx={{
              fontSize: '1.6rem',
              '@media (max-width: 442px)': {
                fontSize: '1.2rem',
              },
            }}
          >Tällä sivulla</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box>
                <Typography>Miksi hyödyntää tekoälyä liiketoiminnassa?</Typography>
                <Typography>Miten tekoälyä voi hyödyntää liiketoiminnassa?</Typography>
            </Box>
            
          </Box>
          </Box>
        </Box>
        <Box>
          <img src={seoPic} alt='pic of mobile app' style={{ maxWidth: '50vw', height: 'auto',
        }}/>
        </Box>
      </Box>
    </Box>
  )
}

export default AiHeader