import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const DevPortal = () => {

    const portalProjects = useSelector(({projectPosts}) => projectPosts).filter(p => p.isPortalPost)

    if (!portalProjects || portalProjects.length === 0) {
        return <Typography>Loading...</Typography>
    }

  return (
    <Box>
        <Typography>Avoimet portaaliprojektit</Typography>
        {portalProjects.map(proj => (
            <Box key={proj.id} sx={{ backgroundColor: 'white', color: 'black', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
                <Typography sx={{ fontSize: '1.3rem' }}>{proj.title}</Typography>
                <Typography>{proj.description}</Typography>
                <Button component={Link} to={`/portaali/ilmoitukset/${proj.id}`}>Siirry ilmoitukseen</Button>
            </Box>
        ))}
    </Box>
  )
}

export default DevPortal