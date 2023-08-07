let token = null

const STORAGE_KEY = 'loggedtekoalyUser'

const setUser = (user) => {
  // eslint-disable-next-line no-undef
  window.localStorage.setItem(
    STORAGE_KEY, JSON.stringify(user)
  )
  token = user.token
}

const getUser = () => {
  // eslint-disable-next-line no-undef
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }

  return null
}

const clearUser = () => {
  // eslint-disable-next-line no-undef
  localStorage.clear()
  token = null
}

const getToken = () => token

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  setUser, getUser, clearUser, getToken
}