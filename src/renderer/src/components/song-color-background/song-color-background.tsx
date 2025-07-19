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

    const pastelize = (v: number, s = 0.5) => Math.round(v + (255 - v) * s)

    const pastelFirst = {
      red: pastelize(first.red),
      green: pastelize(first.green),
      blue: pastelize(first.blue)
    }

    const pastelSecond = {
      red: pastelize(second.red),
      green: pastelize(second.green),
      blue: pastelize(second.blue)
    }

    const gradient = `linear-gradient(${deg}deg, 
  rgba(${pastelFirst.red}, ${pastelFirst.green}, ${pastelFirst.blue}, 0.8) 0%, 
  rgba(${pastelSecond.red}, ${pastelSecond.green}, ${pastelSecond.blue}, 0.8) 100%)`

    return gradient
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
