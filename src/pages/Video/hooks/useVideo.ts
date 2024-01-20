import { useEffect, useState } from 'react'

import { Items, youtubeApi } from '@/API/youtube-api'
import { useAppSelector } from '@/app/store/redux-store'
import { getIsAuth } from '@/pages/Login/selectors/auth-selectors'

export const useVideo = () => {
  const [video, setVideo] = useState<Items[]>()
  const isAuth = useAppSelector(getIsAuth)

  useEffect(() => {
    youtubeApi.getVideos().then(res => {
      setVideo(res.data.items)
    })
  }, [])

  return { isAuth, video }
}
