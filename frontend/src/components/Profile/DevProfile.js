import { Container, Typography, Button, Box, Rating, Grid, Paper, Divider } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ModifyDescriptionForm from './ModifyDescriptionForm'
import DevsOwnPosts from './DevsOwnPosts'
import UserFeedPosts from './UserFeedPosts'
import ModifyBasicInfo from './ModifyBasicInfo'
import { Link } from 'react-router-dom'
import { useNotification } from '../../hooks'
import { removeRating, updateRating } from '../../reducers/ratings'
import DevOrders from './DevOrders'
import LoginSuggestion from '../LoginSuggestion'

const DevProfile = () => {
    const user = useSelector(({user}) => user)

    const devRatings = useSelector(({ratings}) => ratings).filter(r => r.targetUser.id === user.id)

    const notify = useNotification()
    const dispatch = useDispatch()

  const handleRatingShowChange = (rating) => {
    const confirmed = window.confirm(`Asetetaanko arvostelu tilaan: ${rating.showOnDevProfile ? 'Älä näytä julkisessa profiilissa': 'Näytä julkisessa profiilissa'}`)
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    } 

    try {
      dispatch(updateRating({ ...rating, showOnDevProfile: !rating.showOnDevProfile }))
      notify('Tila muutettu onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma', 'error')
    }
  }

  const handleRatingDelete = (rating) => {
    const confirmed = window.confirm('Poistetaanko arvostelu?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    } 

    try {
      dispatch(removeRating(rating))
      notify('Poistettu onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma', 'error')
    }
  }

    if (!user) {
        return <LoginSuggestion />
    }

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
          <Typography>Sähköposti: {user.email}</Typography>
          <ModifyBasicInfo />
          <ModifyDescriptionForm />
        </Grid>
      <Grid item xs={12} md={6}>
      <Typography variant="h4" sx={{ marginBottom: '1rem' }}>Navigoi</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Button variant="outlined" component={Link} to='/lisaa-blogi'>
        Lisää blogi
      </Button>
      <Button variant="outlined" component={Link} to='/omatkeskustelut'>
        Omat keskustelut
      </Button>
      <Button variant="outlined" component={Link} to='/profiili/blogit/hallinnoi'>
        Hallinoi blogeja
      </Button>
      <Button variant="outlined" component={Link} to='/lisaajulkaisu'>
              Lisää julkaisu feediin
            </Button>
      <Typography variant="h4" sx={{ marginBottom: '1rem' }}>Seuraa tekemiesi tarjousten tilannetta</Typography>
      <Button variant="outlined" component={Link} to='/profiili/kehittaja/tarjouksesi'>
        Katso kaikki antamasi tarjoukset
      </Button>
      </Box>
      </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
      <DevOrders />
      <Divider sx={{ my: 4 }} />
      <DevsOwnPosts />
      <Divider sx={{ my: 4 }} />
      <Typography>Omat julkaisut</Typography>
      <UserFeedPosts />
        <Divider sx={{ my: 4 }} />
        <Typography>Saamasi arvostelut</Typography>
        <Box>
        {devRatings.length > 0 ? (
              devRatings.map(rating => (
                <Box key={rating.id} sx={{ margin: '1rem', borderRadius: '0.5rem', padding: '1rem', 
                backgroundColor: 'white', color: 'black' }}>
                  <Rating value={rating.score} readOnly precision={1} max={5} />
                  <Typography sx={{ fontSize: '0.8rem' }}>{rating.user.name}</Typography>
                  <Typography sx={{ fontSize: '0.8rem' }}>{rating.timeStamp.split('T')[0]}</Typography>
                  <Typography>{rating.description}</Typography>
                  <Typography sx={{ fontSize: '0.8rem', marginTop: '1rem' }}>Tämä arvostelu on tilassa: {rating.showOnDevProfile ? 'Näytetään julkisessa profiilissa':
                  'Ei näytetä julkisessa profiilissa'}</Typography>
                  <Button onClick={() => handleRatingShowChange(rating)}>{rating.showOnDevProfile ? 'Älä näytä julkisessa profiilissa': 'Näytä julkisessa profiilissa'}</Button>
                  <Button sx={{ color: 'red' }} onClick={() => handleRatingDelete(rating)}>Poista arvostelu</Button>
                  </Box>
              ))
            ): (
              <Typography>Ei vielä arvosteluja</Typography>
            )}
        </Box>
    </Container>
  )
}

export default DevProfile