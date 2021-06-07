import classes from './App.module.css';
import { Redirect, Route, Switch } from 'react-router-dom'
import { useContext, Suspense, lazy } from 'react';
import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner';
require('dotenv').config()
const InvoicePage = lazy(() => import('./pages/InvoicePage'));
const SideBar = lazy(() => import('./components/UI/Sidebar/Sidebar'));
const AuthContext = lazy(() => import('./store/AuthContext'))
const UserPage = lazy(() => import('./pages/UserPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
function App() {
  const ctx = useContext(AuthContext);
  return (
    <>
      <Suspense fallback={<div style={classes.divStyle}>
        <LoadingSpinner />
      </div>}>
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
