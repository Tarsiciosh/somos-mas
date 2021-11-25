import React from 'react'
import { Card } from 'react-bootstrap';
import style from './CardComponent.module.css'
const CardComponent = ({ name, image, description }) => {
    return (
    
            <Card className={style.card}>
                {image ? <Card.Img className={style.image} src={image} alt={name} />    :
                    <Card.Img 
                    className={style.image}
                    src='https://cdn.dribbble.com/users/55871/screenshots/2158022/media/8f2a4a2c9126a9f265fb9e1023b1698a.jpg?compress=1&resize=400x300'
                     alt="no image available" />}

                <Card.ImgOverlay>
                    <div className={style.body}>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text></div>
                </Card.ImgOverlay>
            </Card>
       
    )
}

export default CardComponent
