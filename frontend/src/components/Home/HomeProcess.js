import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import devicesPic from '../../Assets/devices.png'
import locationsPic from '../../Assets/locations.png'
import { Link } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import networkPic from '../../Assets/network.png'
import iconsWeb from '../../Assets/iconsweb.png'

const HomeProcess = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      gap: '6rem'
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'flex-start',
        gap: '1rem'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '40vw',
          borderRadius: '1rem',
          padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>1. <span style={{ color: '#70A0FF' }}>Määrittele</span>  tarpeesi</Typography>
          <Typography>Kerro millaista tekoälyprojektia olet etsimässä ja kuvaile sen tavoitteita. Määrittely antaa raamit tekoälyproektisi toeuttajalle sen lajudesta sekä mahdollistaa arvion työmäärästä ja hinnasta</Typography>
          <Button
            component={Link}
            to="/lisaailmoitus"
            sx={{ backgroundColor: 'blue', color: 'white',
              transition: 'transform 0.3s',
              marginTop: '1rem',
              borderRadius: '1rem',
              maxWidth: '10rem',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)' }
            }}>
            Jätä ilmoitus <ArrowForwardIcon />
          </Button>
        </Box>
        <Box>
          <img src={iconsWeb} alt='pic of mobile app' style={{ maxWidth: '40vw', height: 'auto' }}/>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'flex-start',
        gap: '1rem'
      }}>
        <Box>
          <img src={devicesPic} alt='pic of mobile app' style={{ maxWidth: '40vw', height: 'auto' }}/>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '40vw',
          borderRadius: '1rem',
          padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>2. <span style={{ color: '#70A0FF' }}>Lisää</span> ilmoitus</Typography>
          <Typography>Lisäämällä ilmoituksen tarpeidesi mukaan, tavoitat markkinoiden parhaat tekijät ja parhaat ideat. Voit lisätä ilmoituksen milloin vaan ja missä vaan!</Typography>
          <Button
            component={Link}
            to="/lisaailmoitus"
            sx={{ backgroundColor: 'blue', color: 'white',
              transition: 'transform 0.3s',
              marginTop: '1rem',
              borderRadius: '1rem',
              maxWidth: '10rem',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)' }
            }}>
            Jätä ilmoitus <ArrowForwardIcon />
          </Button>
        </Box>


      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'flex-start',
        gap: '1rem',
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '40vw',
          borderRadius: '1rem',
          padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>3. <span style={{ color: '#70A0FF' }}>Valitse</span> paras tekijä</Typography>
          <Typography>Voit valita tarjouksista itsellesi parhaiten sopivan tekijän, ja siten varmistat etttä saat juuri itsellesi parhaan mahdollisen projektin toeuttajan.</Typography>
          <Button
            component={Link}
            to="/lisaailmoitus"
            sx={{ backgroundColor: 'blue', color: 'white',
              transition: 'transform 0.3s',
              marginTop: '1rem',
              borderRadius: '1rem',
              maxWidth: '10rem',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)' }
            }}>
            Jätä ilmoitus <ArrowForwardIcon />
          </Button>
        </Box>
        <Box>
          <img src={networkPic} alt='pic of mobile app' style={{ maxWidth: '40vw', height: 'auto' }}/>
        </Box>

      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'flex-start',
        gap: '1rem',
      }}>
        <Box>
          <img src={locationsPic} alt='pic of mobile app' style={{ maxWidth: '40vw', height: 'auto' }}/>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '40vw',
          borderRadius: '1rem',
          padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Tavoita yhdellä tarjouspyynnöllä lukuisia tekijöitä</Typography>
          <Typography>Sinun tarpeisiisi paras projektin toteuttaja voi sijaita missä vaan! Ilmoituksen jättäminen siis kannattaa. Tekoälyautomaatio.fi:n avulla
            tavoitat yhdellä kerralla kaikki suurimmat tekoälyprojektien toteuttajat, sekä sadat keskisuuret ja pienet toimijat.</Typography>
          <Button
            component={Link}
            to="/lisaailmoitus"
            sx={{ backgroundColor: 'blue', color: 'white',
              transition: 'transform 0.3s',
              marginTop: '1rem',
              borderRadius: '1rem',
              maxWidth: '10rem',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)' }
            }}>
            Jätä ilmoitus <ArrowForwardIcon />
          </Button>
        </Box>

      </Box>
    </Box>
  )
}

export default HomeProcess