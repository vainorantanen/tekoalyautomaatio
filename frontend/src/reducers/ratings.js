import ratingService from '../services/ratings'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'ratings',
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

export const initializeRatings = () => {
  return async dispatch => {
    const data = await ratingService.getAll()
    dispatch(set(data))
  }
}

export const addRating = (object) => {
  return async dispatch => {
    const data = await ratingService.create(object)
    dispatch(add(data))
  }
}

export const updateRating= (object) => {
  return async dispatch => {
    const data = await ratingService.update(object)
    dispatch(alter(data))
  }
}

export const removeRating = (object) => {
    return async dispatch => {
      await ratingService.remove(object.id)
      dispatch(remove(object.id))
    }
  }

export default slice.reducer