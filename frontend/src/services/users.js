import axios from 'axios'
import storageService from './storage'
const baseUrl = '/api/users'


const getAllUsers = async () => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.get(baseUrl, { headers })
  return request.data
}

const create = async (object) => {
  const request = await axios.post(baseUrl, object)
  return request.data
}

const update = async (object) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.put(`${baseUrl}/${object.id}`, object, { headers })
  return request.data
}

const modifyDisabledState = async (object) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.put(`${baseUrl}/${object.id}/disable`, object, { headers })
  return request.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllUsers, create, update, modifyDisabledState }