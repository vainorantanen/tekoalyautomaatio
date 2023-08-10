import devsPostsService from '../services/devsPosts'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'devsPosts',
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

export const initializeDevsPosts = () => {
  return async dispatch => {
    const data = await devsPostsService.getAll()
    dispatch(set(data))
  }
}

export const addDevPost = (object) => {
  return async dispatch => {
    const data = await devsPostsService.create(object)
    dispatch(add(data))
  }
}

export const updateDevPost= (object) => {
  return async dispatch => {
    const data = await devsPostsService.update(object)
    dispatch(alter(data))
  }
}

export const commentDevPost = (id, comment) => {
  return async dispatch => {
    const data = await devsPostsService.comment(id, comment)
    dispatch(alter(data))
  }
}

export const removeDevPost = (object) => {
  return async dispatch => {
    await devsPostsService.remove(object.id)
    dispatch(remove(object.id))
  }
}

export default slice.reducer