import { Box, Button, Container, Grid, TextField, Typography, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNotification } from '../../hooks';
import { updateChatState } from '../../reducers/chats';
import { socket } from '../../socket';
import chatService from '../../services/chats'
import SendIcon from '@mui/icons-material/Send';
import { useMediaQuery } from '@mui/material';

const SingleChatPage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const chatId = useParams().id;
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const chat = useSelector(({ chats }) => chats).find(c => c.id === chatId);

    useEffect(() => {
        const fetchData = async () => {
            socket.emit('join_room', chatId);
            
            try {
                const chatData = await chatService.getAll();
                
                const chatFromDb = chatData.find(c => c.id === chatId);
                if (chatFromDb) {
                    setMessages(chatFromDb.messages);
                }
            } catch (error) {
                console.error("Error fetching chat data:", error);
            }
        };
        
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessages(data.chatReturned.messages)
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [socket]);

    const notify = useNotification();
    const dispatch = useDispatch();


    const user = useSelector(({ user }) => user);

    const handleSendMessage = async () => {
        try {
            const chatReturned = await chatService.addmessage(chatId, { content: message })
            dispatch(updateChatState(chatReturned))
            setMessages(chatReturned.messages)
            socket.emit("send_message", { chatReturned, chatId });
            setMessage('');
        } catch (error) {
            notify('Viestin lähetys epäonnistui', 'error');
        }
    };

    if (!user || !chat) {
        return (
            <Container sx={{ minHeight: '100vh', marginTop: '5rem' }}>
                <Typography>Kirjaudu sisään ja lisää chat nähdäksesi</Typography>
            </Container>
        )
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '70vh', 
        marginTop: '5rem' }}>
            <Typography sx={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.2rem' }}>{chat.title}</Typography>
            <Box>
                {messages.length > 0 ? (
                    messages.map(mes => {
                        return (
                            <Box key={mes.id} sx={{ display: 'flex', justifyContent: user.id === mes.user ? 'flex-end' : 'flex-start', marginBottom: '1rem' }}>
                                <Box sx={{ padding: '0.5rem', backgroundColor: user.id === mes.user ? '#B0D0FF' : 'white', color: 'black', maxWidth: '70vw',
                                marginLeft: user.id === mes.user ? '0.5rem' : '0rem', marginRight: user.id === mes.user ? '0rem' : '0.5rem',
                                borderRadius: user.id === mes.user ? '0.5rem 0.5rem 0.1rem 1rem' : '0.5rem 0.5rem 1rem 0.1rem'
                                }}>
                                    <Typography sx={{ whiteSpace: 'break-spaces' }}>{mes.content}</Typography>
                                    <Typography sx={{ fontSize: '0.7rem', textAlign: user.id === mes.user ? 'right' : 'left' }}>{mes.user === user.id ? user.name : (user.id === chat.user1.id ? chat.user2.name : chat.user1.name)}</Typography>
                                </Box>
                            </Box>
                        )
})
                ) : (
                    <Typography>Ei viestejä</Typography>
                )}
            </Box>
            <Box sx={{ padding: '1rem', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                <Grid container spacing={2} alignItems="flex-end">
                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            type="text"
                            multiline
                            minRows={1}
                            maxRows={5} 
                            value={message}
                            placeholder="Kirjoita viesti"
                            required
                            onChange={({ target }) => setMessage(target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        {!isSmallScreen ? (
                            <Button
                            onClick={handleSendMessage}
                            variant="contained"
                            color="primary"
                            endIcon={<SendIcon />}
                            fullWidth
                            sx={{ textAlign: 'center' }}
                        >
                            Lähetä
                        </Button>
                        ): (
                            <IconButton onClick={handleSendMessage} color="primary">
                                <SendIcon />
                            </IconButton>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default SingleChatPage;
