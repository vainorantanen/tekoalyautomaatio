import { Container, Typography } from '@mui/material'
import React from 'react'
import {  useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const SingleDevPage = () => {

  const id = useParams().id

  const dev = useSelector(({ users }) => users.find(p => p.id === id))

  if (!dev) {
    return (
      <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography sx={{ marginBottom: '1rem' }}>{dev.name}</Typography>
        <Typography sx={{
          whiteSpace: 'break-spaces'
        }}>{dev.description}</Typography>
    </Container>
  )
}

export default SingleDevPage