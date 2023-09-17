import usersService from '../services/users'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    set(state, { payload }) {
      return payload
    },
    add(state, { payload }) {
      return state.concat(payload)
    },
    alter(state, { payload }) {
      return state.map(s => s.id !== payload.id ? s : payload)
    },
  },
})

const { set, add, alter } = slice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const data = await usersService.getAllUsers()
    dispatch(set(data))
  }
}

export const addUser = (object) => {
  return async dispatch => {
    const data = await usersService.create(object)
    dispatch(add(data))
  }
}

export const updateUserDisabledState = (object) => {
  return async dispatch => {
    const user = await usersService.modifyDisabledState(object)
    dispatch(alter(user))
  }
}

export default slice.reducer