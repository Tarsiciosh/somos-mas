import React from 'react'
import swal from 'sweetalert'
import { useEffect } from 'react'
const Gracias = () => {

    useEffect(() => {
       const mostrarAlerta = () => {
           swal({
               title: 'Muchas Gracias!',
               text: 'Su donación fue realizada con éxito!',
               icon: 'success',
               button: 'Aceptar'
           })
       }
       mostrarAlerta()
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default Gracias
