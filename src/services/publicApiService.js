import axios from "axios"

export const getOngApi = async (destinationRoute, id) => {
  const getApiById = `${destinationRoute}/${id}`
  const getApiByDestinationRoute = `${destinationRoute}`

  try {
    return await axios.get(id ? getApiById : getApiByDestinationRoute)
  } catch (error) {
    return error
  }
}

export const postOngApi = async (destinationRoute, body) => {
  const postApi = `${destinationRoute}`

  try {
    return await axios.post(postApi, body)
  } catch (error) {
    return error
  }
}

export const putOngApi = async (destinationRoute, id, body) => {
  const postApi = `${destinationRoute}/${id}`

  try {
    return await axios.put(postApi, body)
  } catch (error) {
    return error
  }
}

export const deleteOngApi = async (destinationRoute, id) => {
  const deleteApi = `${destinationRoute}/${id}`;

  try {
    return await axios.delete(deleteApi);
  } catch (error) {
    return error;
  }
}

