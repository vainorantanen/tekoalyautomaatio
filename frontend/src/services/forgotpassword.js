import axios from 'axios'
const baseUrl = '/api/forgot-password'

const create = async (object) => {
  const request = await axios.post(baseUrl, object)
  return request.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { create }