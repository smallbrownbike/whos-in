import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Home from './components/Home'
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './components/Search'
import './index.css';

function getGroup(){
  return decodeURIComponent(window.location.pathname.slice(3))
}

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path = '*' render={(props) => (<Search {...props} group={getGroup()}/>)} />
      <Route exact path = '/' component={Home} />
      <Route path = '/b/' component={Main} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);