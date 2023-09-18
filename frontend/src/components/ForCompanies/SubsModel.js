import { Box, Container, Typography, Button } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'

const SubsModel = () => {
  return (
    <Container>
        <Typography sx={{ borderBottom: '1px solid white', textAlign: 'center', fontSize: '1.5rem',
    marginBottom: '1rem' }}>
            Palvelumme versiot
        </Typography>
        <Box sx={{  
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem'
        }}>
            <Box sx={{ padding: '0.5rem', backgroundColor: 'white', color: 'black',
        borderRadius: '0.5rem', height: '22rem', width: '20rem' }}>
                <Typography sx={{ fontSize: '1.3rem', textAlign: 'center', marginBottom: '1rem' }}>Ilmainen versio</Typography>
                <Typography><CheckIcon />Avoimien tarjousten katselu</Typography>
          <Typography><CheckIcon />Avoimiin projekteihin tarjoaminen</Typography>
          <Typography><CheckIcon />Omien myynti-ilmoitusten lisääminen</Typography>
          <Typography><CheckIcon />Feedin käyttö</Typography>
          <Typography><CheckIcon />Omien koulutusten ja tapahtumien ilmoittaminen</Typography>
          <Typography><CloseIcon />Portaalin käyttö (personoidut asiakkaat)</Typography>
          <Typography><CloseIcon />Analytiikka</Typography>
            </Box>
            <Box sx={{ padding: '0.5rem', backgroundColor: 'white', color: 'black',
        borderRadius: '0.5rem',height: '22rem', width: '20rem' }}>
            <Typography sx={{ fontSize: '1.3rem', textAlign: 'center', marginBottom: '1rem' }}>Premium</Typography>
            <Typography sx={{ fontSize: '1.3rem', textAlign: 'center', marginBottom: '1rem' }}>20€/kk</Typography>
            <Typography><CheckIcon />Portaalin käyttö (personoidut asiakkaat)</Typography>
            <Typography><CheckIcon />Enemmän asiakkaita</Typography>
            <Typography><CheckIcon />Analytiikka</Typography>
            <Typography><CheckIcon />Kuukauden ilmainen kokeilu</Typography>
            <Button
                component={Link}
                to='/tilaa'
                variant="contained"
                color="primary"
                sx={{
                    backgroundColor: 'blue',
                    color: 'white',
                    transition: 'transform 0.3s',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    '&:hover': {
                    transform: 'scale(1.03)',
                    backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)',
                    },
                }}
                >
                Liity Premium-jäseneksi!
                </Button>
            </Box>

        </Box>
    </Container>
  )
}

export default SubsModel