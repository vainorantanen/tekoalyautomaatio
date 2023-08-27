import axios from 'axios'
const baseUrl = '/api/reset-password'

const create = async (object) => {
  const request = await axios.post(`${baseUrl}/${object.id}/${object.token}`, object)
  return request.data
}

export default { create }