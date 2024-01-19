import { memo, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { Items, youtubeApi } from '@/API/youtube-api'
import { useAppSelector } from '@/app/store/redux-store'
import { getIsAuth } from '@/pages/Login/selectors/auth-selectors'

import s from '../style/index.module.scss'

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
