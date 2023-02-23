import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
window.a_pages = {useremail : "star.hou@orderplus.com"}
root.render(<App data = {window.a_pages}/>);


