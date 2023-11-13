import {
  Box,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '../../../hooks'
import { update } from '../../../reducers/formData'

const BasicInfoForm = forwardRef((props, ref) => {
  const formData = useSelector(state => state.formData)

  const [other, setOther] = useState(formData.other)
  const [description, setDescription] = useState(formData.description)
  const [question1, setQuestion1] = useState(formData.question1)
  const [question1Other, setQuestion1Other] = useState(formData.question1Other)
  const [question2, setQuestion2] = useState(formData.question2)
  const [question2Other, setQuestion2Other] = useState(formData.question2Other)
  const [question3, setQuestion3] = useState(formData.question3)
  const [question4, setQuestion4] = useState(formData.question4)

  const [dError, setDError] = useState(false)
  const [q1OError, setQ1OError] = useState(false)
  const [q2OError, setQ2OError] = useState(false)
  const [q4Error, setQ4Error] = useState(false)

  const notify = useNotification()
  const dispatch = useDispatch()

  const validateFields = () => {
    let isValid = true

    if (!description) {
      setDError(true)
      isValid = false
    } else {
      setDError(false)
    }

    if (question1 === 'other' && !question1Other) {
      setQ1OError(true)
      isValid = false
    } else {
      setQ1OError(false)
    }

    if (question2 === 'other' && !question2Other) {
      setQ2OError(true)
      isValid = false
    } else {
      setQ2OError(false)
    }

    if (!question4) {
      setQ4Error(true)
      isValid = false
    } else {
      setQ4Error(false)
    }

    return isValid
  }

  const handleSubmit =  () => {

    if (!validateFields()) {
      notify('Täytä kaikki pakolliset kentät', 'error')
      return
    }
    dispatch(update({
      other,
      description,
      question1,
      question1Other,
      question2,
      question2Other,
      question3,
      question4
    }))
  }

  useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit,
    validateFields: validateFields
  }))

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        borderRadius: '1rem',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '2rem',
          marginBottom: '2rem',
          width: '100%',
          maxWidth: '30rem',
        }}
      >
        {/* Description */}
        <TextField
          id="description"
          label="Kerro projektisi tarkoituksesta."
          required
          error={dError}
          multiline
          minRows={5}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ marginBottom: '1rem',    marginTop: '1rem' }}
        />

        {/* Question 1 */}
        <Typography>Kenelle projektisi on suunnattu?</Typography>
        <RadioGroup
          aria-label="question2"
          name="question2"
          value={question1}
          sx={{ marginBottom: '2rem' }}
          onChange={(event) => setQuestion1(event.target.value)}
        >
          <FormControlLabel value="Kuluttajat" control={<Radio />} label="Kuluttajat" />
          <FormControlLabel value="Yritykset tai yrittäjät" control={<Radio />} label="Yritykset tai yrittäjät" />
          <FormControlLabel value="Sisäiset sidosryhmät" control={<Radio />} label="Sisäiset sidosryhmät" />
          <FormControlLabel value="other" control={<Radio />} label="Muu, mikä?" />
          {question1 === 'other' && (
            <TextField
              id="question1-other"
              label="Muu. Kerro tarkemmin."
              value={question1Other}
              required
              error={q1OError}
              onChange={({ target }) => setQuestion1Other(target.value)}
              sx={{ marginLeft: '1rem' }}
            />
          )}
        </RadioGroup>

        {/* Question 2 */}
        <Typography>Onko olemassa teknologiasia rajoitteita?</Typography>
        <RadioGroup
          aria-label="question2"
          name="question2"
          value={question2}
          sx={{ marginBottom: '2rem' }}
          onChange={(event) => setQuestion2(event.target.value)}
        >
          <FormControlLabel value="Tiettyjä ohjelmistoja ja teknologioita valittu, jotka voivat rajoittaa projektia." control={<Radio />} label="Tiettyjä ohjelmistoja ja teknologioita valittu, jotka voivat rajoittaa projektia." />
          <FormControlLabel value="Ohjelmistoa ja teknologioita valittu, mutta joustoa on " control={<Radio />} label="Ohjelmistoa ja teknologioita valittu, mutta joustoa on " />
          <FormControlLabel value="Ei rajoittavia tekijöitä" control={<Radio />} label="Ei rajoittavia tekijöitä" />
          <FormControlLabel value="other" control={<Radio />} label="Muu, mikä?" />
          {question2 === 'other' && (
            <TextField
              id="question3-other"
              label="Muu. Kerro tarkemmin."
              value={question2Other}
              required={q2OError}
              onChange={({ target }) => setQuestion2Other(target.value)}
              sx={{ marginLeft: '1rem' }}
            />
          )}
        </RadioGroup>

        {/* Question 3 */}
        <Typography>Tarvitsetko sivuillesi sisällönhallintatyökaluja?</Typography>
        <RadioGroup
          aria-label="question3"
          name="question3"
          value={question3}
          required
          sx={{ marginBottom: '2rem' }}
          onChange={(event) => setQuestion3(event.target.value)}
        >
          <FormControlLabel value="Laaja CMS" control={<Radio />} label="Laaja CMS" />
          <FormControlLabel value="Suppea CMS" control={<Radio />} label="Suppea CMS" />
          <FormControlLabel value="Ei tarvetta" control={<Radio />} label="Ei tarvetta" />
        </RadioGroup>

        {/* Question 4 */}
        <TextField
          id="functionality"
          label="Mitä toiminnallisuuksia projektillasi tulee olla?"
          required
          multiline
          minRows={5}
          error={q4Error}
          value={question4}
          onChange={({ target }) => setQuestion4(target.value)}
          sx={{ marginBottom: '1rem' }}
        />

        <TextField
          id="other"
          label="Mainitse mahdolliset muut toiveet."
          multiline
          minRows={5}
          value={other}
          onChange={({ target }) => setOther(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
      </Box>
    </Container>
  )
})

export default BasicInfoForm
