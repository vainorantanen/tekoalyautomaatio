import axios from 'axios'
import storageService from './storage'
const baseUrl = '/api/customerinfo'

const getAll = async () => {
    const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.get(baseUrl, { headers })
  return request.data
}

const create = async (object) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.post(baseUrl, object, { headers })
  return request.data
}

const sendMessage = async (object) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.post(`${baseUrl}/sendMessage/${object.id}`, object, { headers })
  return request.data
}

const updateMessage = async (customerInfo, messageObject) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.put(`${baseUrl}/${customerInfo.id}/updateMessage/${messageObject.id}`, messageObject, { headers })
  return request.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, sendMessage, updateMessage }