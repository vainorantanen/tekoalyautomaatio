import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNotification } from '../../hooks'
import { Box, Button, Typography } from '@mui/material'
import { removeCommentFromFeedPost } from '../../reducers/feedPosts'

const CommentSection = () => {
    const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [])

    const id = useParams().id

    const dispatch = useDispatch()
    const notify = useNotification()
  const user = useSelector(({ user }) => user)
  const feedPost = useSelector(({ feedPosts }) => feedPosts.find(p => p.id === id))


  const handleCommentDelete = async (commentId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tämän kommentin?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      dispatch(removeCommentFromFeedPost(feedPost.id, commentId))
      notify('Poisto onnistui', 'success')
    } catch (error) {
      notify('Poisto epäonnistui', 'error')
    }
  }

  const commentsOnPost = feedPost.comments


    if (!feedPost || feedPost.comments.length === 0) {
        return(
        <Box>
            <Typography>Ei kommentteja</Typography>
        </Box>
        )    
}

const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentComments = commentsOnPost.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Box>
        {currentComments.map(comment => (
            <Box key={comment.id} sx={{ backgroundColor: 'white', color: 'black', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
                <Typography>{comment.commentorName}</Typography>
                <Typography>{comment.timeStamp.split('T')[0]}</Typography>
                <Typography>{comment.content}</Typography>
                {user && (user.id === comment.user || user.id === feedPost.user.id) ? (
                  <Button onClick={() => handleCommentDelete(comment.id)} sx={{ color: 'red' }}>Poista kommentti</Button>
                ): null}
            </Box>
        ))}
        {/* Pagination */}
          <Box className="pagination" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
            {Array.from({ length: Math.ceil(commentsOnPost.length / postsPerPage) }).map((_, index) => (
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
  )
}

export default CommentSection