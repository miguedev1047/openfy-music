import { createContext, use, useRef } from 'react'

interface AudioRefContextProps {
  audioRef: React.RefObject<HTMLAudioElement | null>
}

const AudioRefContext = createContext<AudioRefContextProps | null>(null)

export const useAudioRef = () => {
  const context = use(AudioRefContext)
  if (!context) {
    throw new Error('useAudioRef must be used within an AudioRefProvider')
  }
  return context
}

export function AudioRefProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  return <AudioRefContext.Provider value={{ audioRef }}>{children}</AudioRefContext.Provider>
}
