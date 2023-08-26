import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import chatService from '../../services/chats'

const ChatsList = () => {
    const [ allUsersChats, setAllUsersChats ] = useState([])
    const user = useSelector(({ user }) => user)
    //const allUsersChats = useSelector(({ chats }) => chats).filter(c => c.user1.id === user.id || c.user2.id === user.id)

    useEffect(() => {
        const fetchData = async () => {
            if (user) { // Check if user is defined
                try {
                    const chatData = await chatService.getAll();
                    const userId = user.id;
                    const usersChats = chatData.filter(c => (
                        (c.user1 && c.user1.id === userId) || 
                        (c.user2 && c.user2.id === userId)
                    ));
                    
                    setAllUsersChats(usersChats);
                } catch (error) {
                    console.error("Error fetching chat data:", error);
                }
            }
        }
        
        fetchData();
    }, [user])

    if (!user || !allUsersChats) {

        return (
            <Typography>Loading error...</Typography>
        )
    }

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
        <Typography>Omat keskustelut</Typography>
        {allUsersChats.length > 0 ? (
            allUsersChats.map(chat => {
                const chatReceiver = chat.user1.id === user.id ? chat.user2.name : chat.user1.name
                const latestMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
                return (
                <Box key={chat.id} sx={{ padding: '1rem', margin: '1rem', backgroundColor: 'white', color: 'black',
                borderRadius: '0.5rem' }}>
                    <Typography sx={{ fontSize: '1.2rem' }}>{chat.title}</Typography>
                    <Typography sx={{ fontSize: '0.8rem' }}>{chatReceiver}</Typography>
                    {latestMessage ? (
                            <Typography>
                                {latestMessage.user === user.id
                                    ? `Lähetetty: ${latestMessage.content}`
                                    : `${chatReceiver}: ${latestMessage.content}`}
                            </Typography>
                        ) : (
                            <Typography>Tyhjä keskustelu</Typography>
                        )}
                    <Button component={Link} to={`/omatkeskustelut/${chat.id}`}
                    >Avaa keskustelu</Button>
                </Box>
                )
        })
        ): (
            <Typography>Ei yhtään keskustelua</Typography>
        )}
    </Container>
  )
}

export default ChatsList