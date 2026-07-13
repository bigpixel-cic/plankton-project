import ReactPlayer from 'react-player'

export default function YouTube({ url }: { url: string }) {
  return <ReactPlayer src={url} className="min-w-full min-h-116 aspect-video" />
}
