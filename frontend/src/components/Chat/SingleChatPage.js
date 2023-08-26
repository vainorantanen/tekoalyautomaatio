import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNotification } from '../../hooks';
import { addMessageToChat, updateChatState } from '../../reducers/chats';
import io from 'socket.io-client';
import chatService from '../../services/chats'

const SingleChatPage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    //const [messageReceived, setMessageReceived] = useState("");

    const socket = io.connect('http://localhost:3001')
    const chatId = useParams().id;

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
    }, []);
    

    useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessages(data.chatReturned.messages)
        });
      }, [socket]);

    const notify = useNotification();
    const dispatch = useDispatch();


    const user = useSelector(({ user }) => user);

    const handleSendMessage = async () => {
        try {
            const chatReturned = await chatService.addmessage(chatId, { content: message })
            dispatch(updateChatState(chatReturned))
            socket.emit("send_message", { chatReturned, chatId });
            setMessage('');
            notify('Viesti lähetetty onnistuneesti', 'success');
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
            <Box>
                {messages.length > 0 ? (
                    messages.map(mes => (
                        <Box key={mes.id} sx={{ display: 'flex', justifyContent: user.id === mes.user ? 'flex-end' : 'flex-start', marginBottom: '1rem' }}>
                            <Box sx={{ padding: '0.5rem', backgroundColor: user.id === mes.user ? '#B0D0FF' : 'white', color: 'black', borderRadius: '0.5rem', maxWidth: '80vw' }}>
                                <Typography sx={{ fontSize: '0.8rem' }}>{mes.user.name}</Typography>
                                <Typography>{mes.content}</Typography>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Typography>Ei viestejä</Typography>
                )}
            </Box>
            <Box sx={{ padding: '1rem', borderTop: '1px solid #ccc' }}>
                <Grid container spacing={2} alignItems="flex-end">
                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            type="text"
                            value={message}
                            placeholder="Kirjoita viesti"
                            required
                            onChange={({ target }) => setMessage(target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={handleSendMessage} variant="contained" color="primary" fullWidth>
                            Lähetä
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default SingleChatPage;
