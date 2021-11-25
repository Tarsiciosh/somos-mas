import React from 'react'
import PropTypes from 'prop-types';
import { Card, Row } from 'react-bootstrap'
import { Skeleton } from '../Skeleton';

export const LoadingList = ({quantity = 1}) => {
    
    const convertNumToArray = (num) => {
        const array = []
        for (let i = 0; i < num; i++) {
            array.push(i)
        }
        return array
    }

    return (
        <Row className="justify-content-center">  
            {
                convertNumToArray(quantity).map(item => (
                    <Card 
                        className="m-3 p-3 shadow"
                        key={item}
                    >
                        <Card.Body 
                            className="d-flex align-items-center justify-content-around "
                        >          
                            <Skeleton 
                                width="30%"
                            />
                            <Skeleton 
                                width="30%"
                            />
                            <Skeleton 
                                width="10%"
                                height="55%"
                                bg="#0B5ED7"
                            />
                            <Skeleton 
                                width="10%"
                                height="55%"
                                bg="#BB2D3B"
                            />
                        </Card.Body>
                    </Card>
                ))
            }
        </Row>
    )
}

LoadingList.propTypes = {
    quantity: PropTypes.number
}