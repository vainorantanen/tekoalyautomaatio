import { Container, Typography, Button, Paper, Grid, Box, Divider } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import BuyersPosts from './BuyersPosts'
import UserFeedPosts from './UserFeedPosts'
import ModifyBasicInfo from './ModifyBasicInfo'
import { Link } from 'react-router-dom'
import ModifyDescriptionForm from './ModifyDescriptionForm'
import LoginSuggestion from '../LoginSuggestion'

const BuyerProfile = () => {
  const user = useSelector(({user}) => user)
    if (!user) {
        return <LoginSuggestion />
    }

    const scrollToSection = (sectionId) => {
      const targetElement = document.getElementById(sectionId);
  
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth',
        });
      }
    };

  return (
        <Container sx={{ marginTop: '5rem', minHeight: '100vh', borderRadius: '1rem', marginBottom: '1rem' }}>
      <Paper elevation={3} style={{ padding: '16px', backgroundColor: '#1976D2', color: '#fff', marginBottom: '2rem' }}>
        <Typography variant="body1">
          Tervetuloa Profiiliin, {user.name}!
        </Typography>
      </Paper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ marginBottom: '1rem' }}>Profiili</Typography>
          <Typography variant="h6">Sähköposti: {user.email}</Typography>
          <ModifyBasicInfo />
        <ModifyDescriptionForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ marginBottom: '1rem' }}>Navigoi</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Button variant="outlined" onClick={() => scrollToSection('openPosts')}>
              Omat avoimet ilmoitukset
            </Button>
            <Button variant="outlined" component={Link} to='/portaali'>
              Omat portaali-ilmoitukset
            </Button>
            <Button variant="outlined" onClick={() => scrollToSection('closedPosts')}>
              Omat suljetut ilmoitukset
            </Button>
            <Button variant="outlined" component={Link} to='/omatkeskustelut'>
              Omat keskustelut
            </Button>
            <Button variant="outlined" component={Link} to='/profiili/blogit/hallinnoi'>
              Hallinnoi blogeja
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
      <BuyersPosts />
      <Divider sx={{ my: 4 }} />
      <UserFeedPosts />
    </Container>
  )
}

export default BuyerProfile