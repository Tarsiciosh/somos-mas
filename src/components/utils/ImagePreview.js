import React from 'react'

export const ImagePreview = ({ url }) => {

  if (!url) {return null}

  return (
    <img alt='imagen' src={url} />
  )
}