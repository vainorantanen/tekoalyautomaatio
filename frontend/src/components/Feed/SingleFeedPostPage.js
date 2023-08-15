import { Container, Typography, TextField, Button } from '@mui/material'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useNotification } from '../../hooks'
import CommentSection from './CommentSection'
import { commentFeedPost, likeFeedPost } from '../../reducers/feedPosts'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const SingleFeedPostPage = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const notifyWith = useNotification()

  const id = useParams().id

  const user = useSelector(({ user }) => user)
  const feedPost = useSelector(({ feedPosts }) => feedPosts.find(p => p.id === id))

  const handleComment = async () => {
    try {
      dispatch(commentFeedPost(feedPost.id, comment))
      notifyWith('Kommentti lisätty onnistuneesti', 'success')
      setComment('')
      
    } catch (error) {
      notifyWith('Kommentin lisäys epäonnistui', 'error')
    }
  }

  const handleLike = async () => {
    try {
      dispatch(likeFeedPost(feedPost.id));
      notifyWith('Tykkäys lisätty onnistuneesti', 'success');
    } catch (error) {
      notifyWith('Olet jo tykännyt tästä julkaisusta', 'error');
    }
  };
  

  if (!feedPost) {
    return (
      <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography component={Link} to={`/users/${feedPost.user.id}`} sx={{ marginBottom: '1rem',
      textDecoration: 'underline', color: 'white' }}>{feedPost.user.name}</Typography>
        <Typography sx={{
          whiteSpace: 'break-spaces'
        }}>{feedPost.description}</Typography>
      <Typography>{feedPost.likes.length} Tykkäystä</Typography>
      {user && (
        <Button onClick={handleLike}>Tykkää <ThumbUpIcon /></Button>
      )}
        {/*Kommenttiosio*/}
        <TextField
          id="comment"
          label="Kommentoi"
          required
          multiline
          fullWidth
          rows={2}
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          sx={{ marginBottom: '1rem', marginTop: '1rem' }}
        />
        <Button
          onClick={handleComment}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: 'blue',
            color: 'white',
            transition: 'transform 0.3s',
            marginTop: '1rem',
            marginBottom: '1rem',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)',
            },
          }}
        >
          Kommentoi
        </Button>
        <Typography sx={{ marginTop: '2rem', marginBottom: '2rem' }}>Kommentit</Typography>
        <CommentSection />
    </Container>
  )
}

export default SingleFeedPostPage