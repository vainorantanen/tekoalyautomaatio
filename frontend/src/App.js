import React from 'react'

import { Box

} from '@mui/material'

import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material/styles'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'

import Home from './components/Home/Home'
import Footer from './components/Footer'
import Navbar from './components/Navbar/Navbar'

import ScrollToTop from './components/ScrollToTop'
import ForCompanies from './components/ForCompanies/ForCompanies'
import OpenProjectsFeed from './components/OpenProjects/OpenProjectsFeed'
import AiInfo from './components/AiInfo/AiInfo'
import LoginForm from './components/LoginForm'

import { useNotification, useInitialization, useClearUser } from './hooks/index'
import Notification from './components/Notification'
import RegisterPage from './components/RegisterPage'
import SingleProjectPage from './components/OpenProjects/SingleProjectPage'
import DevsPosts from './components/DevsPosts/DevsPosts'
import SingleDevPostPage from './components/DevsPosts/SingleDevPostPage'
import Profile from './components/Profile/Profile'
import DevsList from './components/Devs/DevsList'
import SingleDevPage from './components/Devs/SingleDevPage'
import ModifyBuyerPost from './components/Profile/ModifyBuyerPost'
import ModifyDevPost from './components/Profile/ModifyDevPost'
import Feed from './components/Feed/Feed'
import AddFeedPost from './components/AddPost/AddFeedPost'
import SingleFeedPostPage from './components/Feed/SingleFeedPostPage'
import ModifyFeedPost from './components/Profile/ModifyFeedPost'
import AllUsers from './components/AllUsers/AllUsers'
import SingleUserPage from './components/AllUsers/SingleUserPage'
import Portal from './components/Portal/Portal'
import SinglePostPortalView from './components/Portal/SinglePostPortalView'
import ChatsList from './components/Chat/ChatsList'
import SingleChatPage from './components/Chat/SingleChatPage'
import AddRatingForm from './components/RatingForm/AddRatingForm'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import ModifyShownBlogs from './components/Profile/ModifyShownBlogs'
import AddBlogForm from './components/Profile/AddBlogForm'
import ModifyBlogForm from './components/Profile/ModifyBlogForm'
import AdminPanel from './components/AdminPanel/AdminPanel'
import CustomerSupportForm from './components/CustomerSupportForm'
import SubForm from './components/ForCompanies/SubForm'
import AddProjectPostForm from './components/OpenProjects/AddProjectPostForm'

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

  useEffect(() => {
    stateInitializer()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = async () => {
    clearUser()
    notifyWith('Kirjauduttu ulos')
  }


  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Navbar logout={logout} />
        <Notification />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/lisaailmoitus' element={<AddProjectPostForm />} />
          <Route path='/yrityksille' element={<ForCompanies />} />
          <Route path='/avoimetprojektit' element={<OpenProjectsFeed />} />
          <Route path='/avoimetprojektit/:id' element={<SingleProjectPage />} />
          <Route path='/liiketoiminnassa' element={<AiInfo />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/kehittajienilmoitukset' element={<DevsPosts />} />
          <Route path='/kehittajienilmoitukset/:id' element={<SingleDevPostPage /> } />
          <Route path='/profiili' element={<Profile />} />
          <Route path='/profiili/kayttaja/muokkaa/ilmoitus/:id' element={<ModifyBuyerPost />} />
          <Route path='/profiili/kehittaja/muokkaa/ilmoitus/:id' element={<ModifyDevPost />} />
          <Route path='/profiili/muokkaa/julkaisu/:id' element={<ModifyFeedPost />} />
          <Route path='/profiili/blogit/hallinnoi' element={<ModifyShownBlogs />} />
          <Route path='/profiili/blogit/muokkaa/:id' element={<ModifyBlogForm />} />
          <Route path='/lisaa-blogi' element={<AddBlogForm />} />
          <Route path='/kehittajat' element={<DevsList />} />
          <Route path='/kehittajat/:id' element={<SingleDevPage />} />
          <Route path='/users' element={<AllUsers />} />
          <Route path='/users/:id' element={<SingleUserPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:id' element={<SingleFeedPostPage />} />
          <Route path='/lisaajulkaisu' element={<AddFeedPost />} /> 
          <Route path='/portaali' element={<Portal />} />
          <Route path='/portaali/ilmoitukset/:id' element={<SinglePostPortalView />} />
          <Route path='/omatkeskustelut' element={<ChatsList />} />
          <Route path='/omatkeskustelut/:id' element={<SingleChatPage />} />
          <Route path='/anna-arvostelu/:id' element={<AddRatingForm />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
          <Route path='/adminpanel' element={<AdminPanel />} />
          <Route path='/laheta-asiakaspalvelupyynto' element={<CustomerSupportForm />} />
          <Route path='/tilaa' element={<SubForm />} />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App;
