/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router'
import SpinnerOng from '../../SpinnerOng'
import { alert } from '../../../services/alert'
import { getNewsPublicApiId } from '../../../services/newsRequests'

const NewsDetail = () => {
    const [imgNew, setImgNew] = useState('')
    const [contentNew, setContentNew] = useState('')

    const {id} = useParams()

    const getData = async() =>{
        try {
            let res = await getNewsPublicApiId(id)
            setImgNew(res.data.data.image)
            setContentNew(res.data.data.content)
        } catch (error) {
            alert("Error 404","Esta novedad no existe","error","Ok")
        }
        
    }
    
    useEffect(() => {
       getData()
    }, [])

    return (
        <div>
            {
            !imgNew ? <SpinnerOng/>
            : <>
                <div>Aquí va el componente Titulo recibido por props</div>
                <div>
                    <div>
                        {imgNew && <img src={imgNew} alt='Imagen de una novedad'/>}
                    </div> 
                    <div>
                        {contentNew && <h4>{contentNew}</h4> }
                    </div> 
                </div>
            </>
            } 
        </div>
    )
}


export default NewsDetail;
