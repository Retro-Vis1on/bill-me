import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import InvoicePage from './pages/InvoicePage';
import { useContext } from 'react';
import AuthContext from './store/AuthContext';
import SideBar from './components/UI/Sidebar/Sidebar';
import UserPage from './pages/UserPage';
require('dotenv').config()
function App() {
  const ctx = useContext(AuthContext);
  return (
    <>
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
    </>
  );
}

export default App;
