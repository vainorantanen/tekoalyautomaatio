import { Container, Typography, Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import FeedPostCard from './FeedPostCard'

const FeedItems = () => {

    const feedPosts = useSelector(({feedPosts}) => feedPosts)

    if (!feedPosts || feedPosts.length === 0) {
        return <Typography>Ei yhtään postausta</Typography>
    }

  return (
    <Container>
        {feedPosts.map(post => (
            <Box key={post.id}>
                <FeedPostCard post={post}/>
            </Box>
        ))}
    </Container>
  )
}

export default FeedItems