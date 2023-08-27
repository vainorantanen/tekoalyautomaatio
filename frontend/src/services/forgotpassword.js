import axios from 'axios'
const baseUrl = '/api/forgot-password'

const create = async (object) => {
  const request = await axios.post(baseUrl, object)
  return request.data
}

export default { create }