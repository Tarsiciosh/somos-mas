# Ong Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Alert ##

This is the alert function and it is located in /service/alert.js

import Swal from 'sweetalert2'

export const alert = async (title, text, icon, confirmButtonText) => {
await Swal.fire({
title,
text,
icon,
confirmButtonText
})
}

#### to use this function, please do the following

. import { alert } from './service/alert'
. This function receives 4 parameters:
	1.title (for example: 'Muchas gracias!', 'Acceso Denegado')
	2.text (for example: 'Su donación fue realizada con éxito!', 'Para ingresar debe estar registrado')
	3.icon ('success', 'error' or 'info')
	4.confirmButtonText (for example: 'Aceptar', 'Ok')

#### to view and add more configurations see documentation at <https://sweetalert2.github.io/#configuration>

#### Skeleton ####

This component shows a preview of a given item while the data is loading.

#### Usage ####

The component is designed to be used directly in your components. For instance:

{
    !data ? (
        <Skeleton variant="circular" width={210} height={118} />
    ) : (
        <img
            style={{
                width: 210,
                height: 118,
            }}
            alt={data.title}
            src={data.src}
        />
    );
}

#### Variants ####

By default the component variant is rectangular, but it can be modified by specifying the "variant" attribute. The component supports 1 shape variants.

<Skeleton variant="circular" />

#### Colors ####

You can customize the default color by adding the "bg" property whose value will be the color you want the "Skeleton" to have. You can add colors like in CSS, the component supports hexadecimal, rgb and per word colors.

### `Hexadecimal`

<Skeleton bg="#BB2D3B"/>

### `RGB`

<Skeleton bg="rgb(191,67,66)"/>

### `Per word.`

<Skeleton bg="red"/>

#### Size ####

You can customize the size of the skeleton according to your needs through the "width" and "height" properties. These properties admit relative measurements (in percentages) or absolute (in pixels)

<Skeleton variant="circular" width="40px" height="40px" />

<Skeleton variant="circular" width="100%" height="40%" />

You can also pass a number as a measure and the component will take it as an absolute measure (in pixels)

<Skeleton variant="circular" width={100} height={40}" />


#### Examples ####

You can reuse a layout by replacing its content with the "Skeleton" component according to your needs. In this way the user will have a preview of what is being loaded.

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
                        <Card.Body className="d-flex align-items-center justify-content-around">          
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




1.title (for example: 'Muchas gracias!', 'Acceso Denegado')
2.text (for example: 'Su donación fue realizada con éxito!', 'Para ingresar debe estar registrado')
3.icon ('success', 'error' or 'info')
4.confirmButtonText (for example: 'Aceptar', 'Ok')

#### to view and add more configurations see documentation at <https://sweetalert2.github.io/#configuration>

## Progress bar

This progress bar, can be used in any resource who neeed it.

In his own state we can change the start progress, changing the state called 'progress'.
We can also change the color, height & width, and transition's time in the file ProgressOng.css

## Spinner

The SpinnerOng component is used to interact with the user while waiting for the response to a request.

#### use useState to control the component
```jsx
import React, { useState } from 'react'
import { useEffect } from 'react'
import SpinnerOng from '../SpinnerOng'
import Home from '../Home'

useEffect(() => {
    const buscar = async() =>{
        const res = await getOngApi('http://ongapi.alkemy.org/api/news/620')
        titulo = await res.data.data.name
        if(titulo){
            setCargando(false)
        }
    }
    
    buscar()
    }, [])
    
    return (<>{ cargando ? <SpinnerOng/> : <div> <Home/> </div> }</>
    )
``` 
