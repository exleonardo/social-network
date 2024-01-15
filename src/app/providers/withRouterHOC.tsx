import { BrowserRouter } from 'react-router-dom'

export const withRouterHOC = (component: () => React.ReactNode) => () => (
  <BrowserRouter>{component()}</BrowserRouter>
)
