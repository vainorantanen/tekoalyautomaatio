import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notification'
import userReducer from './reducers/user'
import usersReducer from './reducers/users'
import projectPostReducer from './reducers/projectPosts'
import devsPostReducer from './reducers/devsPosts'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
    projectPosts: projectPostReducer,
    devsPosts: devsPostReducer
  }
})

export default store