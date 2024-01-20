import { memo } from 'react'
import { Redirect } from 'react-router-dom'

import { useVideo } from '@/pages/Video/hooks/useVideo'

import s from '../style/index.module.scss'

export const Video = memo(() => {
  const { isAuth, video } = useVideo()

  if (!isAuth) {
    return <Redirect to={'/unautorized'} />
  }

  return (
    <div className={s.player}>
      {video?.map((el, index) => {
        return (
          <div className={s.video} key={index}>
            <iframe
              allowFullScreen
              height={180}
              src={`https://www.youtube.com/embed/${el.id}`}
              width={300}
            ></iframe>
          </div>
        )
      })}
    </div>
  )
})
