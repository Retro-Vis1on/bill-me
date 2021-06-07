import classes from './App.module.css';
import { Redirect, Route, Switch } from 'react-router-dom'
import { useContext, Suspense, lazy } from 'react';
import AuthContext from './store/AuthContext'
import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner';
import SideBar from './components/UI/Sidebar/Sidebar';
require('dotenv').config()
const InvoicePage = lazy(() => import('./pages/InvoicePage'));
const UserPage = lazy(() => import('./pages/UserPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
function App() {
  const ctx = useContext(AuthContext);
  return (
    <>
      {ctx.token && <SideBar />}
      <Suspense fallback={<div className={classes.centeredDiv}>
        <LoadingSpinner />
      </div>}>
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
