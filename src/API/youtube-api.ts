import axios from 'axios'

export const youtubeApi = {
  getVideos() {
    return axios.get<YoutubeRespons>(
      'https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&access_token=AIzaSyBAnVumyQkzfxJwtEPfq1gN1Lueu7J06-s&key=AIzaSyBAnVumyQkzfxJwtEPfq1gN1Lueu7J06-s'
    )
  },
}

type Items = {
  etag: string
  id: string
  kind: string
}

type YoutubeRespons = {
  etag: string
  items: Items[]
  kind: string
  nextPageToken: string
  pageInfo: PageInfo
}

type PageInfo = {
  resultsPerPage: number
  totalResults: number
}
