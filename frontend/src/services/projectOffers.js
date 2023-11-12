import storageService from './storage'
import axios from 'axios'
const baseUrl = '/api/projectOffers'

const getAll = async () => {
    const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.get(baseUrl, { headers })
  return request.data
}

export default { getAll }