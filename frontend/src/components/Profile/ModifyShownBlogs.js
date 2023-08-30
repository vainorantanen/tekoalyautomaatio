import { Box, Container, Typography, Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const ModifyShownBlogs = () => {
    const user = useSelector(({user}) => user)

    if (!user) {
        return null
    }

  return (
        <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
            <Typography sx={{ fontSize: '1.4rem', textAlign: 'center' }}>Omat blogini</Typography>
            {user.blogs && user.blogs.length > 0 ? (
                user.blogs.map(b => (
                    <Box key={b}>
                        <Typography>{b}</Typography>
                    </Box>
                ))
            ): (
                <Box>
                    <Typography>Ei vielä blogeja</Typography>
                    <Button>Lisää blogi</Button>
                </Box>
            )}
        </Container>
  )
}

export default ModifyShownBlogs