import { ComponentType } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { AppStateType } from '../redux/redux-store'

type MapStateToProps = {
  isAuth: boolean
}
const mapStateToProps = (state: AppStateType): MapStateToProps => {
  return {
    isAuth: state.auth.isAuth,
  }
}

function withAuthRedirect<T>(Component: ComponentType<T>) {
  function RedirectComponent(props: MapStateToProps) {
    const { isAuth, ...restProps } = props

    if (!isAuth) {
      return <Redirect to={'/login'} />
    }

    return <Component {...(restProps as T)} />
  }

  const ConnectRedirectComponent = connect(mapStateToProps)(RedirectComponent)

  return ConnectRedirectComponent
}

export default withAuthRedirect
