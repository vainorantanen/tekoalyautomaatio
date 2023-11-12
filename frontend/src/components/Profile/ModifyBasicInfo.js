import { Box, Typography, TextField, Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNotification } from '../../hooks'
import { useState } from 'react'
import { updateUser } from '../../reducers/user'

const ModifyBasicInfo = () => {
    
    const user = useSelector(({user}) => user)
  
    const [email, setEmail] = useState(user.email ? user.email : '')

    const notify = useNotification()
    const dispatch = useDispatch()

    const handleSubmit = async () => {
        const confirmed = window.confirm(`Haluatko varmasti päivittää sähköpostiosoitteeksi ${email}`)
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }

        try {
            dispatch(updateUser({...user, email }))
            notify('Päivitys tehty onnistuneesti', 'success')
        } catch (error) {
            notify('Ilmeni jokin ongelma päivityksessä, yritä myöhemmin uudelleen', 'error')
        }
    }

      if (!user) {
          return null
      }

  return (
    <Box>
        <Typography>Nimi {user.name}</Typography>
        <Typography>Käyttäjätunnus {user.username}</Typography>
        <Typography>Sähköposti {user.email}</Typography>
        <Box sx={{ marginTop: '1rem', display: 'flex', flexDirection: 'row',
        flexWrap: 'wrap', alignItems: 'center'
            }}>
            <TextField
            id="email"
            label="Muokkaa sähköpostiosoitetta"
            type='email'
            fullWidth
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            sx={{ marginBottom: '1rem', maxWidth: '25rem' }}
        />
        <Button
            onClick={handleSubmit}
        >
            Päivitä
        </Button>
      </Box>
    </Box>
  )
}

export default ModifyBasicInfo