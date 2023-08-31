import { Box, Container, Typography, Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ModifyShownBlogs = () => {
    const user = useSelector(({user}) => user)
    const userBlogs = useSelector(({blogs}) => blogs).filter(b => b.user.id === user.id)

    if (!user) {
        return (
            <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
                <Typography>Kirjaudu sisään lisätäksesi blogi</Typography>
            </Container>
        )
    }

  return (
        <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
            <Typography sx={{ fontSize: '1.4rem', textAlign: 'center' }}>Omat blogini</Typography>
            <Button component={Link} to='/lisaa-blogi' >Lisää blogi</Button>
            {userBlogs && userBlogs.length > 0 ? (
                userBlogs.map(b => (
                    <Box key={b.id} sx={{ backgroundColor: 'white', color: 'black',
                    borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
                        <Typography sx={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{b.title}</Typography>
                        <Typography>{b.description}</Typography>
                    </Box>
                ))
            ): (
                <Box>
                    <Typography>Ei vielä blogeja</Typography>
                </Box>
            )}
        </Container>
  )
}

export default ModifyShownBlogs