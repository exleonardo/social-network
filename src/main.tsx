import { Provider } from 'react-redux'

import { createRoot } from 'react-dom/client'

import App from './app/App'
import store from './app/store/redux-store'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
