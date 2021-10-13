import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Welcome from "./componentd/welcome";
import reportWebVitals from './reportWebVitals';
import axios from "axios";

// 设置路由
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom'
ReactDOM.render(
  <>
    <Router>
        <Switch>
            <Route path="/welcome" render={routerProps => <Welcome {...routerProps}/>}/>
            <Route path="/main" render={routerProps => <App {...routerProps}/>}/>
            <Redirect path="/" to="/welcome" />
        </Switch>
        <div style={{display:'none'}}>
            {
                axios.defaults.baseURL='http://localhost:4000'
            }
            {
                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
            }

            }
        </div>
    </Router>

  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
