import feedPostService from '../services/feedPosts'

import { createSlice } from '@reduxjs/toolkit'
import { notify } from './notification'

const slice = createSlice({
  name: 'feedPosts',
  initialState: [],
  reducers: {
    set(state, { payload }) {
      return payload
    },
    add(state, { payload }) {
      return state.concat(payload)
    },
    remove(state, { payload }) {
      return state.filter(s => s.id !== payload)
    },
    alter(state, { payload }) {
      return state.map(s => s.id !== payload.id ? s : payload)
    },
  },
})

const { set, add, remove, alter } = slice.actions

export const initializeFeedPosts = () => {
  return async dispatch => {
    const data = await feedPostService.getAll()
    dispatch(set(data))
  }
}

export const addFeedPost = (object) => {
  return async dispatch => {
    try {
    const data = await feedPostService.create(object)
    dispatch(add(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const updateFeedPost= (object) => {
  return async dispatch => {
    try {
    const data = await feedPostService.update(object)
    dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const markFeedPostInappropriate= (object) => {
  return async dispatch => {
    try {
    const data = await feedPostService.markInappropriate(object)
    dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const commentFeedPost = (id, comment) => {
  return async dispatch => {
    try {
    const data = await feedPostService.comment(id, comment)
    dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const likeFeedPost = (id) => {
  return async dispatch => {
    try {
      const data = await feedPostService.like(id);
      dispatch(alter(data));
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch(notify('Olet jo tykännyt tästä julkaisusta', 'error'))
        return error
      } else {
        throw error;
      }
    }
  }
}

export const disLikeFeedPost = (id) => {
  return async dispatch => {
    try {
    const data = await feedPostService.dislike(id)
    dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const removeCommentFromFeedPost = (id, comment) => {
  return async dispatch => {
    try {
    const data = await feedPostService.removeComment(id, comment)
    dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const removeFeedPost = (object) => {
  return async dispatch => {
    try {
    await feedPostService.remove(object.id)
    dispatch(remove(object.id))
    } catch (error) {
      return { error: error };
    }
  }
}

export default slice.reducer