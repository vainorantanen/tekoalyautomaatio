import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BuyerPortal = () => {
    const user = useSelector(({user}) => user)
    const portalProjects = useSelector(({portalPosts}) => portalPosts).filter(p => p.user.id === user.id)

    if (!portalProjects) {
        return <Typography>Ei portaali-ilmoituksia</Typography>
    }

  return (
    <Box>
        <Typography>Omat portaali-ilmoitukseni</Typography>
        {portalProjects.length > 0 ? (portalProjects.map(proj => (
            <Box key={proj.id} sx={{ backgroundColor: 'white', color: 'black', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
                <Typography sx={{ fontSize: '1.3rem' }}>{proj.title}</Typography>
                <Typography>{proj.description}</Typography>
                <Button component={Link} to={`/portaali/ilmoitukset/${proj.id}`}>Siirry ilmoitukseen</Button>
            </Box>
        ))
    ): (
        <Typography>Ei vielä yhtään portaali-ilmoitusta</Typography>
    )}
    </Box>
  )
}

export default BuyerPortal