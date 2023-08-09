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
    const data = await projectPostService.create(object)
    dispatch(add(data))
  }
}

export const updatePost= (object) => {
  return async dispatch => {
    const data = await projectPostService.update(object)
    dispatch(alter(data))
  }
}

export const commentPost = (id, comment) => {
  return async dispatch => {
    const data = await projectPostService.comment(id, comment)
    dispatch(alter(data))
  }
}

export const removePost = (object) => {
  return async dispatch => {
    await projectPostService.remove(object.id)
    dispatch(remove(object.id))
  }
}

export default slice.reducer