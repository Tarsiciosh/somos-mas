import React from 'react'
import Placeholder from 'react-bootstrap/Placeholder'

export const Skeleton = ({
    width = '100%',
    height = "20px",
    variant,
    bg = "#C3C4C5",
    marginLeft = "1rem",
    marginRight = "1rem",
    marginTop = "0.5rem"
}) => {

    return (
        <Placeholder
            className={`
                placeholder-wave
                ${variant === 'circular' ? 'rounded-circle' : 'rounded'}
            `}
            style={{
                height: height,
                width: width,
                background: bg,
                marginLeft: marginLeft,
                marginRight: marginRight,
                marginTop: marginTop
            }}
            // bg={bg} 
            size="lg"
        />
    )
}
