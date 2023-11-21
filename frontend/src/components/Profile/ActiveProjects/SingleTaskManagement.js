import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNotification } from '../../../hooks';
import { removeTask, updateTask } from '../../../reducers/activeProjects';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import { Edit } from '@mui/icons-material';

const SingleTaskManagement = ({task, project}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [ message, setMessage ] = useState(task.content || '')
    const [ state, setState ] = useState(task.taskState || '')

    const dispatch = useDispatch()
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
            console.log(state)
          const result = await dispatch(updateTask(project, { ...task, content: message, state}))
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

      const handleTaskDelete = async () => {
        const confirmed = window.confirm(`Poistetaanko tehtävä?`)
        if (!confirmed) {
          return
        }
        try {
            const result = await dispatch(removeTask(task.id, project.id))
            if (result && result.error) {
              notifyWith(result.error.response.data.error, 'error')
              return
            } else {
              notifyWith('Poistettu onnistuneeti', 'success')
            }
          } catch (error) {
            notifyWith('Poisto epäonnistui', 'error')
          }
      }

  return (
    <Box>
    <Button onClick={openDialog}><Edit /></Button>
    <Dialog open={isDialogOpen} onClose={closeDialog}
    fullWidth
    >
            <DialogTitle>Hallinnoi tehtävää</DialogTitle>
            <br></br>
            <DialogContent>
                <TextField
                    label="Muokkaa sisältöä..."
                    variant="outlined"
                    type='text'
                    fullWidth
                    required
                    value={message}
                    multiline
                    rows={4}
                    onChange={(e) => setMessage(e.target.value)}
                />
                                    <TextField
                        select
                        label="Valitse tila"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        fullWidth
                        sx={{ marginTop: '1rem' }}
                    >
                        {['waiting', 'todo', 'rejected', 'doing', 'done'].map(
                            (option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            )
                        )}
                    </TextField>
                    <Button variant="outlined" color="error" sx={{ marginTop: '1rem' }}
                    onClick={handleTaskDelete}>
                        Poista
                    </Button>

            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} sx={{ color: 'red' }}>Peruuta</Button>
                  <Button onClick={handleInfoSend}>Vahvista</Button>
            </DialogActions>
        </Dialog>
    </Box>
    )
}

export default SingleTaskManagement