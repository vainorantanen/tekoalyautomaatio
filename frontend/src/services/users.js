import axios from 'axios'
import storageService from './storage'
const baseUrl = '/api/users'

const headers = {
  'Authorization': storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
}

const getAllUsers = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (object) => {
  const request = await axios.post(baseUrl, object)
  return request.data
}

const update = async (object) => {
  const request = await axios.put(`${baseUrl}/${object.id}`, object, { headers })
  return request.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllUsers, create, update }