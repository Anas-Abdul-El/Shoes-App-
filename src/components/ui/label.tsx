"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

/**
 * Label component.
 * Accessible label element built on Radix UI primitives.
 * 
 * @param {Object} props - Label props
 * @param {string} props.className - Additional CSS classes
 * @param {...React.ComponentProps<typeof LabelPrimitive.Root>} props - All standard label HTML attributes
 * @returns {JSX.Element} Label element
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>): JSX.Element {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
