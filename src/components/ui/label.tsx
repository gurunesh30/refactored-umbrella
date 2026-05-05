"use client"

import * as React from "react"
import { Root } from "radix-ui" // Wait, radix-ui package is installed, but maybe it's @radix-ui/react-label? 
// The package.json says "radix-ui": "^1.4.3". This is unusual. 
// I'll use a simple label if radix-ui doesn't have Root.

import { cn } from "@/src/lib/utils"

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }
