import React, { ComponentType } from 'react'

import Preloader from '../components/common/Preloader/Preloader'

type ComponentSuspenseType = {}

export function withSuspense<T>(Component: ComponentType<T>) {
  return (props: ComponentSuspenseType) => {
    return (
      <React.Suspense fallback={<Preloader />}>
        <Component {...(props as T)} />
      </React.Suspense>
    )
  }
}
