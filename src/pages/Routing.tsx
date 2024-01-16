import { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import News from '@/features/News/News'
import Preloader from '@/features/Preloader/Preloader'
import Setting from '@/features/Setting/Setting'
import { Login } from '@/pages/Login/Login'
import { ResultStatus } from '@/pages/Result-status/ResultStatus'
import { theme } from 'antd'
import { Content } from 'antd/es/layout/layout'

const UsersPage = lazy(() =>
  import('@/components/Users/UsersPage').then(module => ({ default: module.UsersPage }))
)
const ChatPage = lazy(() =>
  import('@/pages/Chat/ChatPage').then(module => ({ default: module.ChatPage }))
)

const Profile = lazy(() =>
  import('@/pages/Profile/Profile').then(module => ({ default: module.Profile }))
)
const Video = lazy(() => import('@/pages/Video/Video').then(module => ({ default: module.Video })))

export const Routing = () => {
  const {
    token: { borderRadiusLG, colorBgContainer },
  } = theme.useToken()

  return (
    <Content
      style={{
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        boxShadow: '1px -2px 19px -1px rgba(34, 60, 80, 0.2)',
        margin: '24px 16px',
        minHeight: 280,
        padding: 24,
        position: 'relative',
      }}
    >
      <Switch>
        <Route exact path={'/'} render={() => <Redirect to={'/profile'} />} />
        <Route
          path={'/chat'}
          render={() => (
            <Suspense fallback={<Preloader content fullscreen={false} position={'absolute'} />}>
              <ChatPage />
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
              <UsersPage />
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
