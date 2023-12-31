import React, { useState } from 'react'
import { useNotification } from '../../../hooks';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { socket } from '../../../socket';
import activeProjects from '../../../services/activeProjects';

const AddTaskForm = ({state, project, setTasks}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [ message, setMessage ] = useState('')

    const notifyWith = useNotification()

    const openDialog = () => {
        setIsDialogOpen(true);
    };
    
    const closeDialog = () => {
        setIsDialogOpen(false);
        setMessage('')
    };
    
      const handleInfoSend = async () => {
        if (message.trim() === '') {
          notifyWith('Täytä tiedot', 'error');
          return;
      }
    
      closeDialog();
    
        try {
          const result = await activeProjects.sendTask({ content: message, state, id: project.id})
          if (result && result.error) {
            notifyWith(result.error.response.data.error, 'error')
            return
          } else {
            setTasks(result.tasks)
            socket.emit("send_task", result);
            notifyWith('Lähetetty onnistuneeti', 'success')
          }
        } catch (error) {
          notifyWith('Lähetys epäonnistui', 'error')
        }
    
      }

  return (
    <Box>
    <Button onClick={openDialog}>Lisää tehtävä <AddIcon /></Button>
    <Dialog open={isDialogOpen} onClose={closeDialog}
    fullWidth
    >
            <DialogTitle>Lisää tehtävä</DialogTitle>
            <br></br>
            <DialogContent>
                <TextField
                    label="Kirjoita..."
                    variant="outlined"
                    type='text'
                    fullWidth
                    required
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

export default AddTaskForm