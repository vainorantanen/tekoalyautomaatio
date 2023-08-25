import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ChatsList = () => {

    const user = useSelector(({ user }) => user)
    const allUsersChats = useSelector(({ chats }) => chats).filter(c => c.user1.id === user.id || c.user2.id === user.id)

    if (!user || !allUsersChats) {

        return (
            <Typography>Loading error...</Typography>
        )
    }

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
        <Typography>Omat keskustelut</Typography>
        {allUsersChats.length > 0 ? (
            allUsersChats.map(chat => (
                <Box key={chat.id} sx={{ padding: '1rem', margin: '1rem', backgroundColor: 'white', color: 'black',
                borderRadius: '0.5rem' }}>
                    <Typography>{chat.user1.name} ja {chat.user2.name}</Typography>
                    <Button component={Link} to={`/omatkeskustelut/${chat.id}`}>Avaa keskustelu</Button>
                </Box>
            ))
        ): (
            <Typography>Ei yhtään keskustelua</Typography>
        )}
    </Container>
  )
}

export default ChatsList