import { Container } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import SingleDevPage from '../Devs/SingleDevPage'
import BuyerUserPage from './BuyerUserPage'
import { useParams } from 'react-router-dom'

const SingleUserPage = () => {

    const userId = useParams().id

    const user = useSelector(({users}) => users).find(u => u.id === userId)

    if (!user) {
        return null
    }

  return (
    <Container>
        {user.isDeveloper ? (
            <SingleDevPage />
        ): (
            <BuyerUserPage />
        )}
    </Container>
  )
}

export default SingleUserPage