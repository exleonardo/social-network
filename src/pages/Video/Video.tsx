import { memo, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { Items, youtubeApi } from '@/API/youtube-api'
import { useAppSelector } from '@/app/redux-store'
import { getIsAuth } from '@/components/auth-selectors'

import s from './video.module.scss'

export const Video = memo(() => {
  const [video, setVideo] = useState<Items[]>()
  const isAuth = useAppSelector(getIsAuth)

  useEffect(() => {
    youtubeApi.getVideos().then(res => {
      setVideo(res.data.items)
    })
  }, [])
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
