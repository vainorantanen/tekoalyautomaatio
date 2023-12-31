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

const updateProjectCompletionState = async (object) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.put(`${baseUrl}/${object.id}/updateProjectCompletionState`, object, { headers })
  return request.data
}

const sendTask = async (object) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.post(`${baseUrl}/sendProjectTask/${object.id}`, object, { headers })
  return request.data
}

const updateTask = async (project, task) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.put(`${baseUrl}/${project.id}/updateProjectTask/${task.id}`, task, { headers })
  return request.data
}

const removeTask = async (taskId, projectId) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.delete(`${baseUrl}/${projectId}/tasks/${taskId}`, { headers })
  return request.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, sendTask, updateTask, updateIsApprovedState, removeTask, updateProjectCompletionState }