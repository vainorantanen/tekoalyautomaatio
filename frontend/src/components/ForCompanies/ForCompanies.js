import { Box, Typography } from '@mui/material'
import React from 'react'
import SubsModel from './SubsModel'
import CompaniesHeader from './CompaniesHeader'

const ForCompanies = () => {
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
      >Yrityksille</Typography>
      <CompaniesHeader />
      <SubsModel />
    </Box>
  )
}

export default ForCompanies