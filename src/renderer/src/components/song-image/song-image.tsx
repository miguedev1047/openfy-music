import { Music } from 'lucide-react'
import { cn } from '@renderer/lib/utils'

interface SongImageComponentProps extends React.ComponentProps<'div'> {
  src: string | undefined | null
  alt: string
  isBlurred?: boolean
}

interface ImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}

function SimpleImage({ src, alt, className, loading = 'lazy' }: ImageProps) {
  return (
    <img
      className={cn('w-full h-full object-cover rounded-(--radius)', className)}
      src={src}
      alt={alt}
      loading={loading}
    />
  )
}

function BlurredImage({ src, alt }: Omit<ImageProps, 'className' | 'loading'>) {
  return (
    <div className="relative w-full h-full">
      <SimpleImage src={src} alt={alt} className="relative z-10" loading="lazy" />
      <SimpleImage
        src={src}
        alt={alt}
        className="absolute right-5 -bottom-[50%] -translate-y-[50%] scale-110 z-0 blur-3xl opacity-80"
        loading="lazy"
      />
    </div>
  )
}

function ImagePlaceholder() {
  return (
    <figure className="size-full bg-muted rounded-(--radius) grid place-items-center">
      <Music className="size-[50%]" />
    </figure>
  )
}

function useImageRenderer(src: string | undefined | null, alt: string, isBlurred: boolean) {
  if (!src) {
    return <ImagePlaceholder />
  }

  if (isBlurred) {
    return <BlurredImage src={src} alt={alt} />
  }

  return <SimpleImage src={src} alt={alt} />
}

export function SongImage({
  className,
  src,
  alt,
  isBlurred = false
}: SongImageComponentProps): React.JSX.Element {
  const imageContent = useImageRenderer(src, alt, isBlurred)

  return (
    <figure
      className={cn(
        'size-16 aspect-square shrink-0 grid place-items-center pointer-events-none relative bg-background/20 rounded-(--radius)',
        className
      )}
    >
      {imageContent}
    </figure>
  )
}
