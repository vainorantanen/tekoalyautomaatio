import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notification'
import { initializeUsers } from '../reducers/users'
import { initUser, clearUser } from '../reducers/user'
import { initializePosts } from '../reducers/projectPosts'
import { initializeDevsPosts } from '../reducers/devsPosts'
import { initializeFeedPosts } from '../reducers/feedPosts'
import { initializeComments } from '../reducers/comments'
import { initializePortalPosts } from '../reducers/portalPosts'
import { initializeRatings } from '../reducers/ratings'
import { initializeBlogs } from '../reducers/blogs'
import { initializeCustomerSupportPosts } from '../reducers/customersupport'
import { initializeOrders } from '../reducers/orders'
import { initializePortalBids } from '../reducers/portalBids'
import { initializeProjectOffers } from '../reducers/projectOffers'
import { initializeCustomerInfos } from '../reducers/customerinfo'
import { initializeActiveProjects } from '../reducers/activeProjects'

export const useNotification = () => {
  const dispatch = useDispatch()

  return (message, type = 'info')  => {
    dispatch(notify(message, type))
  }
}

export const useInitialization = () => {
  const dispatch = useDispatch()

  return ()  => {
    dispatch(initializeUsers())
    dispatch(initializePosts())
    dispatch(initializeDevsPosts())
    dispatch(initializeFeedPosts())
    dispatch(initializeComments())
    dispatch(initUser())
    dispatch(initializePortalPosts())
    dispatch(initializeRatings())
    dispatch(initializeBlogs())
    dispatch(initializeCustomerSupportPosts())
    dispatch(initializeOrders())
    dispatch(initializePortalBids())
    dispatch(initializeProjectOffers())
    dispatch(initializeCustomerInfos())
    dispatch(initializeActiveProjects())
  }
}

export const useClearUser = () => {
  const dispatch = useDispatch()

  return ()  => {
    dispatch(clearUser())
  }
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}