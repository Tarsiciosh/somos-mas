import { getOngApi, postOngApi, putOngApi } from './publicApiService'

export const getActivities = async () => {
  return getOngApi ('http://ongapi.alkemy.org/api/activities')
}

export const getActivity = async (id) => {
  return getOngApi ('http://ongapi.alkemy.org/api/activities', id)
}

export const createActivity = async (values) => {
  const body = {
    name: values.name,
    description: values.description,
    image: values.imageData
  }
  return postOngApi('http://ongapi.alkemy.org/api/activities', body)
}

export const updateActivity = async (values, imageUpdated) => {
  var body = {
    name: values.name,
    description: values.description,
  }
  
  if (imageUpdated) //only if image must be updated!
    body = {...body, image: values.imageData} 

  return putOngApi ('http://ongapi.alkemy.org/api/activities', values.id , body)
}   

