import customersupportService from '../services/customersupport'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'customersupportPosts',
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

export const initializeCustomerSupportPosts = () => {
  return async dispatch => {
    const data = await customersupportService.getAll()
    dispatch(set(data))
  }
}

export const addCustomerSupportPost = (object) => {
  return async dispatch => {
    try {
      const data = await customersupportService.create(object)
      dispatch(add(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const updateCustomerSupportPost= (object) => {
  return async dispatch => {
    try {
    const data = await customersupportService.update(object)
    dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const commentCustomerSupportPost = (id, comment) => {
  return async dispatch => {
    try {
    const data = await customersupportService.comment(id, comment)
    dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const removeCustomerSupportPost = (object) => {
  return async dispatch => {
    try {
    await customersupportService.remove(object.id)
    dispatch(remove(object.id))
    } catch (error) {
      return { error: error };
    }
  }
}

export default slice.reducer