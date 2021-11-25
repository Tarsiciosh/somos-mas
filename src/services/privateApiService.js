import axios from "axios"

export const getToken = () => {
  const token = JSON.parse(localStorage.getItem('token'))

  return {
    "Authorization": `Bearer ${token}`
  }
}

export const patchOngApi = async (destinationRoute, id, body) => {
  const patchApiByDestinationRoute = `${destinationRoute}/${id}`

  try {
    return await axios.patch(patchApiByDestinationRoute, body, getToken())
  } catch (error) {
    return error
  }
}

export const postApi = async (body, destinationRoute) => {
  try {
    return await axios({
      method: 'POST',
      url: `${destinationRoute}`,
      data: body,
      headers: getToken()
    })
  } catch (error) {
    return error
  }
}

export const putPrivateOngApi = async (destinationRoute, id, body) => {
  const putApi = `${destinationRoute}/${id}`

  try {
    return await axios.put(putApi, body, {headers: getToken()})
  } catch (error) {
    return error
  }
}

export const deleteOngApi = async (destinationRoute, id) => {
  const deleteApi = `${destinationRoute}/${id}`;
  const auth = getToken();
  try {
    return await axios.delete(deleteApi, {headers: auth});
  } catch (error) {
    return error
  }
};

export const getPrivateOngApi = async (destinationRoute, id) => {
  const urlWhitId = `${destinationRoute}/${id}`
  const url = id ? urlWhitId : `${destinationRoute}`

  const headerAuthorization = getToken()

  return axios({
    method: 'GET',
    url: url,
    headers: {headerAuthorization}
  })
}
