import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  Typography,
  TextField
} from '@mui/material'
import { useSelector } from 'react-redux'
import FeedDevCard from './FeedDevCard'

const FeedItems = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [])

  const devs = useSelector(({users}) => users).filter(d => d.isDeveloper === true)

  const filteredUsers = devs.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by name
  );

  if (!devs || devs.length === 0) {
    return (
      <Container sx={{ marginTop: '6rem' }}>
        <Typography>Ei löytynyt yhtään kehittäjää</Typography>
      </Container>
    )
  }

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentDevs = filteredUsers.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Box>
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
          <TextField
            label="Hae kehittäjiä nimellä"
            variant="outlined"
            fullWidth
            sx={{ maxWidth: '40rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        {/* Right Column - Filtered posts */}
        <Box sx={{ flex: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            {/* Rendering the current page of filtered posts */}
            {currentDevs.length > 0 ? (
              currentDevs.map((dev) => (
              <FeedDevCard key={dev.id} dev={dev} />
            ))): (
              <Typography>Haullesi ei löytynyt yhtään kehittäjää</Typography>
            )}
          </Box>
          {/* Pagination */}
          <Box className="pagination" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
            {Array.from({ length: Math.ceil(devs.length / postsPerPage) }).map((_, index) => (
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
      </Box>
    </Box>
  )
}

export default FeedItems