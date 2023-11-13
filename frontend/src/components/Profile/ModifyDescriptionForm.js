import { Box, Typography, Button, TextField } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNotification } from '../../hooks'
import { updateUser } from '../../reducers/user'

const ModifyDescriptionForm = () => {

    const user = useSelector(({user}) => user)

    const [description, setDescription] = useState(user.description)

    const notify = useNotification()
    const dispatch = useDispatch()

    const handleSubmit = async () => {
        try {
            dispatch(updateUser({...user, description }))
            notify('Päivitys tehty onnistuneesti', 'success')
        } catch (error) {
            notify('Ilmeni jokin ongelma päivityksessä, yritä myöhemmin uudelleen', 'error')
        }
    }

  return (
    <Box sx={{  display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center',
    marginTop: '3rem', borderTop: '1px solid white' }}>
        <Typography sx={{ marginBottom: '1rem', marginTop: '1rem' }}>Muokkaa esittelyäsi</Typography>
        <TextField
        id="description"
        label="Muokkaa esittelyä"
        multiline
        fullWidth
        rows={12}
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        sx={{ marginBottom: '1rem', maxWidth: '40rem' }}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{
          backgroundColor: 'blue',
          color: 'white',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)',
          },
        }}
      >
        Päivitä
      </Button>
    </Box>
  )
}

export default ModifyDescriptionForm