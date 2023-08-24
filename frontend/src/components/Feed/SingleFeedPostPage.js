import { Container, Typography, TextField, Button } from '@mui/material'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useNotification } from '../../hooks'
import CommentSection from './CommentSection'
import { commentFeedPost, disLikeFeedPost, likeFeedPost } from '../../reducers/feedPosts'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

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
    if (feedPost.likes.includes(user.id)) {
      notifyWith('Olet jo tykännyt tästä julkaisusta', 'error');
      return
    }

    try {
      dispatch(likeFeedPost(feedPost.id));
      notifyWith('Tykkäys lisätty onnistuneesti', 'success');
    } catch (error) {
      notifyWith('Olet jo tykännyt tästä julkaisusta', 'error');
    }
  };

  const handleDisLike = async () => {
    try {
      dispatch(disLikeFeedPost(feedPost.id));
      notifyWith('Tykkäys poistettu onnistuneesti', 'success');
    } catch (error) {
      notifyWith('VIrhe tykkäyksen poistossa', 'error');
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
    <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem'}}>
        <Typography component={Link} to={`/users/${feedPost.user.id}`} sx={{ marginBottom: '1rem',
      textDecoration: 'underline', color: 'white' }}>{feedPost.user.name}</Typography>
        <Typography sx={{
          whiteSpace: 'break-spaces',
          marginBottom: '2rem'
        }}>{feedPost.description}</Typography>
      <Typography>{feedPost.likes.length} Tykkäystä</Typography>
      {user && !feedPost.likes.includes(user.id) ? (
        <Button onClick={handleLike}>Tykkää <ThumbUpIcon /></Button>
      ): <Button onClick={handleDisLike}>En tykkääkään <ThumbDownIcon /></Button>}
        {/*Kommenttiosio*/}
        <TextField
          id="comment"
          label="Kommentoi"
          required
          multiline
          fullWidth
          rows={1}
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