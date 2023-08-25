import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNotification } from '../../hooks';
import { addMessageToChat } from '../../reducers/chats';

const SingleChatPage = () => {
    const [message, setMessage] = useState('');
    const notify = useNotification();
    const dispatch = useDispatch();
    const chatId = useParams().id;
    const chat = useSelector(({ chats }) => chats).find(c => c.id === chatId);

    const user = useSelector(({ user }) => user);

    const handleSendMessage = async () => {
        try {
            dispatch(addMessageToChat(chatId, { content: message }));
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
                {chat.messages.length > 0 ? (
                    chat.messages.map(mes => (
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
