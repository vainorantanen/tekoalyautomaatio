import { Box, Typography } from '@mui/material'
import React from 'react'
import EmailInput from '../EmailInput'

const AddPost = () => {
  return (
    <Box sx={{ minHeight: '80vh', marginTop: '6rem' }}>
        <Typography
        sx={{
          fontSize: '2.5rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.5rem',
            marginBottom: '2rem'
          },
        }}
      >Tekoälyautomaatio.fi</Typography>

<Typography
        sx={{
            marginTop: '6rem',
          fontSize: '1.6rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.2rem',
            marginBottom: '2rem'
          },
        }}
      >Ominaisuus julkaistaan kohta</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '4rem' }}>
            <EmailInput />
        </Box>

    </Box>
  )
}

export default AddPost