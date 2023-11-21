import { createSlice } from '@reduxjs/toolkit'
import activeProjectService from '../services/activeProjects'

const slice = createSlice({
  name: 'activeProjects',
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

export const initializeActiveProjects = () => {
  return async dispatch => {
    const data = await activeProjectService.getAll()
    dispatch(set(data))
  }
}

export const addActiveProject = (object) => {
  return async dispatch => {
    try {
      const data = await activeProjectService.create(object)
      dispatch(add(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const addTask = (object) => {
  return async dispatch => {
    try {
      const data = await activeProjectService.sendTask(object)
      dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const updateTask = (activeProject, taskObject) => {
  return async dispatch => {
    try {
      const data = await activeProjectService.updateTask(activeProject, taskObject)
      dispatch(alter(data))
    } catch (error) {
      // Handle the error and return it for displaying on the frontend.
      return { error: error };
    }
  }
}

export const modifyProjectApprovedState = (project) => {
  return async dispatch => {
    try {
    const data = await activeProjectService.updateIsApprovedState(project)
    dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const modifyProjectCompletionState = (project) => {
  return async dispatch => {
    try {
    const data = await activeProjectService.updateProjectCompletionState(project)
    dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const removeTask = (taskId, projectId) => {
  return async dispatch => {
    try {
    const data = await activeProjectService.removeTask(taskId, projectId)
    dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export default slice.reducer