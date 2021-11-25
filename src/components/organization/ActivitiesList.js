import React, { useEffect, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { getActivities } from "../../services/activities";

export const ActivitiesList = () => {

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        getActivities().then(response => {
            let datos = response.data;
            setActivities(datos);
        })
    }, []);

    return (
        <div>


            <Link to='/backoffice/activities/create'><button>crear actividad</button></Link>

            <table>
                {
                    activities.map(activity => {
                        return (
                            <tr>
                                <td><img src={activity.image} heigth='500px' width='500px' /></td>
                                <td>{activity.name}</td>
                                <td>{activity.created_at}</td>
                                <td><button>Editar</button></td>
                                <td><button>Eliminar</button></td>

                            </tr>)
                    })
                }
            </table>
        </div>
    )
}
