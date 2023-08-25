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
    remove(state, { payload }) {
      return state.filter(s => s.id !== payload)
    },
    alter(state, { payload }) {
      return state.map(s => s.id !== payload.id ? s : payload)
    },
  },
})

const { set, add, remove, alter } = slice.actions

export const initializeChats = () => {
  return async dispatch => {
    const data = await chatsService.getAll()
    dispatch(set(data))
  }
}

export const addChat = (object) => {
  return async dispatch => {
    const data = await chatsService.create(object)
    dispatch(add(data))
  }
}

export const updateChat = (object) => {
  return async dispatch => {
    const data = await chatsService.update(object)
    dispatch(alter(data))
  }
}

export const addMessageToChat = (id, content) => {
  return async dispatch => {
    const data = await chatsService.addmessage(id, content)
    dispatch(alter(data))
  }
}

export const removeChat = (object) => {
  return async dispatch => {
    await chatsService.remove(object.id)
    dispatch(remove(object.id))
  }
}

export default slice.reducer