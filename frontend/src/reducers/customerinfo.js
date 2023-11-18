import { createSlice } from '@reduxjs/toolkit'
import customerinfoService from '../services/customerinfo'

const slice = createSlice({
  name: 'customerInfos',
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

const { set, add, alter} = slice.actions

export const initializeCustomerInfos = () => {
  return async dispatch => {
    const data = await customerinfoService.getAll()
    dispatch(set(data))
  }
}

export const addCustomerInfo = (object) => {
  return async dispatch => {
    try {
      const data = await customerinfoService.create(object)
      dispatch(add(data))
    } catch (error) {
      // Handle the error and return it for displaying on the frontend.
      return { error: error };
    }
  }
}

export const addMessage = (object) => {
  return async dispatch => {
    try {
      const data = await customerinfoService.sendMessage(object)
      dispatch(alter(data))
    } catch (error) {
      // Handle the error and return it for displaying on the frontend.
      return { error: error };
    }
  }
}

export const updateMessage = (customerInfo, messageObject) => {
  return async dispatch => {
    try {
      const data = await customerinfoService.updateMessage(customerInfo, messageObject)
      dispatch(alter(data))
    } catch (error) {
      // Handle the error and return it for displaying on the frontend.
      return { error: error };
    }
  }
}

export default slice.reducer