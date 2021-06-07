import { Redirect, Route, Switch } from 'react-router-dom'
import React, { useContext, Suspense } from 'react';
import AuthContext from './store/AuthContext';
import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner';
import classes from './App.module.css';
require('dotenv').config()
const LoginPage = React.lazy(() => import('./pages/LoginPage'))
const UserPage = React.lazy(() => import('./pages/UserPage'))
const InvoicePage = React.lazy(() => import('./pages/InvoicePage'))
const SideBar = React.lazy(() => import('./components/UI/Sidebar/Sidebar'))
const HomePage = React.lazy(() => import('./pages/HomePage'))
function App() {
  const ctx = useContext(AuthContext);
  return (
    <>
      <Suspense fallback={
        <div className={classes.centered}>
          <LoadingSpinner />
        </div>
      }>
        {ctx.token && <SideBar />}
        <Switch>
          <Route path="/" exact>
            {ctx.token && ctx.isValid() ? <Redirect to="/home" /> : <LoginPage />}
          </Route>
          <Route path="/home" exact>
            {!ctx.token || !ctx.isValid() ? <Redirect to="/" /> : <HomePage />}
          </Route>
          <Route path="/invoice/:id" >
            {!ctx.token || !ctx.isValid() ? <Redirect to="/" /> : <InvoicePage />}
          </Route>
          <Route path="/invoice/:id" >
            {!ctx.token || !ctx.isValid() ? <Redirect to="/" /> : <InvoicePage />}
          </Route>
          <Route path="/profile" exact>
            {!ctx.token || !ctx.isValid() ? <Redirect to="/" /> : <UserPage />}
          </Route>
          <Route path="*">
            {ctx.token && ctx.isValid() ? <Redirect to="/home" /> : <LoginPage />}
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
