import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import SinglePostDevView from './SinglePostDevView'
import SinglePostBuyerView from './SinglePostBuyerView'


const SinglePostPortalView = () => {
    const user = useSelector(({user}) => user)

    if (!user) {
      return (
        <Container sx={{ marginTop: '5rem', minHeight: '90vh' }}>
          <Typography>Kirjaudu sisään nähdäksesi portaali</Typography>
        </Container>
      )
    }

  return (
    <Box sx={{ marginTop: '5rem', minHeight: '90vh' }}>


        {user && user.isDeveloper ? (
          <SinglePostDevView />
        ) : (
          <SinglePostBuyerView />
        )}
    </Box>
  )
}

export default SinglePostPortalView