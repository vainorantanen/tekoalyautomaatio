import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ModifyDescriptionForm from './ModifyDescriptionForm'
import DevsOwnPosts from './DevsOwnPosts'

const DevProfile = () => {
    const user = useSelector(({ user }) => user)

    if (!user) {
        return null
    }

  return (
    <Container sx={{ marginTop: '1rem', display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ marginBottom: '2rem' }}>Kehittäjän {user.name} profiili</Typography>
        <Typography>Tietoja minusta:</Typography>
        <Box sx={{ border: '2px solid white', borderRadius: '0.5rem', padding: '0.5rem', marginTop: '1rem' }}>
            <Typography sx={{ whiteSpace: 'break-spaces' }}>{user.description}</Typography>
        </Box>
        <ModifyDescriptionForm />
        <DevsOwnPosts />
    </Container>
  )
}

export default DevProfile