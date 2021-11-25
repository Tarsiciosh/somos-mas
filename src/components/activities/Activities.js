import React, { useEffect } from 'react'
import { alert } from '../../services/alert'
import { ACTIVITIES } from '../../services/apiRest'
import { getOngApi } from '../../services/publicApiService'
import LazyImage from '../LazyImage'
import SpinnerOng from '../SpinnerOng'
import {ImagePreview} from '../utils/ImagePreview'

import { useSelector, useDispatch } from 'react-redux'
import { getActivitiesInfo } from '../../features/activities/activitiesSlice'


export const Activities = () => {

  const activities = useSelector ((state) => state.activities.fetched)
  const status = useSelector(state => state.activities.status)
  const dispatch = useDispatch()
  
  useEffect(() => {  
    if (status === 'idle') {
      dispatch(getActivitiesInfo())
    }
  } ,[status, dispatch])

  const renderedActivities = activities.map(activity => (
    <div className="card" style={{margin: '5rem'}} key={activity.id}>
      <h1>{activity.name}</h1>
      <div>
        <LazyImage alt="Imagen preview de actividad" src={activity.image}  />
        <div dangerouslySetInnerHTML={{
          __html: activity.description
        }}>
        </div>
      </div>
    </div>
  ))

  let content 

  if (status == 'loading') {
    content = "cargando..." 
  } else if (status == 'succeded') {
    content = renderedActivities
  }

  return (
    <>
      <h1>Actividades</h1>
      {activities.length !== 0 ? renderedActivities:<SpinnerOng/> }
    </>
  )
}
