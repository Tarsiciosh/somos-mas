import React, { useEffect, useState} from 'react'
import Title from '../../Title'
import { useParams } from 'react-router-dom'
import SpinnerOng from '../../SpinnerOng'
import { getOngApi } from '../../../services/publicApiService'
import { ACTIVITIES } from '../../../services/apiRest'
import { alert } from '../../../services/alert'

const ActivitiesDetail = () => {
    const [isLoaded, setLoad] = useState(true)
    const [activity, setActivity] = useState({})

    let { id } = useParams();

    const fetchActivities = async (param) => {
        try {
        await getOngApi(ACTIVITIES,param)
            .then(res => setActivity(res.data.data));
        setLoad(false)
         
        } catch (error) {
            alert("Error 404","Esta actividad no existe","error","Ok")
        }
        
        
    }
    useEffect(() => {
        fetchActivities(id)
    }, [])

    return (

        <div>
            {
                isLoaded ? <SpinnerOng/>

                    :
                    <div>
                        <Title urlImage={activity.image} titleName={activity.name} />
                        <div>
                            <h4>Categoría: {activity.slug ? activity.slug : 'No especificado'}</h4>
                            <h6>{activity.description ? activity.description : 'No especificado'}</h6>

                        </div>
                    </div>
            }

        </div>
    )
}

export default ActivitiesDetail
