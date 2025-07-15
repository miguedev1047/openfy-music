import { cn } from '@renderer/lib/utils'
import { Box } from '@renderer/components/ui/box'

export function ScrollContainer({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <Box
      className={cn(
        ' w-full h-full pb-12 pr-4 px-4 pt-4 overflow-auto scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-(--radius)',
        className
      )}
      {...props}
    />
  )
}
