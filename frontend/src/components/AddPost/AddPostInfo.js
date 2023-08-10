import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const AddPostInfo = () => {
  return (
    <Box sx={{ minHeight: '80vh', marginTop: '6rem' }}>
        <Typography>Tietoa postauksen lisäyksestä</Typography>
        <Typography>Etsitkö projektillesi tekijää?</Typography>
        <Button component={Link} to='/lisaailmoitus/etsitekijaa'>Lisää tekoälyprojektipyyntö</Button>
        <Typography>Oletko kehittäjä?</Typography>
        <Button component={Link} to='/lisaailmoitus/kehittajanilmoitus'>Lisää tekoälyprojekti kehittäjänä</Button>
    </Box>
  )
}

export default AddPostInfo