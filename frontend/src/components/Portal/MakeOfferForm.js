import { Container, Typography, Button, TextField, Box, InputAdornment } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNotification } from '../../hooks'
import { addPortalBid } from '../../reducers/portalBids'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers'

const MakeOfferForm = ({ portalPost }) => {
  const [description, setDescription] = useState('')
  const [ minPrice, setMinPrice ] = useState(0)
  const [date, setDate] = useState(dayjs().add(1, 'day'))
  // eslint-disable-next-line no-unused-vars
  const [dateError, setDateError] = useState(false)
  const [ maxPrice, setMaxPrice ] = useState(0)

  const notify = useNotification()
  
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await dispatch(addPortalBid({
        description, minPrice, maxPrice, target: portalPost,
        dueDate: dayjs(date)
      }))
      if (result && result.error) {
        notify(result.error.response.data.error, 'error')
        return
      } else {
        notify('Tarjous lisätty onnistuneesti', 'success')
        setDescription('')
      }
    } catch (error) {
      notify('Ilmeni jokin ongelma tarjouksen teossa, yritä myöhemmin uudelleen', 'error')
    }
    
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', 
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#393939',
    borderRadius: '0.5rem' }}>
      <Typography sx={{ marginTop: '1rem' }}>Tarjoa</Typography>
      <Box component="form" onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '2rem',
          marginBottom: '2rem',
          width: '100%',
          maxWidth: '30rem',
        }}
      >
        <Typography sx={{ marginBottom: '1rem' }}>Hinta-arvio (esitä projektisi arvioitu hinta)</Typography>
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
        <Typography sx={{ marginTop: '1rem', marginBottom: '1rem' }}>Kuvaus</Typography>
        <TextField
          id="description"
          label="Kerro tarjouksestasi tarkemmin"
          multiline
          rows={12}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <Typography>Aseta tarjouksesi voimassaololle takaraja</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Aseta takaraja"
            error={dateError}
            value={date}
            format="DD.MM.YYYY"
            required
            minDate={dayjs().add(1, 'day')}
            onChange={(newValue) => {
              setDate(newValue)
            }}
          />
        </LocalizationProvider>
        <Button
        className="bn632-hover bn26"
          type="submit"
          fullWidth
          disabled={(minPrice < 0 || maxPrice < 0 || maxPrice < minPrice
            || isNaN(minPrice) || isNaN(maxPrice)) || dateError || !description}
            sx={{color: 'white',
            marginTop: '1rem',
          }}
        >
          Lähetä tarjous
        </Button>
      </Box>
    </Container>
  )
}

export default MakeOfferForm