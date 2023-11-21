import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField  } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ChatIcon from '@mui/icons-material/Chat';
import { addActiveProject } from '../../reducers/activeProjects';
import { useNotification } from '../../hooks';

const SendProjectRequestForm = ({developer}) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [ title, setTitle ] = useState('')
    const [ message, setMessage ] = useState('')

    const dispatch = useDispatch()
    const notifyWith = useNotification()

    const openDialog = () => {
        setIsDialogOpen(true);
    };
    
    const closeDialog = () => {
        setIsDialogOpen(false);
        setTitle('')
        setMessage('')
    };
    
      const handleInfoSend = async () => {
        if (title.trim() === '') {
          notifyWith('Täytä tiedot', 'error');
          return;
      }
    
      closeDialog();
    
        const confirmed = window.confirm(`Lähetetäänkö tiedot?`)
        if (!confirmed) {
          return // If the user clicks "Cancel," do nothing
        }
        try {
          const result = await dispatch(addActiveProject({ title, description: message, developer }))
          if (result && result.error) {
            notifyWith(result.error.response.data.error, 'error')
            return
          } else {
            notifyWith('Lähetetty onnistuneeti', 'success')
          }
        } catch (error) {
          notifyWith('Lähetys epäonnistui', 'error')
        }
    
      }

  return (
    <Box>
    <Button onClick={openDialog}>Lähetä projektipyyntö <ChatIcon /></Button>
    <Dialog open={isDialogOpen} onClose={closeDialog}
    fullWidth
    >
            <DialogTitle>Lähetä projektipyyntö</DialogTitle>
            <br></br>
            <DialogContent>
                <TextField
                    label="Otsikko"
                    variant="outlined"
                    type='email'
                    required
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br></br>
                <TextField
                    label="Lähetä viesti..."
                    variant="outlined"
                    type='text'
                    fullWidth
                    value={message}
                    multiline
                    rows={6}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} sx={{ color: 'red' }}>Peruuta</Button>
                  <Button onClick={handleInfoSend}>Lähetä</Button>
            </DialogActions>
        </Dialog>
    </Box>
    )
}

export default SendProjectRequestForm