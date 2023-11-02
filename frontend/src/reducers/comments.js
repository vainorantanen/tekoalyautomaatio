import commentsService from '../services/comments'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    set(state, { payload }) {
      return payload
    },
  },
})

const { set} = slice.actions

export const initializeComments = () => {
  return async dispatch => {
    const data = await commentsService.getAll()
    dispatch(set(data))
  }
}

export default slice.reducer