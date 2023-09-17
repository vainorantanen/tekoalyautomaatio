import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  Typography,
  InputLabel,
  TextField, MenuItem, Select
} from '@mui/material'
import { useSelector } from 'react-redux'
import FeedPostCard from './FeedPostCard'
import { Link } from 'react-router-dom'

const FeedItems = () => {
  const [searchQuery, setSearchQuery] = useState('');
const [selectedType, setSelectedType] = useState('all');
    const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [])

  const devsPosts = useSelector(({ devsPosts }) => devsPosts)

  if (!devsPosts || devsPosts.length === 0) {
    return (
      <Container sx={{ marginTop: '6rem' }}>
        <Typography>Ei löytynyt yhtään ilmoitusta</Typography>
        <Button component={Link} to='/lisaailmoitus'>Lisää omasi!</Button>
      </Container>
    )
  }

  // Filtering logic
const filteredPosts = devsPosts.filter((post) => {
  // Filter by type if a type is selected, or show all if 'all' is selected
  if (selectedType !== 'all' && post.postType !== selectedType) {
    return false;
  }

  // Filter by search query (case-insensitive)
  return (
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
});

// Pagination logic
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Box>
      <Box sx={{ marginBottom: '1rem', textAlign: 'center' }}>
            <TextField
              label="Hae..."
              variant="outlined"
              fullWidth
              sx={{ maxWidth: '40rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
        </Box>
        <Container
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
        {/* left column - filtering options */}
        <Box sx={{ marginBottom: '1rem', flex: 1 }}>
          <InputLabel id="typeFilterLabel">Rajaa tyypin perusteella</InputLabel>
          <Select
            labelId="typeFilterLabel"
            id="typeFilter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <MenuItem value="all">Kaikki</MenuItem>
            <MenuItem value="normal">Tavalliset ilmoitukset</MenuItem>
            <MenuItem value="event">Tapahtuma</MenuItem>
            <MenuItem value="course">Koulutus tai kurssi</MenuItem>
          </Select>
        </Box>
        {/* Right Column - Filtered posts */}
        <Box sx={{ flex: 2, justifyContent: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1rem',
              minHeight: '50vh'
            }}
          >
            {/* Rendering the current page of filtered posts */}
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
              <FeedPostCard key={post.id} post={post} />
            )))
          : (
            <Typography sx={{ textAlign: 'center' }}>Ei ilmoituksia</Typography>
          )}
          </Box>
          {/* Pagination */}
          <Box className="pagination" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
            {Array.from({ length: Math.ceil(devsPosts.length / postsPerPage) }).map((_, index) => (
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
        </Box>
      </Container>
    </Box>
  )
}

export default FeedItems