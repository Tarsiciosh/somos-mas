import React from 'react'
import Loader from 'react-loader-spinner'

const SpinnerOng = () => {
    return (
        <div className='row d-flex justify-content-center mt-4'>
            <div className='col-2'>
                <Loader 
                    classname='d-flex'
                    type="BallTriangle"
                    color="#004182"
                    height={100}
                    width={135}
                />
            </div>
           
        </div>
    )
}
export default SpinnerOng
