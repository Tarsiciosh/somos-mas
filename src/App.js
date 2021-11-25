import React, { useState } from 'react'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import PageNotFound from './components/utils/PageNotFound';
import backofficeRoutes from './components/routes/backofficeRoutes';
import publicRoutes from './components/routes/publicRoutes';
import LoginForm from './components/LoginForm';
import SidebarBackoffice from './components/backoffice/SidebarBackoffice'
import './components/backoffice/SidebarBackoffice.css'

function App() {
  const [classToggle, setClassToggle] = useState(false)
  let bodyClass = classToggle ? 'body m-auto body-pd' : 'body m-auto'

  const handleToggle = () => {
    setClassToggle(!classToggle)
  }
  const RutaPrivada = ({ component, path, ...rest }) => {
    if (localStorage.getItem('token')) {
      console.log('usuario autenticado')
      return <Route component={component} path={path} {...rest} />
    } else {
      return <Redirect to='/login' />
    }
  }

  return (
    <Router>
      <Switch>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
        >
          <Route path='/login' exact>
            <LoginForm />
          </Route>

          {publicRoutes.map(({ path, component }) => <Route exact path={path} component={component} />)}

          <>
            <SidebarBackoffice classToggle={classToggle} handleToggle={handleToggle} />
            <div className={bodyClass}>
              {backofficeRoutes.map(({ path, component }) => <RutaPrivada exact path={`/backoffice${path}`} component={component} />)}
            </div>
          </>

          <Route path="*">
            <PageNotFound />
          </Route>

        </AnimatedSwitch>
      </Switch>
    </Router>
  );
}

export default App;
