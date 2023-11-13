import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  Container,
} from '@mui/material'
import { useSelector } from 'react-redux'
import FeedPostCard from './FeedPostCard'
import { Link } from 'react-router-dom'

const FeedItems = () => {
  const [filter1, setFilter1] = useState('All')
  const [filter2, setFilter2] = useState('All')
  const [filter3, setFilter3] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [filter1, filter2, filter3])

  const projectPosts = useSelector(({ projectPosts }) => projectPosts).filter(p => p.isOpen)

  if (!projectPosts || projectPosts.length === 0) {
    return (
      <Container sx={{ marginTop: '6rem' }}>
        <Typography>Ei löytynyt yhtään ilmoitusta</Typography>
        <Button component={Link} to='/lisaailmoitus'>Lisää omasi!</Button>
      </Container>
    )
  }

  const filteredPosts = projectPosts
    .filter((post) => {
      // Filtering based on filter1
      if (filter1 === 'All' || (filter1 === 'other' && !['Kuluttajat', 'Yritykset tai yrittäjät', 'Sisäiset sidosryhmät'].includes(post.question1)) || filter1 === post.question1) {
        // Filtering based on filter2
        if (filter2 === 'All' || (filter2 === 'other' && !['Tiettyjä ohjelmistoja ja teknologioita valittu, jotka voivat rajoittaa projektia.'
        , 'Ohjelmistoa ja teknologioita valittu, mutta joustoa on', 'Ei rajoittavia tekijöitä'].includes(post.question2)) || filter2 === post.question2) {
        // Filtering based on filter3
          if (filter3 === 'All' || post.question3 === filter3) {
            return true
          }
        }
      }
      return false
    })
    .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))

  const numOfFilteredPosts = filteredPosts.length

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Container sx={{ marginTop: '4rem' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          '@media (min-width: 600px)': {
            flexDirection: 'row',
            alignItems: 'flex-start',
          },
        }}
      >
        {/* Left Column - Filtering options */}
        <Box sx={{ flex: 1, maxWidth: '15rem' }}>
          <Typography sx={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Suodata</Typography>
          <Typography sx={{ marginBottom: '1rem',}}>Hakutulokset: {numOfFilteredPosts}</Typography>
          <Typography>Kenelle nettisivusi on suunnattu?</Typography>
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
            <Select
              value={filter1}
              onChange={(e) => setFilter1(e.target.value)}
            >
              <MenuItem value="All">Kaikki</MenuItem>
              <MenuItem value="Kuluttajat">Kuluttajat</MenuItem>
              <MenuItem value="Yritykset tai yrittäjät">Yritykset tai yrittäjät</MenuItem>
              <MenuItem value="Sisäiset sidosryhmät">Sisäiset sidosryhmät</MenuItem>
              <MenuItem value="other">Muut</MenuItem>
            </Select>
          </FormControl>

          <Typography>Teknologiset rajoitteet</Typography>
          <FormControl variant="outlined" fullWidth sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <Select
              value={filter2}
              onChange={(e) => setFilter2(e.target.value)}
            >
              <MenuItem value="All">Ei mitään</MenuItem>
              <MenuItem value="Tiettyjä ohjelmistoja ja teknologioita valittu, jotka voivat rajoittaa projektia.">Tiettyjä ohjelmistoja ja teknologioita valittu, jotka voivat rajoittaa projektia.</MenuItem>
              <MenuItem value="Ohjelmistoa ja teknologioita valittu, mutta joustoa on">Ohjelmistoa ja teknologioita valittu, mutta joustoa on</MenuItem>
              <MenuItem value="other">Muut</MenuItem>
            </Select>
          </FormControl>

          <Typography>Sisällönhallintatyökalut</Typography>
          <FormControl variant="outlined" fullWidth sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <Select
              value={filter3}
              onChange={(e) => setFilter3(e.target.value)}
            >
              <MenuItem value="All">Ei tarvetta</MenuItem>
              <MenuItem value="Laaja CMS">Laaja CMS</MenuItem>
              <MenuItem value="Suppea CMS">Suppea CMS</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Right Column - Filtered posts */}
        <Box sx={{ flex: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1rem',
              borderRadius: '1rem',
            }}
          >
            {/* Rendering the current page of filtered posts */}
            {currentPosts.map((post) => (
              <FeedPostCard key={post.id} post={post} />
            ))}
          </Box>
          {/* Pagination */}
          <Box className="pagination" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
            {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }).map((_, index) => (
              <Button
                sx={{
                  backgroundColor: currentPage === index + 1 ? 'blue' : 'transparent',
                  color: currentPage === index + 1 ? 'white' : 'inherit',
                  ':hover': {
                    backgroundColor: currentPage === index + 1 ? 'blue' : 'lightblue',
                  },
                }}
                key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default FeedItems