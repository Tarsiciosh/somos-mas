import React, { useEffect, useState } from 'react'
import './title.css'
import LazyImage from './LazyImage'
import { getNewsPublicApi } from '../services/newsRequests'

const Title = ({ urlImage, titleName }) => {
  const [defectImage, setDefectImage] = useState('')

  useEffect(() => {
    const search = async () => {
      const res = await getNewsPublicApi()
      const data = await res.data.data[0].image
      setDefectImage(data)
    }
    search()
  }, [urlImage])

  return (
    <div>
      <div className='section-title'>
        <LazyImage
          className='img-fondo'
          alt='imagen de fondo'
          src={urlImage === undefined ? defectImage : urlImage}
        />
        <h1 className='title'>{titleName}</h1>
      </div>
    </div>
  )
}

export default Title;
