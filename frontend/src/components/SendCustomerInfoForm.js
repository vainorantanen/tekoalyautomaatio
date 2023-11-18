import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField  } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useNotification } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerInfo } from '../reducers/customerinfo';
import ChatIcon from '@mui/icons-material/Chat';

const SendCustomerInfoForm = ({ offer }) => {

    const user = useSelector(({user}) => user)

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [ userEmail, setUserEmail ] = useState(user.email || '')
    const [ userPhone, setUserPhone ] = useState('')
    const [ message, setMessage ] = useState('')

    const dispatch = useDispatch()
    const notifyWith = useNotification()

    const openDialog = () => {
        setIsDialogOpen(true);
    };
    
    const closeDialog = () => {
        setIsDialogOpen(false);
        setUserEmail('')
        setUserPhone('')
        setMessage('')
    };
    
      const handleInfoSend = async () => {
        if (userEmail.trim() === '') {
          notifyWith('Täytä tiedot', 'error');
          return;
      }
    
      closeDialog();
    
        const confirmed = window.confirm(`Lähetetäänkö tiedot?`)
        if (!confirmed) {
          return // If the user clicks "Cancel," do nothing
        }
        try {
          const result = await dispatch(addCustomerInfo({senderEmail: userEmail, senderPhone: userPhone, offer,
          startingMessage: message}))
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
    <Button onClick={openDialog}>Aloita neuvottelu <ChatIcon /></Button>
    <Dialog open={isDialogOpen} onClose={closeDialog}
    fullWidth
    >
            <DialogTitle>Lähetä yhteystiedot ja viesti kehittäjälle {offer.user.name}</DialogTitle>
            <br></br>
            <DialogContent>
                <TextField
                    label="Email"
                    variant="outlined"
                    type='email'
                    required
                    fullWidth
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <br></br>
                <TextField
                    label="Puhelin"
                    variant="outlined"
                    fullWidth
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
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

export default SendCustomerInfoForm