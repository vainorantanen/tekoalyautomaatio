import projectPostService from '../services/projectPosts'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'projectPosts',
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

export const initializePosts = () => {
  return async dispatch => {
    const data = await projectPostService.getAll()
    dispatch(set(data))
  }
}

export const addPost = (object) => {
  return async dispatch => {
    try {
    const data = await projectPostService.create(object)
    dispatch(add(data))
    } catch (error) {
      return { error: error }
    }
  }
}

export const updatePost= (object) => {
  return async dispatch => {
    try {
    const data = await projectPostService.update(object)
    dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const makeOffer = (id, content) => {
  return async dispatch => {
    try {
    const data = await projectPostService.makeoffer(id, content)
    dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const modifyOfferApprovedState = (offerId, targetId) => {
  return async dispatch => {
    try {
    const data = await projectPostService.modifyAccept(targetId, offerId)
    dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const removOfferFromProjectPost = (offerId, targetId) => {
  return async dispatch => {
    try {
    const data = await projectPostService.removeOffer(targetId, offerId)
    dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const removePost = (object) => {
  return async dispatch => {
    try {
    await projectPostService.remove(object.id)
    dispatch(remove(object.id))
    } catch (error) {
      return { error: error };
    }
  }
}

export default slice.reducer