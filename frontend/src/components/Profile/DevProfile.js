import { Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import ModifyDescriptionForm from './ModifyDescriptionForm'
import DevsOwnPosts from './DevsOwnPosts'

const DevProfile = () => {
    const localUser = useSelector(({user}) => user)
    const user = useSelector(({users}) => users).find(u => u.id === localUser.id)

    if (!user) {
        return null
    }

  return (
    <Container sx={{ marginTop: '1rem', display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ marginBottom: '2rem' }}>Kehittäjän {user.name} profiili</Typography>
        <Typography sx={{ marginBottom: '1rem' }}>Tietoja minusta:</Typography>
        <ModifyDescriptionForm />
        <DevsOwnPosts />
    </Container>
  )
}

export default DevProfile