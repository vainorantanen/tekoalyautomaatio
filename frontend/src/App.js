import React from 'react'

import { Box

} from '@mui/material'

import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material/styles'
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Home from './components/Home/Home'
import Footer from './components/Footer'
import Navbar from './components/Navbar/Navbar'
import AddPost from './components/AddPost/AddPost'

import ScrollToTop from './components/ScrollToTop'
import ForCompanies from './components/ForCompanies/ForCompanies'
import OpenProjectsFeed from './components/OpenProjects/OpenProjectsFeed'

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat'
  },
  palette: {
    mode: "dark"
  }
})

const App = () => {


  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/lisaailmoitus' element={<AddPost />} />
          <Route path='/yrityksille' element={<ForCompanies />} />
          <Route path='/avoimetprojektit' element={<OpenProjectsFeed />} />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App;
