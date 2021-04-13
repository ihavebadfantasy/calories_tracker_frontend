import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import routes from './routes';
import NotFound from '../pages/NotFound';

const Navigation = () => {
  return (
    <div>
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.notFound} component={NotFound} />
        <Route>
          <Redirect to={routes.notFound} />
        </Route>
      </Switch>
    </div>
  );
}

export default Navigation;
