import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField  } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useNotification } from '../hooks';
import { useDispatch } from 'react-redux';
import { addChat } from '../reducers/chats';

const StartChat = ({ targetUser }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [chatTitle, setChatTitle] = useState('');

    const dispatch = useDispatch()
    const notifyWith = useNotification()

    const openDialog = () => {
        setIsDialogOpen(true);
    };
    
    const closeDialog = () => {
        setIsDialogOpen(false);
        setChatTitle(''); // Clear the chat title when the dialog is closed
    };
    
      const handleChatStart = async () => {
        if (chatTitle.trim() === '') {
          notifyWith('Anna chatille otsikko', 'error');
          return;
      }
    
      closeDialog();
    
        const confirmed = window.confirm(`Luodaanko uusi keskustelu käyttäjän ${targetUser.name} kanssa?`)
        if (!confirmed) {
          return // If the user clicks "Cancel," do nothing
        }
        try {
          dispatch(addChat({targetUser: targetUser.id, title: chatTitle}))
          notifyWith('Uusi keskustelu luotu onnistuneesti, löydät omat keskustelusi sivuvalikosta', 'success')
        } catch (error) {
          notifyWith('Luonti epäonnistui', 'error')
        }
    
      }

  return (
    <Box>
    <Button onClick={openDialog}>Aloita uusi keskustelu käyttäjän {targetUser.name} kanssa</Button>
    <Dialog open={isDialogOpen} onClose={closeDialog}>
            <DialogTitle>Anna chatille otsikko</DialogTitle>
            <DialogContent>
                <TextField
                    label="Chatin otsikko"
                    variant="outlined"
                    fullWidth
                    value={chatTitle}
                    onChange={(e) => setChatTitle(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Peruuta</Button>
                  <Button onClick={handleChatStart}>Luo chat</Button>
            </DialogActions>
        </Dialog>
    </Box>
    )
}

export default StartChat