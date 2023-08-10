import { Box, Typography } from '@mui/material'
import React from 'react'

const DevsPosts = () => {
  return (
    <Box sx={{ marginTop: '5rem', minHeight: '80vh' }}>
        <Typography sx={{
          fontSize: '2.5rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.5rem',
            marginBottom: '2rem'
          },
        }}>
            Kehittäjien ilmoitukset
        </Typography>
    </Box>
  )
}

export default DevsPosts