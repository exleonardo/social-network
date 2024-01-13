import { memo, useEffect, useState } from 'react'

import { youtubeApi } from '@/API/youtube-api'

import s from './player.module.scss'

export const Player = memo(() => {
  const [video, setVideo] = useState<Array<{ etag: string; id: string; kind: string }>>()

  useEffect(() => {
    youtubeApi.getVideos().then(res => {
      setVideo(res.data.items)
    })

    return () => {}
  }, [])

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
