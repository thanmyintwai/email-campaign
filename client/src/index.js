import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import 'materialize-css/dist/css/materialize.min.css'

import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';
import reduxThunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Provider store={store} >
      <App />
      </Provider>
    </React.StrictMode>
  );

  console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY)
  console.log('Environment is ', process.env.NODE_ENV)