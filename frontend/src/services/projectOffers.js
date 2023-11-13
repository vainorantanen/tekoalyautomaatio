import storageService from './storage'
import axios from 'axios'
const baseUrl = '/api/projectOffers'

const getAll = async () => {
    const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.get(baseUrl, { headers })
  return request.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }