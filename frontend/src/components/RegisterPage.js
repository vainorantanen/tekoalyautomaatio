import React, { useState } from 'react'
import { TextField, Button, Typography, Box,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment
} from '@mui/material'
import { useNotification } from '../hooks'
import { useDispatch } from 'react-redux'
import { addUser } from '../reducers/users'
import { useNavigate } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)
  const [openTermsDialog, setOpenTermsDialog] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [ isDeveloper, setIsDeveloper ] = useState(false)
  const [ description, setDescription ] = useState('')
  const [ email, setEmail ] = useState('')

  const notify = useNotification()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      // Passwords don't match, handle error here (e.g., display an error message)
      notify('Salasanat eivät täsmää!', 'error')
      return
    }
    try {
        dispatch(addUser({ username, password, name, isDeveloper, description, email }))
        setName('')
        setPassword('')
        setUsername('')
        setConfirmPassword('')
        setIsTermsAccepted(false)
        setIsDeveloper(false)
        setDescription('')
        setEmail('')
        notify('Käyttäjä rekisteröity onnistuneesti', 'success')
        navigate('/login')
    } catch (error) {
        notify('Rekisteröinti epäonnistui', 'error')
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

  const handleIsDeveloperCheckboxChange = (e) => {
    setIsDeveloper(e.target.checked)
  }

  const passwordsMatch = password === confirmPassword;

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
        Rekisteröidy
      </Typography>
      <Box sx={{ maxWidth: '30rem', }} component="form" onSubmit={handleSubmit}>
      <FormControlLabel
          control={<Checkbox checked={isDeveloper} onChange={handleIsDeveloperCheckboxChange}
          id='isdevcheck' />}
          label="Haluan rekisteröidä käyttäjän palveluja tarjoavana kehittäjänä"
          sx={{ marginBottom: '1rem' }}
        />
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
          id="email"
          label="Sähköposti"
          required
          type='email'
          fullWidth
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          margin="normal"
        />
        <TextField
          id="register-password"
          label="Salasana (vähintään 3 merkkiä pitkä)"
          type="password"
          required
          fullWidth
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {password.length > 0 && password.length < 3 ? <CancelIcon /> : null}
                {password.length >= 3 ? <CheckCircleIcon /> : null}
              </InputAdornment>
            ),
          }}
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {passwordsMatch && password.length !== 0 && (
            <CheckCircleIcon />
        )}
              </InputAdornment>
            ),}}
        />
        <TextField
          id="description"
          label="Tietoja minusta"
          fullWidth
          multiline
          rows={6}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isTermsAccepted}
              onChange={handleCheckboxChange}
              required
              id='termscheck'
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
            id='submit-button'
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
            Hyväksyn kaiken tietojen käytön. Huom! Ohjelmistomme on vielä kehitysvaiheessa.
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