import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Companies from './views/Companies';
import CompanyDetail from './views/CompanyDetail';
import Login from './views/Login';
import NotFound from './views/NotFound';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Companies} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/companies/:id" component={CompanyDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}
