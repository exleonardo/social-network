import { useEffect } from 'react'

import { withProviders } from '@/app/providers/withProviders'
import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { Preloader } from '@/features/Preloader/ui/Preloader'
import { Routing } from '@/pages/Routing'
import { initializeApp } from '@/redux/app-reducer'
import { FooterContent } from '@/widgets/Footer/ui/Footer'
import { Header } from '@/widgets/Header'
import { Navigate } from '@/widgets/Navigate/ui/Navigate'
import { Layout } from 'antd'

import './styles/index.scss'

const App = () => {
  const initialized = useAppSelector(state => state.app.initialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  if (!initialized) {
    return <Preloader fullscreen />
  }

  return (
    <Layout className={'layout'}>
      <Navigate />
      <Layout style={{ background: 'inherit', border: 'none' }}>
        <Header />
        <Routing />
        <FooterContent />
      </Layout>
    </Layout>
  )
}

export default withProviders(App)
