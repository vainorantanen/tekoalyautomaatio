import { Box, Container, Typography, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeCustomerSupportPost, updateCustomerSupportPost } from '../../reducers/customersupport'
import { useNotification } from '../../hooks'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { updateUserDisabledState } from '../../reducers/users'

const AdminPanel = () => {

    const user = useSelector(({user}) => user)
    const users = useSelector(({users}) => users)
    const supportRequests = useSelector(({customersupportPosts}) => customersupportPosts)

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5

    const notifyWith = useNotification()
  const dispatch = useDispatch()

    useEffect(() => {
        setCurrentPage(1)
      }, [])

      const filteredUsers = users.filter(u => u.username !== 'admin')

    if (!user || user.username !== 'admin') {
        return (
            <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
                <Typography>Error loading user</Typography>
            </Container>
        )
    }

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentUsers = filteredUsers.slice(indexOfFirstPost, indexOfLastPost)
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const handleDeleteCustomerSupportPost = (obj) => {
      const confirmed = window.confirm('Haluatko varmasti poistaa tämän?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
      try {
        dispatch(removeCustomerSupportPost(obj))
        notifyWith('Poistettu onnistuneesti', 'success')
      } catch (error) {
        notifyWith('Tarjouksen poisto epäonnistui', 'error')
      }
    }

    const handleMarkDone = (post) => {
      const state = post.isDone ? 'avoin' : 'tehty'
    const confirmed = window.confirm(`Haluatko varmasti asettaa tilaan: ${state}?`)
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
      try {
        dispatch(updateCustomerSupportPost({...post, isDone : !post.isDone  }))
        notifyWith('Päivitetty onnistuneesti', 'success')
      } catch (error) {
        notifyWith('Epäonnistui', 'error')
      }
    }

    const handleMarkImportant = (post) => {
      const state = post.isImportant ? 'ei tärkeä' : 'tärkeä'
    const confirmed = window.confirm(`Haluatko varmasti asettaa tilaan: ${state}?`)
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
      try {
        dispatch(updateCustomerSupportPost({...post, isImportant : !post.isImportant  }))
        notifyWith('Päivitetty onnistuneesti', 'success')
      } catch (error) {
        notifyWith('Epäonnistui', 'error')
      }
    }

    const handleDisableUser = (user) => {
      const state = user.disabled ? 'enabled' : 'disabled'
      const confirmed = window.confirm(`Haluatko varmasti asettaa käyttäjän tilaan: ${state}?`)
      if (!confirmed) {
        return // If the user clicks "Cancel," do nothing
      }
        try {
          dispatch(updateUserDisabledState({...user, disabled : !user.disabled  }))
          notifyWith('Päivitetty onnistuneesti', 'success')
        } catch (error) {
          notifyWith('Epäonnistui', 'error')
        }
    }

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
        <Typography sx={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '2rem' }}>Admin paneeli</Typography>
        <Typography sx={{ fontSize: '1.2rem', borderBottom: '1px solid white' }}>Hallinnoi alustan käyttäjiä</Typography>
        {currentUsers && currentUsers.length > 0 ? (
            currentUsers.map(u => (
                <Box sx={{ margin: '0.5rem', backgroundColor: 'white', color: 'black',
                padding: '0.5rem', borderRadius: '0.5rem' }} key={u.id}>
                  {u.disabled && (<Typography>Disabloitu</Typography>)}
                    <Typography sx={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Nimi {u.name}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row',
                 flexWrap: 'wrap', gap: '1rem' }}>
                    <Box>
                        <Typography>Käyttäjänimi: {u.username}</Typography>
                        <Typography>Email: {u.email}</Typography>
                        <Typography>Käyttäjätyyppi: {u.isDeveloper ? 'Kehittäjä' : 'Normaali'}</Typography>

                    </Box>
                    <Box>
                        <Typography>Avoimia postauksia: {u.projectPosts.length}</Typography>
                        <Typography>Feedposteja yhteensä: {u.feedPosts.length}</Typography>
                        <Typography>Portaalipostauksia: {u.portalPosts.length}</Typography>
                        <Typography>Blogeja: {u.blogs.length}</Typography>
                    </Box>
                    <Box>
                        <Typography>Annettuja arvosteluja: {u.givenRatings.length}</Typography>
                        <Typography>Saatuja arvosteluja: {u.ratings.length}</Typography>
                    </Box>
                    <Box>
                        <Typography>Hallinnoi</Typography>
                        <Typography><Button component={Link} to={`/users/${u.id}`}>Siirry profiiliin</Button></Typography>
                        {u.disabled ? (
                          <Typography><Button onClick={() => handleDisableUser(u)}>Enabloi käyttäjä</Button></Typography>
                        ) : (
                          <Typography><Button onClick={() => handleDisableUser(u)}>Disabloi käyttäjä</Button></Typography>
                        )}
                    </Box>
                </Box>
                </Box>
            ))
        ): (
            <Typography>Ei käyttäjiä alustalla</Typography>
        )}
         {/* Pagination */}
         <Box className="pagination" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
            {Array.from({ length: Math.ceil(filteredUsers.length / postsPerPage) }).map((_, index) => (
              <Button
                sx={{
                  backgroundColor: currentPage === index + 1 ? 'blue' : 'transparent',
                  color: currentPage === index + 1 ? 'white' : 'inherit',
                  ':hover': {
                    backgroundColor: currentPage === index + 1 ? 'blue' : '#8B8FFF',
                  },
                }}
                key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Button>
            ))}
          </Box>
          <Typography sx={{ fontSize: '1.2rem', borderBottom: '1px solid white' }}>Yhteydenotot asiakaspalveluun</Typography>
          {supportRequests && supportRequests.length > 0 ? (
            supportRequests.map(req => (
              <Box key={req.id} sx={{ margin: '0.5rem', backgroundColor: 'white', color: 'black',
              padding: '0.5rem', borderRadius: '0.5rem' }}>
                <Typography sx={{ fontSize: '1.3rem' }}>
                  {req.title} {req.isDone && (
                    <CheckCircleOutlineIcon />
                  )}
                  {req.isImportant && (
                    <PriorityHighIcon />
                  )}
                </Typography>
                {req.user && ( <Typography>{req.user.name}</Typography> )}
                <Typography>{req.email}</Typography>
                <Typography>{req.description}</Typography>
                {req.user && (
                  <Box>
                    <Button component={Link} to={`/users/${req.user.id}`} >Siirry profiiliin</Button>
                  </Box>
                )
                }
                <Button onClick={() => handleMarkImportant(req)}>{req.isImportant ? 'Merkitse ei-tärkeäksi' : 'Merkitse tärkeäksi'}</Button>
                <Button onClick={() => handleMarkDone(req)}>{req.isDone ? 'Merkitse tekemättömäksi' : 'Merkitse tehdyksi'}</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeleteCustomerSupportPost(req)}>Poista</Button>
              </Box>
            )
            )
          ): (
            <Box>
              <Typography>Ei yhteydenottopyyntöjä</Typography>
            </Box>
          )}
    </Container>
  )
}

export default AdminPanel