import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notification'
import userReducer from './reducers/user'
import usersReducer from './reducers/users'
import projectPostReducer from './reducers/projectPosts'
import devsPostReducer from './reducers/devsPosts'
import feedPostsReducer from './reducers/feedPosts'
import commentsReducer from './reducers/comments'
import portalPostsReducer from './reducers/portalPosts'
import ratingsReducer from './reducers/ratings'
import blogsReducer from './reducers/blogs'
import customerSupportReducer from './reducers/customersupport'
import ordersReducer from './reducers/orders'
import portalBidsReducer from './reducers/portalBids'
import formDataReducer from './reducers/formData'
import projectOffersReducer from './reducers/projectOffers'
import customerinfoReducer from './reducers/customerinfo'
import activeProjectsReducer from './reducers/activeProjects'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
    projectPosts: projectPostReducer,
    devsPosts: devsPostReducer,
    feedPosts: feedPostsReducer,
    comments: commentsReducer,
    portalPosts: portalPostsReducer,
    ratings: ratingsReducer,
    blogs: blogsReducer,
    customersupportPosts: customerSupportReducer,
    orders: ordersReducer,
    portalBids: portalBidsReducer,
    formData: formDataReducer,
    projectOffers: projectOffersReducer,
    customerInfos: customerinfoReducer,
    activeProjects: activeProjectsReducer
  }
})

export default store