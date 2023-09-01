import { Box, Typography, Button, TextField, Container } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNotification } from '../../hooks'
import { updateBlog } from '../../reducers/blogs'
import { useParams } from 'react-router-dom'

const ModifyBlogForm = () => {

    const { id } = useParams()

    const blog = useSelector(({blogs}) => blogs).find(b => b.id === id)

    const [ title, setTitle ] = useState(blog ? blog.title : '')
    const [description, setDescription] = useState(blog ? blog.description : '')

    const notify = useNotification()
    const dispatch = useDispatch()

    const handleSubmit = async () => {
        try {
            dispatch(updateBlog({ ...blog, title, description }))
            notify('Päivitys tehty onnistuneesti', 'success')
        } catch (error) {
            notify('Ilmeni jokin ongelma päivityksessä, yritä myöhemmin uudelleen', 'error')
        }
    }

    if (!blog) {
        return (
            <Container sx={{ marginTop: '5rem', minHeight: '100vh' }}>
                <Typography>Ladataan...</Typography>
            </Container>
        )
    }

  return (
    <Box sx={{  display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center',
    marginTop: '5rem' }}>
        <Typography sx={{ marginBottom: '1rem', fontSize: '1.3rem' }}>Muokkaa blogia</Typography>
        <TextField
        id="title"
        label="Muokkaa otsikkoa"
        fullWidth
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        sx={{ marginBottom: '1rem', maxWidth: '40rem' }}
      />
      <TextField
        id="description"
        label="Muokkaa blogitekstiä"
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
        Päivitä
      </Button>
    </Box>
  )
}

export default ModifyBlogForm