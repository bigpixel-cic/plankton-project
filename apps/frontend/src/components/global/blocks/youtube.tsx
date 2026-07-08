import { YouTubeVideoBlock } from '@/payload-types'
import ReactPlayer from 'react-player'

export default function YouTube({ url }: YouTubeVideoBlock) {
  if (!url) return null
  return <ReactPlayer src={url} />
}
