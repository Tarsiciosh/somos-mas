import axios from 'axios'
import { TESTIMONIALS } from '../../services/apiRest'

export const createValueAtEndpoint = async (values) => {
  try {
    const response = await axios.post(TESTIMONIALS, {
      name: values.name,
      description: values.description,
      image: values.imageData
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const updateValueAtEndpoint = async (values, imageUpdated) => {
  var params = {
    name: values.name,
    description: values.description,
  }

  if (imageUpdated)
    params = { ...params, image: values.imageData }

  try {
    const response = await axios.put(`${TESTIMONIALS}/${values.id}`,
      params
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getValuesFromEndpoint = async () => {
  try {
    const response = await axios.get(TESTIMONIALS)
    return response.data
  } catch (error) {
    console.log(error)
  }
}