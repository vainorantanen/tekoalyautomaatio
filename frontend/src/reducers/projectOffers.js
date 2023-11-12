

import { createSlice } from '@reduxjs/toolkit'
import projectOffers from '../services/projectOffers'

const slice = createSlice({
  name: 'projectOffers',
  initialState: [],
  reducers: {
    set(state, { payload }) {
      return payload
    },
  },
})

const { set } = slice.actions

export const initializeProjectOffers = () => {
  return async dispatch => {
    const data = await projectOffers.getAll()
    dispatch(set(data))
  }
}

export default slice.reducer