import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path = '/' component={Main} />
      <Route path = '*' component={Main} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);