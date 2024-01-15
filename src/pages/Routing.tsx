import { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Login } from '@/components/Login/Login'
import News from '@/components/News/News'
import { ResultStatus } from '@/components/Result/ResultStatus'
import Setting from '@/components/Setting/Setting'
import { Player } from '@/components/Video/Player'
import Preloader from '@/components/common/Preloader/Preloader'
import { theme } from 'antd'
import { Content } from 'antd/es/layout/layout'

const UsersPage = lazy(() =>
  import('@/components/Users/UsersPage').then(module => ({ default: module.UsersPage }))
)
const ChatPage = lazy(() =>
  import('@/components/Chat/ChatPage').then(module => ({ default: module.ChatPage }))
)

const ProfileMain = lazy(() =>
  import('@/components/Profile/ProfileMain').then(module => ({ default: module.ProfileMain }))
)

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
              <ProfileMain />
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
            <Suspense fallback={<Preloader content fullscreen position={'absolute'} />}>
              <Player />
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
