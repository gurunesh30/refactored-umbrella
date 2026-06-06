import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  fallback?: string
}

function Avatar({ className, src, fallback, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800",
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt="avatar" className="aspect-square h-full w-full" />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-muted text-xs font-medium">
          {fallback || "U"}
        </div>
      )}
    </div>
  )
}

export { Avatar }
