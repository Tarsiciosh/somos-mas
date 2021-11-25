import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function LazyImage({alt,src,className}) {
    return (
        <LazyLoadImage
            className={className}
            alt={alt}
            effect="blur"
            src={src} />
    )
}
