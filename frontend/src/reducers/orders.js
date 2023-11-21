import ordersService from '../services/orders'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'orders',
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

export const initializeOrders = () => {
  return async dispatch => {
    const data = await ordersService.getAll()
    dispatch(set(data))
  }
}

export const addOrder = (object) => {
  return async dispatch => {
    try {
    const data = await ordersService.create(object)
    dispatch(add(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const endOrder = (object) => {
  return async dispatch => {
    try {
    const data = await ordersService.endorder(object)
    dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export default slice.reducer