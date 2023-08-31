import { Container, Typography, Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import BuyersPosts from './BuyersPosts'
import UserFeedPosts from './UserFeedPosts'
import ModifyBasicInfo from './ModifyBasicInfo'
import { Link } from 'react-router-dom'
import ModifyDescriptionForm from './ModifyDescriptionForm'

const BuyerProfile = () => {
  const localUser = useSelector(({user}) => user)
  const user = useSelector(({users}) => users).find(u => u.id === localUser.id)

    if (!user) {
        return null
    }

  return (
    <Container sx={{ marginTop: '1rem' }}>
        <Typography sx={{ marginBottom: '1rem' }}>Käyttäjän {user.name} profiili</Typography>
        <Typography sx={{ marginBottom: '1rem' }}>Tietoja minusta:</Typography>
        <ModifyBasicInfo />
        <ModifyDescriptionForm />
        <Button sx={{ marginTop: '1rem', marginBottom: '1rem' }} component={Link} to='/profiili/muokkaa/blogit'>Hallinnoi profiilisissa näytettäviä blogeja</Button>
        <BuyersPosts />
        <Typography sx={{ marginBottom: '2rem', marginTop: '2rem' }}>Omat julkaisut</Typography>
        <UserFeedPosts />
        <Typography>Omat keskustelusi</Typography>
        <Button component={Link} to={'/omatkeskustelut'}>Näytä</Button>
    </Container>
  )
}

export default BuyerProfile