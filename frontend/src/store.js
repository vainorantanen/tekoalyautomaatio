import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notification'
import userReducer from './reducers/user'
import usersReducer from './reducers/users'
import projectPostReducer from './reducers/projectPosts'
import devsPostReducer from './reducers/devsPosts'
import feedPostsReducer from './reducers/feedPosts'
import commentsReducer from './reducers/comments'
import portalPostsReducer from './reducers/portalPosts'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
    projectPosts: projectPostReducer,
    devsPosts: devsPostReducer,
    feedPosts: feedPostsReducer,
    comments: commentsReducer,
    portalPosts: portalPostsReducer
  }
})

export default store