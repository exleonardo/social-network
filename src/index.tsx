import store from './redux/redux-store'
import ReactDOM from 'react-dom'
import { App } from './app/App'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

// let rerenderEntireTree = (state: AppStateType) => {
//
// }
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
// rerenderEntireTree ( store.getState () )
// store.subscribe ( () => {
//     let state = store.getState ()
//     rerenderEntireTree ( state )
// } )
