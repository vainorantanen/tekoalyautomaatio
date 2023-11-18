import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { formatDate } from '../../../Functions/formatDate'

const MessageCard = ({customerinfo}) => {
  return (
    <Container sx={{
        padding: '1rem', backgroundColor: '#f0f0f0',
        borderRadius: '0.5rem', marginTop: '1rem',
        color: 'black'
    }}>
        <Typography><span
        style={{textDecoration: 'underline'}}
        >Sähköposti:</span> {customerinfo.senderEmail}</Typography>
        <Typography><span
        style={{textDecoration: 'underline'}}
        >Puhelin:</span> {customerinfo.senderPhone}</Typography>
        <Typography>{formatDate(customerinfo.timeStamp)}</Typography>
        {customerinfo.startingMessage && customerinfo.startingMessage.length > 0 && (
            <Box>
                <Typography sx={{ borderBottom: '1px solid black',
    marginTop: '1rem', marginBottom: '1rem' }}>Viesti</Typography>
        <Typography>{customerinfo.startingMessage}</Typography>
            </Box>
        )}
    </Container>
  )
}

export default MessageCard