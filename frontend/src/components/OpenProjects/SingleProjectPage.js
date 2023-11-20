import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNotification } from '../../hooks'
import MakeOfferForm from './MakeOfferForm'
import Togglable from '../Togglable'
import { modifyOfferApprovedState, removOfferFromProjectPost } from '../../reducers/projectPosts'
import SingleProjectInfo from './SingleProjectInfo'
import ProjectOfferCard from './ProjectOfferCard'
import SendCustomerInfoForm from '../SendCustomerInfoForm'


const SingleProjectPage = () => {

  const dispatch = useDispatch()
  const notifyWith = useNotification()

  const id = useParams().id

  const user = useSelector(({ user }) => user)
  const projectPost = useSelector(({ projectPosts }) => projectPosts.find(p => p.id === id))

  const handleModifyOfferState = async (offerId) => {
    const confirmed = window.confirm('Vahvistetaanko muutos?')
        if (!confirmed) {
          return // If the user clicks "Cancel," do nothing
        }
    try {
      const result = await dispatch(modifyOfferApprovedState(offerId, projectPost.id))
      if (result && result.error) {
        notifyWith(result.error.response.data.error, 'error')
        return
      } else {
        notifyWith('Tila muutettu onnistuneesti', 'success')
      }
    } catch (error) {
      notifyWith('Tarjouksen hyväksyntä epäonnistui', 'error')
    }

  }

  const handleDeleteOffer = async (offerId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tämän tarjouksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      const result = await dispatch(removOfferFromProjectPost(offerId, projectPost.id))
      if (result && result.error) {
        notifyWith('Tarjouksen poisto epäonnistui', 'error')
      } else {
        notifyWith('Poistettu onnistuneesti', 'success')
      }
    } catch (error) {
      notifyWith('Tarjouksen poisto epäonnistui', 'error')
    }

  }


  if (!projectPost) {
    return (
      <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  if (!user && projectPost.isPortalPost) {
    return ( <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
      <Typography>Et voi nähdä portaalipostauksia, ne ovat salaisia!</Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Box>
          <SingleProjectInfo post={projectPost} />
        </Box>
        {user && user.isDeveloper === true && (
        <Togglable buttonLabel='Tee tarjous'>
          <MakeOfferForm projectPost={projectPost}/>
        </Togglable>
      )}
      <Box sx={{ marginTop: '2rem' }}>
        <Typography sx={{ marginBottom: '2rem' }}>Tarjoukset</Typography>
        {projectPost.offers.map(offer => (
          <Box key={offer.id}>
            <ProjectOfferCard offer={offer}/>
            {user && user.id === projectPost.user.id && !offer.isApproved ? (
              <Button onClick={() => handleModifyOfferState(offer.id)}>Hyväksy tarjous</Button>
            ): null}
            {user && user.id === projectPost.user.id && offer.isApproved ? (
              <Button onClick={() => handleModifyOfferState(offer.id)}>Epähyväksy tarjous</Button>
            ): null}
            {user && user.id === projectPost.user.id ? (
              <Box>
                <SendCustomerInfoForm offer={offer}/>
                </Box>
            ): null}


            {user && (user.id === projectPost.user.id || user.id === offer.user) && (
              <Button sx={{ color: 'red' }} onClick={() => handleDeleteOffer(offer.id)}>Poista tarjous</Button>
            )}
          </Box>
        ))}
      </Box>
    </Container>
  )
}

export default SingleProjectPage