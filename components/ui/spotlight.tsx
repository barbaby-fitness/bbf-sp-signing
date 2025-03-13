"use client"

import { cn } from "@/lib/utils"

interface SpotlightProps {
  className?: string
  size?: number
}

export function Spotlight({ className, size = 300 }: SpotlightProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100",
        className
      )}
      style={{
        background: `radial-gradient(${size}px circle at var(--x) var(--y), rgba(255,255,255,.075), transparent 40%)`,
      }}
    />
  )
}

