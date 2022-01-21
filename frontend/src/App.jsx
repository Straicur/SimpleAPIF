import React from 'react';
import './App.css';
import{Redirect} from "react-router-dom";
import { BrowserRouter as Router ,Switch, Route, } from 'react-router-dom';
import {Login} from './Login/Login';
import {Register} from './Register/Register';
import {AdminLogin} from './AdminLogin/AdminLogin';
import {AdminMain} from './AdminMain/AdminMain';
import {Main} from './Main/Main';
import {Page404} from "./Page404/Page404";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import {  useSelector } from 'react-redux';


function App() {
    const count = useSelector((state)=>state.token.token);
    console.log(count)
  return (
      <Router>
              <Switch>
                  <Route exact path="/login" render={()=> {
                      return (<Login/>)
                  }}/>
                  <Route exact path="/admin/login" render={()=> {
                      return (<AdminLogin/>)
                  }}/>
                  <Route exact path="/main" render={()=> {
                      return (<Main/>)
                  }}/>
                  <Route exact path="/admin/main" render={()=> {
                      return (<AdminMain/>)
                  }}/>
                  <Route exact path="/register" render={()=> {
                      return (<Register/>)
                  }}/>
                  <Route exact path="/" render={() => {
                      return (
                          count ==="" || count === undefined?
                              <Redirect to="/login" /> :
                              <Redirect to="/main" />
                      )
                    }}
                  /> 
                  <Route exact path="/admin/" render={() => {
                      return (
                          count ==="" || count === undefined?
                              <Redirect to="/admin/login" /> :
                              <Redirect to="/admin/main" />
                      )
                    }}
                  /> 
                  <Route component={Page404}

                  />

              </Switch>
      </Router>
  );
}
//----------------------------------------------------------------------------------------------------------------------

export default App;
