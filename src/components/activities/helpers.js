import axios from 'axios'
import { ACTIVITIES } from '../../services/apiRest'

export const createActivity = async (values) => {
  try {
    const response = await axios.post(ACTIVITIES, {
      name: values.name,
      description: values.description,
      image: values.imageData
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const updateActivity = async (values, activity, imageUpdated) => { 
  var params = {
    name: values.name,
    description: values.description,
  }
  
  if (imageUpdated)
    params = {...params, image: values.imageData} 

  try {
    const response = await axios.put(`${ACTIVITIES}/${activity.id}`, 
     params
    )
    return response
  } catch (error) {
    console.log(error)
  }                 
}