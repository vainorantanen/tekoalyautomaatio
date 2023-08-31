import { Container, Typography, Box, Button } from '@mui/material'
import React from 'react'
import {  useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNotification } from '../../hooks'
import { markBlogInappropriate } from '../../reducers/blogs'

const BuyerUserPage = () => {
  const id = useParams().id

  const dispatch = useDispatch()
  const notifyWith = useNotification()
  const user = useSelector(({ users }) => users).find(p => p.id === id)
  const userBlogs = useSelector(({blogs})=> blogs).filter(b => b.user.id === user.id)


  const handleInappropriate = (blogId)  => {
    const confirmed = window.confirm(`Haluatko varmasti ilmoittaa tämän julkaisun epäasiallisena?`)
          if (!confirmed) {
            return // If the user clicks "Cancel," do nothing
          }

          try {
            dispatch(markBlogInappropriate(blogId));
            notifyWith('Ilmoitettu onnistuneesti', 'success');
          } catch (error) {
            notifyWith('Ilmeni jokin ongelma', 'error');
          }
  }

  if (!user) {
    return (
      <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography sx={{ marginBottom: '1rem' }}>{user.name}</Typography>
        <Typography sx={{
          whiteSpace: 'break-spaces', borderTop: '1px solid white'
        }}>{user.description}</Typography>
        <Box sx={{ marginBottom: '1rem', marginTop: '1rem', borderTop: '1px solid white' }}>
            <Typography sx={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Käyttäjän blogit</Typography>
            {userBlogs.length > 0 ?
              userBlogs.map(b => (
                <Box key={b.id} sx={{ backgroundColor: 'white', color: 'black',
                borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
                  <Typography sx={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{b.title}</Typography>
                  <Typography>{b.user.name}</Typography>
                  <Typography sx={{ whiteSpace: 'break-spaces' }}>{b.description}</Typography>
                  <Button onClick={() => handleInappropriate(b.id)}>Ilmoita blogi epäasiallisena</Button>
                </Box>
              )): (
              <Typography>Käyttäjällä ei ole vielä blogeja</Typography>
            )}
          </Box>
    </Container>
  )
}

export default BuyerUserPage