import { Container, Typography, Button, Box, Rating } from '@mui/material'
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

const DevProfile = () => {
    const localUser = useSelector(({user}) => user)
    const user = useSelector(({users}) => users).find(u => u.id === localUser.id)
    const devRatings = useSelector(({ratings}) => ratings).filter(r => r.targetUser.id === localUser.id)

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
        return null
    }

  return (
    <Container sx={{ marginTop: '1rem'}}>
        <Typography sx={{ marginBottom: '2rem' }}>Kehittäjän {user.name} profiili</Typography>
        <Typography sx={{ marginBottom: '1rem' }}>Tietoja minusta:</Typography>
        <ModifyBasicInfo />
        <DevOrders />
        <ModifyDescriptionForm />
        <Button sx={{ marginTop: '1rem', marginBottom: '1rem' }} component={Link} to='/profiili/blogit/hallinnoi'>Hallinnoi profiilisissa näytettäviä blogeja</Button>
        <DevsOwnPosts />
        <Typography sx={{ marginBottom: '2rem', marginTop: '2rem' }}>Omat julkaisut</Typography>
        <UserFeedPosts />
        <Typography>Omat keskustelusi</Typography>
        <Button component={Link} to={'/omatkeskustelut'}>Näytä</Button>
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