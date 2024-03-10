import { useEffect, useState } from 'react'

import { withProviders } from '@/app/providers/withProviders'
import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { Navbar } from '@/features/Navbar'
import { Preloader } from '@/features/Preloader/ui/Preloader'
import { getCollapsed } from '@/pages/Profile/selectors/profile-selector'
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
  const [isTable, setIsMobile] = useState(window.innerWidth <= 992)
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 992)
  }
  const collapsed = useAppSelector(getCollapsed)

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  if (!initialized) {
    return <Preloader fullscreen />
  }

  window.addEventListener('resize', handleResize)

  return (
    <Layout className={'layout'}>
      {!isTable && <Navigate />}
      <Layout className={'layoutContent'}>
        <Header />
        {isTable && collapsed && <Navbar />}
        <Routing />
        <FooterContent />
      </Layout>
    </Layout>
  )
}

export default withProviders(App)
