import React from 'react'
import { Typography, Box } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <Box sx={{
        textAlign: 'center',
        padding: '1rem',
        lineHeight: '3rem',
      }}>

        <Typography variant="body1" className="copyright">
          Tekoälyautomaatio.fi.
        </Typography>

        <Typography variant="body1" className="address" sx={{
          fontSize: '16px',
          color: '#ffffff',
        }}>
          123 Main Street, City, State, Country
        </Typography>

        <Typography variant="body1" className="contact" sx={{
          fontSize: '16px',
          color: '#ffffff',
        }}>
          +1 123-456-7890
        </Typography>

        <Typography variant="body1" className="contact" sx={{
          fontSize: '16px',
          color: '#ffffff',
        }}>
          info@example.com
        </Typography>

        <Box sx={{
          marginTop: '1rem',
        }}>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramIcon sx={{
              marginRight: '10px',
              fontSize: '20px',
              color: 'white',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: 'rgb(87, 86, 86)',
              },
            }} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookIcon sx={{
              marginRight: '10px',
              fontSize: '20px',
              color: 'white',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: 'rgb(87, 86, 86)',
              },
            }} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon sx={{
              marginRight: '10px',
              fontSize: '20px',
              color: 'white',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: 'rgb(87, 86, 86)',
              },
            }} />
          </a>
        </Box>

        <Typography variant="body1" className="poweredBy" sx={{
          marginTop: '20px',
          fontSize: '14px',
          color: 'rgb(255, 255, 255)',
          fontStyle: 'italic',
        }}>
          Powered by Tekoälyautomaatio.fi
        </Typography>
      </Box>
    </footer>
  )
}

export default Footer