import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';
import store from './store'
import { Provider } from 'react-redux';
import './style.css';

ReactDOM.render(
    <App />,
document.getElementById('root'));