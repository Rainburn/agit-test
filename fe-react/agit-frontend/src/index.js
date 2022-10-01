import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import RoutePage from './pages/RoutePage'


import Board from './pages/Board';
import User from './pages/User';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));

let api_link = "http:/localhost:8000/api/customers"

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
