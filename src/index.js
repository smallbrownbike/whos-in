import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import Main from './components/main';

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Main />
  </MuiThemeProvider>
);


ReactDOM.render(<App />, document.getElementById('root'));