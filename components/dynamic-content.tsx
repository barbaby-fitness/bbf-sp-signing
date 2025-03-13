'use client'

import { useEffect, useState } from 'react'

export function DynamicContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // or a loading state
  }

  // Your dynamic content here
  return <div>{new Date().toLocaleString()}</div>
}