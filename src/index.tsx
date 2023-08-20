import store , {AppStateType} from "./redux/redux-store";
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import React from 'react';
import {Provider} from "./StoreContext";

let rerenderEntireTree = (state: AppStateType) => {
    ReactDOM.render (
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter> ,
        document.getElementById ( 'root' )
    );
}
rerenderEntireTree ( store.getState () )
store.subscribe ( () => {
    let state = store.getState ()
    rerenderEntireTree ( state )
} )