import { Box, Button, Container, Typography, Rating, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {  useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { markBlogInappropriate } from '../../reducers/blogs'
import { useNotification } from '../../hooks'
import ratingsService from '../../services/ratings'
import blogsService from '../../services/blogs'
import SendProjectRequestForm from '../ProjectManagement/SendProjectRequestForm'

const SingleDevPage = () => {
  const dispatch = useDispatch()
  const notifyWith = useNotification()

  const [ devRatings, setDevRatings ] = useState([])
  const [ devBlogs, setDevBlogs ] = useState([])

  const id = useParams().id

  const user = useSelector(({user}) => user)
  const dev = useSelector(({ users }) => users).find(p => p.id === id)

  useEffect(() => {
    const fetchData = async () => {
      if (dev) {
        try {
          const ratings = await ratingsService.getAll();
          const filteredRatings = ratings.filter((r) => r.targetUser.id === dev.id);
          setDevRatings(filteredRatings);

          const blogs = await blogsService.getAll();
          const filteredBlogs = blogs.filter((b) => b.user.id === dev.id);
          setDevBlogs(filteredBlogs);
        } catch (error) {
          // Handle error, e.g., set an error state
        }
      }
    };

    fetchData();
  }, [dev]);

  const handleInappropriate = async (blogId)  => {
    const confirmed = window.confirm(`Haluatko varmasti ilmoittaa tämän julkaisun epäasiallisena?`)
          if (!confirmed) {
            return // If the user clicks "Cancel," do nothing
          }

          try {
            const result = await dispatch(markBlogInappropriate(blogId));
            if (result && result.error) {
              notifyWith('Ilmeni jokin ongelma', 'error');
              return
            } else {
              notifyWith('Ilmoitettu onnistuneesti', 'success');
            }
          } catch (error) {
            notifyWith('Ilmeni jokin ongelma', 'error');
          }
  }

  if (!dev) {
    return (
      <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Box>
          <Typography sx={{ marginBottom: '1rem', fontSize: '1.3rem', textAlign: 'center',
           }} >{dev.name}</Typography>
          <Box sx={{ color: 'black', backgroundColor: 'white', borderRadius: '0.5rem', paddingBottom: '0.5rem',
        paddingLeft: '0.5rem', paddingRight: '0.5rem', marginBottom: '1rem' }}>
            <Typography sx={{
              whiteSpace: 'break-spaces',
              marginTop: '3rem' 
            }}>{dev.description}</Typography>
          </Box>
          <Typography>Tietoa kehittäjästä</Typography>
          <Typography>Sähköposti: {dev.email}</Typography>
          <Divider sx={{ my: 4 }} />
          <Typography>Haluatko aloittaa projektin kehittäjän kanssa?</Typography>
          <Typography sx={{ fontSize: '0.8rem' }}>Hyväksytyille projekteille tarjoamme projektinhallintapaneelin!</Typography>
          <SendProjectRequestForm developer={dev}/>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ marginBottom: '1rem'}}>
            <Typography sx={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Kehittäjän blogit</Typography>
            {devBlogs.length > 0 ?
              devBlogs.map(b => (
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
          <Box sx={{ marginTop: '2rem', borderTop: '1px solid white' }}>
            <Typography sx={{ fontSize: '1.3rem' }}>Arvostelut</Typography>
            {user && user.id !== dev.id ? (
              <Typography>Oletko tehnyt yhteistyötä tämän kehittäjän kanssa?<Button component={Link} to={`/anna-arvostelu/${dev.id}`}>Anna arvostelu</Button></Typography>
            ): null}
            {
            devRatings.filter(r => r.showOnDevProfile).length > 0 ? (
              // Calculate the average of devratings scores
              (() => {
                const filteredRatings = devRatings.filter(r => r.showOnDevProfile);
                const totalScore = filteredRatings.reduce((acc, rating) => acc + rating.score, 0);
                const ratingAverage = totalScore / filteredRatings.length;

                return (
                  <Box>
                    <Typography>Kokonaisarvoasana</Typography>
                    <Rating value={ratingAverage} readOnly precision={0.5} max={5} />
                  </Box>
                );
              })()
            ) : null
          }
            {devRatings.filter(r => r.showOnDevProfile).length > 0 ? (
              devRatings.filter(r => r.showOnDevProfile).map(rating => (
                <Box key={rating.id} sx={{ margin: '1rem', borderRadius: '0.5rem', padding: '1rem', 
                backgroundColor: 'white', color: 'black' }}>
                  <Rating value={rating.score} readOnly precision={1} max={5} />
                  <Typography sx={{ fontSize: '0.8rem' }}>{rating.user.name}</Typography>
                  <Typography sx={{ fontSize: '0.8rem' }}>{rating.timeStamp.split('T')[0]}</Typography>
                  <Typography>{rating.description}</Typography>
                  </Box>
              ))
            ): (
              <Typography>Ei vielä arvosteluja</Typography>
            )}
          </Box>
        </Box>
    </Container>
  )
}

export default SingleDevPage