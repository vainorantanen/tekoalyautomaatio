import React from 'react'
import { Box, Typography } from '@mui/material'

const HomeInfoBox = () => {
  return (
    <Box sx={{
      display: 'flex',
      marginTop: '3rem',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      background: 'linear-gradient(to bottom, #001D57, black)',
      gap: '4.5rem',
      color: 'white',
      minHeight: '50vh',
      paddingTop: '2rem',
      paddingBottom: '6rem'
    }}>
      <Box>
        <Typography sx={{
          fontSize: '3rem'
        }}>Yli 60%</Typography>
        <Typography>Yrityksistä hyödyntää tekoälyä toiminnassaan jollain tavalla</Typography>
      </Box>
      <Box>
        <Typography sx={{
          fontSize: '3rem'
        }}>3 miljoonaa</Typography>
        <Typography>Työpaikkat jotka tekoäly tarjoaa 2025 mennessä</Typography>
      </Box>
      <Box>
        <Typography sx={{
          fontSize: '3rem'
        }}>€126 Miljardia</Typography>
        <Typography>Tekoälymarkkinan koko vuoteen 2025 mennessä</Typography>
      </Box>
    </Box>
  )
}

export default HomeInfoBox