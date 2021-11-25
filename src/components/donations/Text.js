import React from 'react'

const Text = ({text}) => {
    return (
        <div className='text-start d-flex justify-content-center mt-4 mb-4'>
            <p className='col-4'>{text}</p>
        </div>
    )
}

export default Text
