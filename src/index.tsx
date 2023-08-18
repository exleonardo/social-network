import {RootStateType} from './redux/store';
import store from "./redux/redux-store";
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import React from 'react';

let rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App store={store} state={state} dispatch={store.dispatch.bind(store)}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

rerenderEntireTree(store.getState())
store.subscribe(()=>{
    let state = store.getState()
    rerenderEntireTree(state)
})