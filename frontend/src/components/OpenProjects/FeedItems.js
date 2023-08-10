import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'
import FeedPostCard from './FeedPostCard'
import { Link } from 'react-router-dom'

const FeedItems = () => {
    const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [])

  const projectPosts = useSelector(({ projectPosts }) => projectPosts)

  if (!projectPosts || projectPosts.length === 0) {
    return (
      <Container sx={{ marginTop: '6rem' }}>
        <Typography>Ei löytynyt yhtään ilmoitusta</Typography>
        <Button component={Link} to='/lisaailmoitus'>Lisää omasi!</Button>
      </Container>
    )
  }

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = projectPosts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Box>
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
            {currentPosts.map((post) => (
              <FeedPostCard key={post.id} post={post} />
            ))}
          </Box>
          {/* Pagination */}
          <Box className="pagination" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
            {Array.from({ length: Math.ceil(projectPosts.length / postsPerPage) }).map((_, index) => (
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