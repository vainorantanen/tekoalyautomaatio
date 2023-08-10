import { Container } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import DevProfile from './DevProfile'
import BuyerProfile from './BuyerProfile'


const Profile = () => {
    const user = useSelector(({ user }) => user)

    if (!user) {
        return null
    }

  return (
    <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        {user.isDeveloper === true ? (
            <DevProfile />
        ): (
            <BuyerProfile />
        )}
    </Container>
  )
}

export default Profile