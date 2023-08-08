import React, { useState } from 'react'
import { TextField, Button, Typography, Box,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,

} from '@mui/material'
import { useNotification } from '../hooks'
import usersService from '../services/users'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)
  const [openTermsDialog, setOpenTermsDialog] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')

  const notify = useNotification()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      // Passwords don't match, handle error here (e.g., display an error message)
      console.log('Salasanat eivät täsmää!')
      return
    }
    try {
        await usersService.create({ username, password, name })
        setName('')
        setPassword('')
        setUsername('')
        setConfirmPassword('')
        setIsTermsAccepted(false)
        notify('Käyttäjä rekisteröity onnistuneesti', 'success')
    } catch (error) {
        notify('Rekiströinti epäonnistui', 'error')
    }
    
  }

  const handleTermsDialogOpen = () => {
    setOpenTermsDialog(true)
  }

  const handleTermsDialogClose = () => {
    setOpenTermsDialog(false)
  }

  const handleCheckboxChange = (e) => {
    setIsTermsAccepted(e.target.checked)
  }

  return (
    <Box sx={{ marginTop: '6rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '3rem' }}>
      <Typography sx={{
        fontSize: '2rem',
        textAlign: 'center',
        '@media (max-width: 442px)': {
          fontSize: '1.5rem',
        },
      }}>
        Rekiströidy
      </Typography>
      <Box sx={{ maxWidth: '30rem', }} component="form" onSubmit={handleSubmit}>
        <TextField
          id="register-username"
          label="Käyttäjätunnus"
          required
          fullWidth
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          margin="normal"
        />
        <TextField
          id="name"
          label="Nimi (näkyy muille käyttäjille)"
          required
          fullWidth
          value={name}
          onChange={({ target }) => setName(target.value)}
          margin="normal"
        />
        <TextField
          id="register-password"
          label="Salasana"
          type="password"
          required
          fullWidth
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          margin="normal"
        />
        <TextField
          id="confirm-password"
          label="Vahvista salasana"
          type="password"
          required
          fullWidth
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isTermsAccepted}
              onChange={handleCheckboxChange}
              required
            />
          }
          label={
            <Typography
              sx={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={handleTermsDialogOpen}
            >
              Hyväksyn palvelun käyttöehdot
            </Typography>
          }
          sx={{ marginBottom: '1rem' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Button
            variant="contained"
            type="submit"
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
            Reksiteröidy
          </Button>
        </Box>
      </Box>
      <Dialog open={openTermsDialog} onClose={handleTermsDialogClose}>
        <DialogTitle>Palvelun käyttöehdot</DialogTitle>
        <DialogContent>
          {/* Add your terms of service content here */}
          <Typography>
            Lorem ipsum
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTermsDialogClose}>Sulje</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default RegisterPage