import { Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ModifyBuyerPost = () => {

    const postId = useParams().id
    const user = useSelector(({user}) => user)

    const userPost = useSelector(({ projectPosts }) => projectPosts).find(p => p.id === postId)

    if (!userPost || user.id !== userPost.user.id) {
        <Container>
            <Typography>Error loading data</Typography>
        </Container>
    }

  return (
    <Container sx={{ minHeight: '90vh', marginTop: '5rem' }}>
        <Typography>Muokkaa ilmoituksen sisältöä</Typography>
    </Container>
  )
}

export default ModifyBuyerPost