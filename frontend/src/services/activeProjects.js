import axios from 'axios'
import storageService from './storage'
const baseUrl = '/api/activeprojects'

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

const updateIsApprovedState = async (object) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.put(`${baseUrl}/${object.id}/updateIsApprovedState`, object, { headers })
  return request.data
}

const sendTask = async (object) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.post(`${baseUrl}/sendProjectTask/${object.id}`, object, { headers })
  return request.data
}

const updateTask = async (customerInfo, messageObject) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.put(`${baseUrl}/${customerInfo.id}/updateProjectTask/${messageObject.id}`, messageObject, { headers })
  return request.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, sendTask, updateTask, updateIsApprovedState }