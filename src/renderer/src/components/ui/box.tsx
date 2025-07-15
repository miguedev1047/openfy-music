import * as React from "react"

import { cn } from "@renderer/lib/utils"

function Box({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground rounded-xl p-4",
        className
      )}
      {...props}
    />
  )
}

export { Box }