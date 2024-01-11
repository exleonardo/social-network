import React, { memo, useEffect, useState } from 'react'

import s from './player.module.scss'

export const Player = memo(() => {
  const [video, setVideo] = useState<Array<{ etag: string; id: string; kind: string }>>()

  useEffect(() => {
    fetch(
      'https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&access_token=AIzaSyBAnVumyQkzfxJwtEPfq1gN1Lueu7J06-s&key=AIzaSyBAnVumyQkzfxJwtEPfq1gN1Lueu7J06-s'
    )
      .then(res => {
        return res.json()
      })
      .then(res => {
        setVideo(res.items)
        console.log(res)
      })
  }, [])

  return (
    <div className={s.player}>
      {video?.map((el, index) => {
        return (
          <div key={index}>
            <iframe
              allowFullScreen
              height={315}
              src={`https://www.youtube.com/embed/${el.id}`}
              width={560}
            ></iframe>
          </div>
        )
      })}
    </div>
  )
})
