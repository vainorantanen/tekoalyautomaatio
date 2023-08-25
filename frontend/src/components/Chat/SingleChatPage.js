import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNotification } from '../../hooks'

const SingleChatPage = () => {

    const [ message, setMessage ] = useState('')
    const notify = useNotification()
    const dispatch = useDispatch()
    const chatId = useParams().id
    const chat = useSelector(({ chats }) => chats).find(c => c.id === chatId)

    const user = useSelector(({ user }) => user)

    const handleSendMessage = async () => {
        try {
            console.log(message)
            notify('Viesti lähetetty onnistuneesti', 'success')
        } catch (error) {
            notify('Viestin lähetys epäonnistui', 'error')
        }
    }

    if (!user || !chat) {
        return (
            <Typography>Error loading chat</Typography>
        )
    }

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '90vh' }}>
        <Box>
            {chat.messages.length > 0 ? (
                chat.messages.map(mes => (
                    <Box key={mes.id}>
                        <Typography>{mes.content}</Typography>
                    </Box>
                ))
            ): (
                <Typography>Ei viestejä</Typography>
            )}
        </Box>
        <Box sx={{ position: 'fixed', bottom: '4rem' }}>
            <TextField
                fullWidth
                type='text'
                value={message}
                placeholder='Kirjoita viesti'
                required
                onChange={({target}) => setMessage(target.value)}
            />
            <Button onClick={handleSendMessage}>Lähetä</Button>
        </Box>
    </Container>
  )
}

export default SingleChatPage