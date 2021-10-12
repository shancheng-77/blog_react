import './App.css';
import Main from './componentd/main'
import Welcome from "./componentd/welcome";
import {Provider} from "react-redux";
import store from './store/index'
import React from "react";
// 配置路由

function App() {
  return (
      <Provider store={store}>
          <Main/>
      </Provider>
  );
}

export default App;
