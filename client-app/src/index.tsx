import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css'
import './app/layout/styles.css'
import reportWebVitals from './reportWebVitals';
import {store, StoreContext} from "./app/stores/store";
import {RouterProvider} from "react-router-dom";
import {router} from "./app/router/Routes";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // Store context - make it available for the entire app
    <StoreContext.Provider value={store}>
        <RouterProvider router={router} />
    </StoreContext.Provider>

    // Beware - 'StrictMode' renders a component twice to detect any issues at runtime
    // It will cause a duplicate API calls (in the case if the call is made on the page load)
    // <React.StrictMode>
    // <App />
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
