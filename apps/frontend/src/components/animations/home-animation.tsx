'use client'
import type { Media } from '@/payload-types'
import { useRive, useViewModelInstanceBoolean } from '@rive-app/react-webgl2'

type Animation =
  | {
      title?: string | null
      stateMachine?: string | null
      riveFile?: Media | null
    }
  | undefined

export default function HomeAnimation({ animation }: { animation: Animation }) {
  const { riveFile, stateMachine } = animation || {}

  const { rive, RiveComponent } = useRive({
    src: riveFile?.url || '',
    stateMachines: stateMachine ?? undefined,
    autoplay: true,
    autoBind: true,
  })

  const boundInstance = rive?.viewModelInstance

  const { setValue: setIsActive } = useViewModelInstanceBoolean('excited', boundInstance)

  return (
    <RiveComponent
      width={540}
      height={540}
      onMouseEnter={() => {
        setIsActive(true)
      }}
      onMouseLeave={() => {
        setIsActive(false)
      }}
    />
  )
}
