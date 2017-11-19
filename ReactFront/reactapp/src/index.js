import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {compose, applyMiddleware, createStore} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import reduxReset from 'redux-reset';
import allReducers from './reducers';

import Cart from './components/cart';
//import AuthorizedRoute from './components/AuthorizedRoute';
//import UnAuthorizedRoute from './components/UnAuthorizedRoute';

import {MuiThemeProvider} from 'material-ui/styles';

const enHanceCreateStore = compose(
    reduxReset(),
    autoRehydrate(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && 
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  )(createStore)
const store = enHanceCreateStore(allReducers)

//persistStore(store);

persistStore(store, {}, () => {
    ReactDOM.render(    
        <Provider store = {store}>
            <MuiThemeProvider>
                <BrowserRouter> 
                    <Cart />
                </BrowserRouter>
            </MuiThemeProvider>
        </Provider>
    , 
    document.getElementById('root')
    );
})
registerServiceWorker();

