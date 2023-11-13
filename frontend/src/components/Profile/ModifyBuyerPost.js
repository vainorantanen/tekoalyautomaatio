import { Box, Button, Container, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useNotification } from '../../hooks'
import { updatePost } from '../../reducers/projectPosts'

const ModifyBuyerPost = () => {
  
  const notify = useNotification()
  const dispatch = useDispatch()

    const postId = useParams().id
    const user = useSelector(({user}) => user)

    const userPost = useSelector(({ projectPosts }) => projectPosts).find(p => p.id === postId)
    
    const [description, setDescription] = useState('');
    const [question4, setQuestion4] = useState('');
    const [other, setOther] = useState('');
    const [ minPrice, setMinPrice ] = useState(0)
    const [ maxPrice, setMaxPrice ] = useState(0)
  
    // Use useEffect to set initial values when userPost changes
    useEffect(() => {
      if (userPost) {
        setDescription(userPost.description);
        setQuestion4(userPost.question4);
        setOther(userPost.other);
        setMinPrice(userPost.minPrice)
        setMaxPrice(userPost.maxPrice)
      }
    }, [userPost]);

    const handleSubmit = async () => {
      try {
        const result = await dispatch(updatePost({...userPost, description, question4, other,
          minPrice, maxPrice }))
          if (result && result.error) {
            notify('Tapahtui virhe palvelimella', 'error')
            return
          } else {
            notify('Päivitys tehty onnistuneesti', 'success')
            }
      } catch (error) {
          notify('Ilmeni jokin ongelma päivityksessä, yritä myöhemmin uudelleen', 'error')
      }
  }

    if (!userPost || user.id !== userPost.user.id) {
        <Container>
            <Typography>Error loading data</Typography>
        </Container>
    }

  return (
    <Container sx={{ backgroundColor: '#393939', minHeight: '90vh', display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center',
    marginTop: '5rem', borderRadius: '0.5rem' }}>
        <Typography sx={{ marginBottom: '4rem' }}>Muokkaa ilmoituksen sisältöä</Typography>
        <Typography sx={{ marginBottom: '2rem' }}>Sivuston tarkoitus</Typography>
        <TextField
        id="description"
        label="Muokkaa tarkoitusta"
        multiline
        required
        rows={10}
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        sx={{ marginBottom: '1rem',  maxWidth: '40rem' }}
      />
<Typography sx={{ marginBottom: '2rem' }}>Sivuston toiminnallisuudet</Typography>
      <TextField
        id="functionality"
        label="Muokkaa toiminnallisuuksia"
        multiline
        required
        rows={10}
        fullWidth
        value={question4}
        onChange={({ target }) => setQuestion4(target.value)}
        sx={{ marginBottom: '1rem',  maxWidth: '40rem' }}
      />
<Typography sx={{ marginBottom: '2rem' }}>Sivuston muut toiveet</Typography>
      <TextField
        id="other"
        label="Muokkaa muita toiveita"
        multiline
        rows={10}
        fullWidth
        value={other}
        onChange={({ target }) => setOther(target.value)}
        sx={{ marginBottom: '1rem',  maxWidth: '40rem' }}
      />

<Typography sx={{ marginBottom: '1rem' }}>Hinta-arvio</Typography>
        {(minPrice < 0 || maxPrice < 0 || maxPrice < minPrice
        || isNaN(minPrice) || isNaN(maxPrice)) && (
          <Typography sx={{ color: 'red' }}>Tarkista hinta-arviosi</Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <TextField
            label="Minimihinta"
            type='number'
            id="minPrice"
            sx={{ m: 1, width: '25ch' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
            value={minPrice}
            required
            onChange={({target}) => setMinPrice(parseInt(target.value))}
          />
          <Typography
            sx={{
              m: 1,
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1.3rem',
            }}
          >-</Typography>
          <TextField
            label="Maksimihinta"
            type='number'
            id="maxPrice"
            sx={{ m: 1, width: '25ch' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
            value={maxPrice}
            required
            onChange={({ target }) => setMaxPrice(parseInt(target.value))}
          />
        </Box>

        <Button
        className="bn632-hover bn26"
        onClick={handleSubmit}
        variant="contained"
        disabled={(minPrice < 0 || maxPrice < 0 || maxPrice < minPrice)}
        sx={{color: 'white',
              marginTop: '1rem',
              maxWidth: '10rem',
            }}
      >
        Päivitä
      </Button>
    </Container>
  )
}

export default ModifyBuyerPost