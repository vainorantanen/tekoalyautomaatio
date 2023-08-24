import portalPostsService from '../services/portalPosts'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'portalPosts',
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

export const initializePortalPosts = () => {
  return async dispatch => {
    const data = await portalPostsService.getAll()
    dispatch(set(data))
  }
}

export const addPortalPost = (object) => {
  return async dispatch => {
    const data = await portalPostsService.create(object)
    dispatch(add(data))
  }
}

export const updatePortalPost= (object) => {
  return async dispatch => {
    const data = await portalPostsService.update(object)
    dispatch(alter(data))
  }
}

export const makePortalOffer = (id, content) => {
  return async dispatch => {
    const data = await portalPostsService.makeoffer(id, content)
    dispatch(alter(data))
  }
}

export const modifyPortalOfferApprovedState = (offerId, targetId) => {
  return async dispatch => {
    const data = await portalPostsService.modifyAccept(targetId, offerId)
    dispatch(alter(data))
  }
}

export const removeOfferFromPortalPost = (offerId, targetId) => {
  return async dispatch => {
    const data = await portalPostsService.removeOffer(targetId, offerId)
    dispatch(alter(data))
  }
}

export const removePortalPost = (object) => {
  return async dispatch => {
    await portalPostsService.remove(object.id)
    dispatch(remove(object.id))
  }
}

export default slice.reducer