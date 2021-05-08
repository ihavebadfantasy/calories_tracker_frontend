import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import routes from './routes';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreateProfile from '../pages/CreateProfile';

const Navigation = () => {
  return (
    <div>
      <Switch>
        <Route exact path={routes.login} component={Login} />
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.notFound} component={NotFound} />
        <Route exact path={routes.register} component={Register} />
        <Route exact path={routes.createProfile} component={CreateProfile} />
        <Route>
          <Redirect to={routes.notFound} />
        </Route>
      </Switch>
    </div>
  );
}

export default Navigation;
