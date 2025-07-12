export const formatDuration = (seconds: number): string | null => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  if (h > 0) {
    return `${h} h.`
  }

  if (m > 0) {
    return `${m} min.`
  }

  if (s <= 60) {
    return `${s} seg.`
  }

  if (seconds === 0) {
    return 'Sin duración.'
  }

  return null
}

export const formatDurationPlayer = (seconds: number): string | null => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  const hour = h < 10 ? `0${h}` : h
  const minute = m < 10 ? `${m}` : m
  const second = s < 10 ? `0${s}` : s

  if (h > 0) {
    return `${hour}:${minute}:${second}`
  }

  if (m > 0) {
    return `${minute}:${second}`
  }

  if (s <= 60) {
    return `${minute}:${second}`
  }

  return null
}
