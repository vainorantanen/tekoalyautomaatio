import React from 'react'
import EuroIcon from '@mui/icons-material/Euro';
import BusinessIcon from '@mui/icons-material/Business';
import StartIcon from '@mui/icons-material/Start';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { formatDate } from '../../Functions/formatDate'
import { Typography, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const ProjectOfferCard = ({offer}) => {

      if (!offer) {
        return null
      }

  return (
    <Box key={offer.id}
          sx={{
            padding: '1rem',
            backgroundColor: '#f0f0f0',
            borderRadius: '0.5rem',
            marginLeft: '3rem',
            marginRight: '3rem',
            color: 'black',
            border: offer.isApproved ? '5px solid #C1FFA6' : 'none',
            display: 'flex',
            marginTop: '1rem',
            transition: '0.3s ease',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: '1rem',
            '@media (max-width: 820px)': {
              marginLeft: '0.1rem',
              marginRight: '0.1rem',
            },
            '@media (max-width: 650px)': {
                justifyContent: 'center',
                flexDirection: 'column'
              },
          }}
          >
            <Box sx={{ backgroundColor: 'white', padding: '0.5rem', borderRadius: '0.5rem',
        width: '30%', 
        '@media (max-width: 650px)': {
            width: '90%'
          },
        }}>
            {new Date(offer.dueDate) < new Date() && (
              <Typography variant='h6' sx={{ textAlign: 'center' }}>Tarjous sulkeutui {formatDate(offer.dueDate)}</Typography>
            )}
            {offer.isApproved && (
              <Typography sx={{ fontSize: '1.2rem' }}>Tarjous hyväksytty <CheckCircleIcon/></Typography>
            )}
            <Typography><EuroIcon />Hinta-arvio: {offer.minPrice} - {offer.maxPrice} euroa</Typography>
            <Typography><BusinessIcon />Tarjoaja: <Button component={Link} to={`/kehittajat/${offer.user}`}>{offer.offeror}</Button></Typography>
            <Typography><StartIcon />Tarjous jätetty: {formatDate(offer.timeStamp) || 'Ei tietoa'}</Typography>
            <Typography><AccessTimeIcon />Tarjous voimassa: {formatDate(offer.dueDate) || 'Ei tietoa'}</Typography>
            </Box>
            <Box sx={{ width: '65%',
            '@media (max-width: 650px)': {
                width: '90%'
              },
        }}>
                <Typography sx={{ fontSize: '1.1rem', marginBottom: '0.5rem',
            borderBottom: '1px solid black' }}>Tarjouksen kuvaus:</Typography>
                <Typography sx={{ whiteSpace: 'break-spaces' }}>{offer.description}</Typography>
            </Box>
          </Box>
  )
}

export default ProjectOfferCard