import usersService from '../services/users'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    set(state, { payload }) {
      return payload
    },
  },
})

const { set } = slice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const data = await usersService.getAllUsers()
    dispatch(set(data))
  }
}

export default slice.reducer