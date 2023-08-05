import axios from 'axios'
const baseUrl = '/api/contacts'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (object) => {
  const request = await axios.post(baseUrl, object)
  return request.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create }