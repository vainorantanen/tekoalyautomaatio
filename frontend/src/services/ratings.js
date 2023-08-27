import axios from 'axios'
import storageService from './storage'
const baseUrl = '/api/ratings'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (object) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.post(baseUrl, object, { headers })
  return request.data
}

const update = async (object) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.put(`${baseUrl}/${object.id}`, object, { headers })
  return request.data
}

const remove = async (id) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  await axios.delete(`${baseUrl}/${id}`, { headers })
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove, update }