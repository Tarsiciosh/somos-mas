import React from 'react';
import { Redirect, Route } from "react-router";
import FormularioEditarDatosOrganizacion from './FormEditarDatosOrganizacion';

let auth = false;

if (typeof (Storage) !== "undefined") {
    auth = "token" in localStorage;
} else {
    auth = null;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <>
            <Route {...rest}>{auth ? <MostrarDatosOrganizacion /> : <Redirect to="/backoffice/organization" />}</Route>
            <Route {...rest}>{auth ? <FormularioEditarDatosOrganizacion /> : <Redirect to="/backoffice/organization/edit" />}</Route>
        </>
    );
};

export default PrivateRoute;
