"use client"

import { Suspense, lazy } from "react"
const Spline = lazy(() => import("@splinetool/react-spline"))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center flex-col">
          <span className="loader"></span>
          <p className="text-white mt-4">Loading 3D scene...</p>
        </div>
      }
    >
      <Spline scene={scene} className={className} renderOnDemand={true} />
    </Suspense>
  )
}
