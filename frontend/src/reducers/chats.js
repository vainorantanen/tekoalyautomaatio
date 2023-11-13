import { createSlice } from '@reduxjs/toolkit'
import chatsService from '../services/chats'

const slice = createSlice({
  name: 'chats',
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

export const initializeChats = () => {
  return async dispatch => {
    const data = await chatsService.getAll()
    dispatch(set(data))
  }
}

export const addChat = (object) => {
  return async dispatch => {
    try {
    const data = await chatsService.create(object)
    dispatch(add(data))
  } catch (error) {
    return { error: error };
  }
  }
}

export const updateChat = (object) => {
  return async dispatch => {
    try {
      const data = await chatsService.update(object)
      dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const addMessageToChat = (id, content) => {
  return async dispatch => {
    try {
      const data = await chatsService.addmessage(id, content)
      dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const updateChatState = (data) => {
  return async dispatch => {
    try {
      dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export default slice.reducer