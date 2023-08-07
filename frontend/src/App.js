import React from 'react'

import { Box

} from '@mui/material'

import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material/styles'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import './App.css'

import Home from './components/Home/Home'
import Footer from './components/Footer'
import Navbar from './components/Navbar/Navbar'
import AddPost from './components/AddPost/AddPost'

import ScrollToTop from './components/ScrollToTop'
import ForCompanies from './components/ForCompanies/ForCompanies'
import OpenProjectsFeed from './components/OpenProjects/OpenProjectsFeed'
import AiInfo from './components/AiInfo/AiInfo'
import LoginForm from './components/LoginForm'

import { useNotification, useInitialization, useClearUser } from './hooks/index'

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat'
  },
  palette: {
    mode: "dark"
  }
})

const App = () => {

  const stateInitializer = useInitialization()
  const notifyWith = useNotification()

  const clearUser = useClearUser()

  const user = useSelector(({ user }) => user)

  useEffect(() => {
    stateInitializer()
  }, [])

  const logout = async () => {
    clearUser()
    notifyWith('logged out')
  }


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
          <Route path='/hyodyntaminen' element={<AiInfo />} />
          <Route path='/login' element={<LoginForm />} /> 
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App;
