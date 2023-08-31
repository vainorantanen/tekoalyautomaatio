import { Box, Container, Typography, Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNotification } from '../../hooks'
import { useDispatch } from 'react-redux'
import { removeBlog } from '../../reducers/blogs'

const ModifyShownBlogs = () => {
    const notify = useNotification()
    const user = useSelector(({user}) => user)
  const dispatch = useDispatch()
    const userBlogs = useSelector(({blogs}) => blogs).filter(b => b.user.id === user.id)

    const handleDeleteBlog = async (blogId) => {
        const confirmed = window.confirm('Haluatko varmasti poistaa tämän blogin?')
        if (!confirmed) {
          return // If the user clicks "Cancel," do nothing
        }
    
        try {
          dispatch(removeBlog({ id: blogId }))
          notify('Poistettu onnistuneesti', 'success')
        } catch (error) {
          notify('Ilmeni jokin ongelma poistossa', 'erro')
        }
      }

    if (!user) {
        return (
            <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
                <Typography>Kirjaudu sisään lisätäksesi blogi</Typography>
            </Container>
        )
    }

  return (
        <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
            <Typography sx={{ fontSize: '1.4rem', textAlign: 'center' }}>Omat blogini</Typography>
            <Button component={Link} to='/lisaa-blogi' >Lisää blogi</Button>
            {userBlogs && userBlogs.length > 0 ? (
                userBlogs.map(b => (
                    <Box key={b.id} sx={{ backgroundColor: 'white', color: 'black',
                    borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
                        <Typography sx={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{b.title}</Typography>
                        <Typography sx={{ whiteSpace: 'break-spaces' }}>{b.description}</Typography>
                        <Button component={Link} to={`/profiili/blogit/muokkaa/${b.id}`}>Muokkaa</Button>
                        <Button sx={{ color: 'red' }} onClick={() => handleDeleteBlog(b.id)}>Poista</Button>
                    </Box>
                ))
            ): (
                <Box>
                    <Typography>Ei vielä blogeja</Typography>
                </Box>
            )}
        </Container>
  )
}

export default ModifyShownBlogs