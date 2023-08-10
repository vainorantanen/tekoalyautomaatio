import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const AddPostInfo = () => {
  return (
    <Box sx={{ minHeight: '80vh', marginTop: '6rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>Tietoa postauksen lisäyksestä</Typography>
        <Container sx={{ margin: '1rem', padding: '1rem', backgroundColor: '#222222', textAlign: 'center', borderRadius: '0.5rem' }}>
          <Typography>Etsitkö projektillesi tekijää?</Typography>
          <Button component={Link} to='/lisaailmoitus/etsitekijaa'>Lisää tekoälyprojektipyyntö</Button>
          <Typography>Oletko kehittäjä?</Typography>
          <Button component={Link} to='/lisaailmoitus/kehittajanilmoitus'>Lisää tekoälyprojekti kehittäjänä</Button>
        </Container>
    </Box>
  )
}

export default AddPostInfo