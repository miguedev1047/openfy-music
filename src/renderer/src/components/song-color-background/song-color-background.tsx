import { useSelectedSongStore } from '@renderer/store/use-player-store'
import { extractColors } from 'extract-colors'
import { FinalColor } from 'extract-colors/lib/types/Color'
import React, { useEffect, useMemo, useState } from 'react'

const DEFAULT_VALUE = {
  hex: '#00000000',
  red: 0,
  green: 0,
  blue: 0,
  area: 0,
  hue: 0,
  saturation: 0,
  lightness: 0,
  intensity: 0
}

export function useSongColors() {
  const selectedSong = useSelectedSongStore((state) => state.selectedSong)
  const [colors, setColors] = useState<FinalColor[] | null>(null)

  const defaultColors: FinalColor[] = [DEFAULT_VALUE, DEFAULT_VALUE]
  const imageSrc = selectedSong?.pic

  useEffect(() => {
    if (!imageSrc) return
    extractColors(imageSrc).then(setColors).catch(console.error)
  }, [imageSrc])

  const gradient = useMemo(() => {
    const [first, second] = colors ?? defaultColors
    const deg = Math.floor(Math.random() * 360)

    return `
    linear-gradient(${deg}deg, 
      rgba(${first.red}, ${first.green}, ${first.blue}, 0.7) 0%, 
      rgba(${second.red}, ${second.green}, ${second.blue}, 0.7) 100%
  `
  }, [colors])

  return { gradient }
}

export function SongColorBackground({ children }: React.PropsWithChildren & {}) {
  const { gradient } = useSongColors()

  return (
    <>
      <div
        className="transition-all duration-200 ease-in-out absolute inset-0 -z-10"
        style={{ backgroundImage: gradient }}
      />

      {children}
    </>
  )
}
