import { memo, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { Items, youtubeApi } from '@/API/youtube-api'
import { getIsAuth } from '@/components/Login/auth-selectors'
import { useAppSelector } from '@/redux/redux-store'

import s from './player.module.scss'

export const Player = memo(() => {
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
