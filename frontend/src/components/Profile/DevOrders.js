import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '../../hooks'
import { endOrder } from '../../reducers/orders'
import { updateUser } from '../../reducers/user'

const DevOrders = () => {

    const user = useSelector(({user}) => user)
    const orders = useSelector(({orders}) => orders)
    const notify = useNotification()
    const dispatch = useDispatch()

    const devOrders = orders.filter(o => o.user.id === user.id)


    if (!user) {
        return null
    }

    const handleCancelOrder = (order) => {
        const confirmed = window.confirm('Haluatko varmasti perua tilauksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    } 

    try {
      dispatch(endOrder(order))
      dispatch(updateUser({...user, subscriptionModel: 'none'}))
      notify('Poistettu onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma', 'error')
    }
    }

  return (
    <Container>
        <Typography>Nykyinen tilaustyyppi: {user.subscriptionModel}</Typography>
        <Typography sx={{ marginTop: '1rem', marginBottom: '1rem',
    textAlign: 'center', fontSize: '1.4rem', borderBottom: '1px solid white' }}>Tilaukseni</Typography>
        <Typography>Aktiiviset</Typography>
        {devOrders.length > 0 && devOrders.filter(o => o.isActive).map(o => (
            <Box key={o.id} sx={{ padding: '0.5rem', border: '1px solid white',
            borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <Typography>Premium tilaus, kuukausiveloitus 20€/kk</Typography>
                <Typography>Tila: {o.isActive ? 'Aktiivinen' : 'Ei-aktiivinen'}</Typography>
                <Typography>Tilattu: {o.orderDate.split('T')[0]}</Typography>
                <Button sx={{ color: 'red' }} onClick={() => handleCancelOrder(o)}>Lopeta tilaus</Button>
            </Box>
        ))}
        <Typography>Tilaushistoria</Typography>
        {devOrders.length > 0 && devOrders.filter(o => !o.isActive).map(o => (
            <Box key={o.id} sx={{ padding: '0.5rem', border: '1px solid white',
            borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <Typography>Premium tilaus, kuukausiveloitus 20€/kk</Typography>
                <Typography>Tila: {o.isActive ? 'Aktiivinen' : 'Ei-aktiivinen'}</Typography>
                <Typography>Tilattu: {o.orderDate.split('T')[0]}</Typography>
                <Typography>Lopetettu: {o.endDate ? o.endDate.split('T')[0] : 'Virhe tiedon hakemisessa' }</Typography>
            </Box>
        ))}
    </Container>
  )
}

export default DevOrders