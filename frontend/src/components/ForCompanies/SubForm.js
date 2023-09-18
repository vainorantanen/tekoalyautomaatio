import { Container, Typography, Button, Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNotification } from '../../hooks'

const SubForm = () => {

  const user = useSelector(({user}) => user)

  const notifyWith = useNotification()
  const dispatch = useDispatch()

  const handleOrder = () => {
    const confirmed = window.confirm('Vahvistetaanko tilaus?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
      try {
        //dispatch(removeCustomerSupportPost(obj))
        notifyWith('Tilattu onnistuneesti, onneksi olkoon!', 'success')
      } catch (error) {
        notifyWith('Ilmeni jokin ongelma, ota yhteyttä asiakaspalveluun', 'error')
      }
    }

  if (!user || !user.isDeveloper) {
    return (
      <Container sx={{ marginTop: '5rem', minHeight: '80vh', textAlign: 'center' }}>
        <Typography>Luo kehittäjäprofiili ja kirjaudu sisään vahvistaaksesi tilaus</Typography>
        <Button
          component={Link}
          to='/login'
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: 'blue',
            color: 'white',
            transition: 'transform 0.3s',
            marginTop: '1rem',
            marginBottom: '1rem',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)',
            },
          }}
        >
         Rekisteröidy tai kirjaudu
        </Button>
    </Container>
    )
  }

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
      <Typography
        sx={{
          fontSize: '1.3rem',
          textAlign: 'center',
          marginTop: '6rem',
          '@media (max-width: 442px)': {
            fontSize: '1rem',
          },
        }}
      >
        Vahvista premium tilaus
      </Typography>
        <Container sx={{ padding: '1rem', marginTop: '1rem', marginBottom: '1rem',
      backgroundColor: '#222222', borderRadius: '0.5rem' }}>
          <Typography>Ostoskorisi</Typography>
          <Box sx={{ padding: '1rem', marginTop: '1rem', marginBottom: '1rem',
      backgroundColor: 'white', color: 'black', borderRadius: '0.5rem' }}>
            <Typography>Premium jäsenyys, 1kk (Tilaus jatkuu, kunnes se perutaan)</Typography>
            <Typography>Hinta yhteensä: 20€/kk</Typography>
          </Box>
          <Typography>Omat tietosi (tarkistathan, että ne ovat ajantasalla)</Typography>
          <Typography>Nimi: {user.name}</Typography>
          <Typography>Sähköposti: {user.email}</Typography>
          <Typography>Tämänhetkiset tilaukset: {user.subscriptionModel === 'none' ? 'Ei mitään' : user.subscriptionModel}</Typography>
          <Button onClick={handleOrder}>Vahvista tilaus</Button>
        </Container>
    </Container>
  )
}

export default SubForm