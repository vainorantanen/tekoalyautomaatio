import { Box } from '@mui/material'
import React from 'react'
import HomeHeader from './HomeHeader'
import FAQSection from './FaqSection'
import HomeProcess from './HomeProcess'
import HomeInfoBox from './HomeInfoBox'

const Home = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <HomeHeader />
      <HomeProcess />
      <HomeInfoBox />
      <FAQSection />
    </Box>
  )
}

export default Home