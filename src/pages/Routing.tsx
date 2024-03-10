import { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { News } from '@/features/News/ui/News'
import { Preloader } from '@/features/Preloader/ui/Preloader'
import { Setting } from '@/features/Setting/ui/Setting'
import { Login } from '@/pages/Login'
import { ResultStatus } from '@/pages/Result-status/ui/ResultStatus'
import { Content } from 'antd/es/layout/layout'

import s from './routing.module.scss'

const Users = lazy(() =>
  import('@/pages/Users/ui/Users').then(module => ({ default: module.Users }))
)
const Chat = lazy(() => import('@/pages/Chat/ui/Chat').then(module => ({ default: module.Chat })))

const Profile = lazy(() =>
  import('@/pages/Profile/ui/Profile').then(module => ({ default: module.Profile }))
)
const Video = lazy(() =>
  import('@/pages/Video/ui/Video').then(module => ({ default: module.Video }))
)

export const Routing = () => {
  return (
    <Content className={s.content}>
      <Switch>
        <Route exact path={'/'} render={() => <Redirect to={'/profile'} />} />
        <Route
          path={'/chat'}
          render={() => (
            <Suspense fallback={<Preloader content fullscreen={false} position={'absolute'} />}>
              <Chat />
            </Suspense>
          )}
        />
        <Route
          path={'/profile/:userId?'}
          render={() => (
            <Suspense fallback={<Preloader content fullscreen={false} position={'absolute'} />}>
              <Profile />
            </Suspense>
          )}
        />
        <Route
          path={'/users'}
          render={() => (
            <Suspense fallback={<Preloader content fullscreen={false} position={'absolute'} />}>
              <Users />
            </Suspense>
          )}
        />
        <Route path={'/login'} render={() => <Login />} />
        <Route path={'/news'} render={() => <News />} />
        <Route
          path={'/video'}
          render={() => (
            <Suspense fallback={<Preloader content fullscreen={false} position={'absolute'} />}>
              <Video />
            </Suspense>
          )}
        />
        <Route path={'/setting'} render={() => <Setting />} />
        <Route
          path={'/unautorized'}
          render={() => (
            <ResultStatus
              buttonTitle={'Login'}
              status={'403'}
              subTitle={'Sorry, you are not authorized to access this page.'}
            />
          )}
        />
        <Route
          path={'*'}
          render={() => (
            <ResultStatus
              buttonTitle={'Back home'}
              status={'404'}
              subTitle={'Sorry, the page you visited does not exist.'}
            />
          )}
        />
      </Switch>
    </Content>
  )
}
