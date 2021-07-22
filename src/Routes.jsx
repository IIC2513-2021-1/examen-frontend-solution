import React from 'react';
import {
  Redirect, Route, Switch, useLocation,
} from 'react-router-dom';
import Layout from './components/Layout';
import AuthContextProvider from './contexts/AuthContextProvider';
import OptionContextProvider from './contexts/OptionContextProvider';
import useAuth from './hooks/useAuth';
import Companies from './views/Companies';
import CompanyDetail from './views/CompanyDetail';
import Login from './views/Login';
import NotFound from './views/NotFound';

function Routes() {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    const referrer = `${location.pathname}${location.search}${location.hash}`;
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Redirect to={{ pathname: '/login', state: { referrer } }} />
      </Switch>
    );
  }

  return (
    <Layout>
      <Switch>
        <Redirect
          from="/login"
          to={location.state?.referrer || '/'}
        />
        <Route exact path="/" component={Companies} />
        <Route exact path="/companies/:id" component={CompanyDetail} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default function RoutesWrapper() {
  return (
    <AuthContextProvider>
      <OptionContextProvider>
        <Routes />
      </OptionContextProvider>
    </AuthContextProvider>
  );
}
