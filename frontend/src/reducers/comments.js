import commentsService from '../services/comments'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'comments',
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

const { set, add } = slice.actions

export const initializeComments = () => {
  return async dispatch => {
    const data = await commentsService.getAll()
    dispatch(set(data))
  }
}

export const addComment = (object) => {
  return async dispatch => {
    const data = await commentsService.create(object)
    dispatch(add(data))
  }
}

export default slice.reducer