import axios from 'axios'
import storageService from './storage'
const baseUrl = '/api/projectposts'

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

const modifyAccept = async (targetId, offerId) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.put(`${baseUrl}/${targetId}/offerAccept/${offerId}`, { headers })
  return request.data
}

const remove = async (id) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  await axios.delete(`${baseUrl}/${id}`, { headers })
}

const makeoffer = async (id, content) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.post(`${baseUrl}/${id}/offers`, content, { headers })
  return request.data
}

const removeOffer = async (postId, offerId) => {
  const token = await storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  const headers = token ? { 'Authorization': token } : {}
  const request = await axios.delete(`${baseUrl}/${postId}/offers/${offerId}`, { headers })
  return request.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, remove, makeoffer, modifyAccept,
removeOffer }