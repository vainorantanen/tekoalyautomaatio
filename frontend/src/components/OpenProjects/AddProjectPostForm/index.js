import {
  Box,
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'

import { Fragment, createRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '../../../hooks'

import { resetFormData } from '../../../reducers/formData'
import { addPortalpost } from '../../../reducers/portalPosts'

import BasicInfoForm from './BasicInfoForm'
import FormSummary from './FormSummary'
import TermsForm from './TermsForm'
import AddDevPost from './AddDevPost'
import LoginSuggestion from '../../LoginSuggestion'
import UserDisabledText from '../../UserDisabledText'
import { addPost } from '../../../reducers/projectPosts'

const AddProjectPostForm = () => {

  const formData = useSelector(state => state.formData)
  const steps = ['Perustiedot', 'Ilmoituksen ehdot', 'Yhteenveto']

  const user = useSelector(({user}) => user)

  const notify = useNotification()
  const dispatch = useDispatch()

  const handleSubmit = async () => {

    try {
      if (formData.isOpenFeedPost === true) {
        const result = await dispatch(addPost(formData));
        if (result && result.error) {
          notify('Tapahtui virhe palvelimella', 'error')
          return {error: 'Tapahtui virhe palvelimella'}
        } else {
          notify('Ilmoitus lisätty onnistuneesti', 'success')
          dispatch(resetFormData())
        }
      } else if (formData.isOpenFeedPost === false) {
        const result = await dispatch(addPortalpost(formData))
        if (result && result.error) {
          notify('Tapahtui virhe palvelimella', 'error')
          return {error: 'Tapahtui virhe palvelimella'}
        } else {
          notify('Ilmoitus lisätty onnistuneesti', 'success')
          dispatch(resetFormData())
        }
      }
    } catch (error) {
      notify('Ilmeni jokin ongelma ilmoituksen lisäyksessä, yritä myöhemmin uudelleen', 'error')
      return {error: 'Tapahtui virhe ilmoituksen lisäyksessä'}
    } 
  }


  const handleBasicsSubmit = () => {
    basicsRef.current.handleSubmit()
  }

  const handleTermsSubmit = () => {
    termsRef.current.handleSubmit()
  }
  

  const basicsRef = createRef(null)
  const termsRef = createRef(null)

  const [activeStep, setActiveStep] = useState(0)

  const handleNext = async () => {
    if (activeStep === 0)  {
      if (!basicsRef.current.validateFields()) {
        return;
      }
      handleBasicsSubmit()

    } else if (activeStep === 1) {
      if (!termsRef.current.validateFields()) {
        return;
      }
      handleTermsSubmit()

    } else  if (activeStep === 2) {
        const res = await handleSubmit()
        if (res && res.error) {
          return;
        }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    dispatch(resetFormData())
  }
  
  
  if (!user) {
    return (
      <LoginSuggestion />
    )
  }

  if (user && user.disabled) {
    return (
      <Container sx={{ marginTop: '6rem' }}>
        <UserDisabledText />
      </Container>
    )
  }

  if (user && user.isDeveloper) {
    return (
      <AddDevPost />
    )
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        backgroundColor: '#222222',
        borderRadius: '1rem',
      }}
    >
      <Typography
        sx={{
          fontSize: '1.3rem',
          textAlign: 'center',
          marginTop: '6rem',
          '@media (max-width: 442px)': {
            fontSize: '1rem',
          },
        }}
      >
        Lisää ilmoitus
      </Typography>

      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1, fontSize: '1.5rem', textAlign: 'center' }}>
              Valmista tuli - Ilmoitus lisätty onnistuneesti!
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Uusi Ilmoitus</Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            { activeStep === 0 ? (
              <BasicInfoForm ref={basicsRef} />
            ) : activeStep === 1 ?(
              <TermsForm ref={termsRef} />
            ) : (
              <FormSummary />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Takaisin
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Lähetä' : 'Seuraava'}
              </Button>
            </Box>
          </Fragment>
        )}
      </Box>

    </Container>
  )
}

export default AddProjectPostForm
