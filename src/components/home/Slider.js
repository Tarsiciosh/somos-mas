import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Carousel } from 'react-bootstrap'
import { SLIDES } from '../../services/apiRest';
import './slider.css'
import ReactHtmlParser from 'react-html-parser';
const Slider = () => {

    const [slidesState, setSlides] = useState([])

    const getSlides = async () => {
        var array = [];
        await axios.get(SLIDES).then(res => {
            const slides = res.data.data
            console.log(slides)
            for (let i = 0; i < 6 && i < slides.length; i++) {
                array.push(slides[i])
            }
            setSlides(slides)
        })
    }
    
    useEffect(() => {
        getSlides()
    }, [])

    return (
        <div className='contenedor-carousel'>
            <Carousel >
                {slidesState.map((slide) => {
                    return <Carousel.Item interval={5000} className='item-carousel'>
                        <img
                            className='image-slider'
                            src={slide.image}
                            alt={slide.name}
                            key={slide.id}
                        />
                        <Carousel.Caption>
                            <h3 className='title-slider'>{slide.name}</h3>
                            <div className='descripcion-slider'>{ReactHtmlParser(slide.description)}</div>
                        </Carousel.Caption>
                    </Carousel.Item>
                })}
            </Carousel>
        </div>
    )
}

export default Slider
