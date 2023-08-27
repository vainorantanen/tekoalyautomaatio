import React, { useState } from 'react'
import { TextField, Button, Typography, Box, Container,
  } from '@mui/material'
  import { useNotification } from '../../hooks'
  import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import StarRating from './StarRating';
import { addRating } from '../../reducers/ratings'

const AddRatingForm = () => {
    const [score, setScore] = useState(0);
    const [ description, setDescription ] = useState('')

    const { id } = useParams()

    const notify = useNotification()
  const dispatch = useDispatch()

  const dev = useSelector(({ users }) => users).find(u => u.id === id)

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (score < 1 || score > 5) {
          notify('Arvosanan tulee olla vähintään 1 tähti', 'error')
          return
        }

        try {
            //targetuser
            dispatch(addRating({ targetUserId: id, score, description }))
            console.log(score, description)
            setScore(0)
            setDescription('')
            notify('Arvostelu lisätty onnistuneesti', 'success')
        } catch (error) {
            notify('Arvostelun lisäys epäonnistui', 'error')
        }
        
      }

      if (!dev) {
        return (
          <Container sx={{ marginTop: '6rem' }}>
            <Typography>Ladataan...</Typography>
          </Container>
        )
      }

  return (
    <Box sx={{  display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center',
    marginTop: '5rem', minHeight: '80vh' }}>
        <Typography sx={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Lisää arvostelu käyttäjälle {dev.name}</Typography>
        <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <Typography sx={{ marginBottom: '1rem' }}>Anna käyttäjälle arvosana 1-5 (tähteä)</Typography>
          <StarRating score={score} onScoreChange={setScore} />
        </Box>
        <TextField
        id="description"
        label="Kirjoita arvostelu"
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
        Lähetä
      </Button>
    </Box>
  )
}

export default AddRatingForm