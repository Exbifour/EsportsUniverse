import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { LocalizeProvider } from "react-localize-redux";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <LocalizeProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </LocalizeProvider>,
    document.getElementById('root')
);
