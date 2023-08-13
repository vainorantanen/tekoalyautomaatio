import { Container, Typography } from '@mui/material'
import React from 'react'
import {  useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const BuyerUserPage = () => {
  const id = useParams().id

  const user = useSelector(({ users }) => users.find(p => p.id === id))

  if (!user) {
    return (
      <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography sx={{ marginBottom: '1rem' }}>{user.name}</Typography>
        <Typography sx={{
          whiteSpace: 'break-spaces'
        }}>{user.description}</Typography>
    </Container>
  )
}

export default BuyerUserPage