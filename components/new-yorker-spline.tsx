"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { SplineScene } from "@/components/ui/spline"
import { Spotlight } from "@/components/ui/spotlight"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export function NewYorkerSpline() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = Math.min(Math.max(event.clientX - rect.left, 125), rect.width - 125)
    const y = Math.min(Math.max(event.clientY - rect.top, 125), rect.height - 125)
    setMousePosition({ x, y })
  }

  return (
    <div className="min-h-screen w-full bg-white text-black relative font-serif" onMouseMove={handleMouseMove}>
      {/* Main content */}
      <div className="flex flex-col md:flex-row">
        {/* Left content - Editorial */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 relative z-10">
          <div
            className="absolute pointer-events-none bg-black rounded-full opacity-[0.07] blur-md transition-transform duration-300 ease-out"
            style={{
              width: "250px",
              height: "250px",
              left: `${mousePosition.x - 125}px`,
              top: `${mousePosition.y - 125}px`,
              transform: `translate(${(mousePosition.x - 125) * 0.02}px, ${(mousePosition.y - 125) * 0.02}px)`,
              contain: 'layout paint'
            }}
          />
          <div className="max-w-xl mx-auto relative">
            {/* Logo above heading - larger and centered */}
            <div className="logo-container mb-12 md:mb-20 flex justify-center w-full px-4 sm:px-8">
              <div className="relative w-full pb-[36%]"> {/* 500/180 = 0.36 */}
                <Image
                  src="https://pub-ae7a867ffdfc4078b5859520121853d0.r2.dev/SinglePage-Contracts-BarBabyFitnes.png"
                  alt="BarBaby Fitness Header"
                  width={2400}
                  height={864}
                  className="object-contain w-full h-full absolute inset-0"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 80vw"
                />
              </div>
            </div>

            <h1 className="font-serif text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight text-center mb-12">
              Your Fitness
              <br />
              Journey Begins
              <br />
              Here
            </h1>

            <div className="my-8 border-t-2 border-b-2 border-black py-4">
              <p className="italic text-xl md:text-2xl text-center">
                Complete your membership agreement and start your transformation today.
              </p>
            </div>

            <p className="text-xl md:text-2xl leading-relaxed mb-6">
              Welcome to BarBaby Fitness, Lige Stiner's premier personal training service. You're just one step away
              from beginning your personalized fitness journey. This secure portal allows you to review and sign your
              training contract electronically.
            </p>

            <p className="text-xl md:text-2xl leading-relaxed mb-6">
              Our training agreements are designed to ensure commitment on both sides. You'll receive dedicated
              one-on-one coaching and customized workout plans from our expert trainers. We're committed to helping you
              achieve your fitness goals safely and effectively.
            </p>

            {/* Enhanced call-to-action with Link */}
            <div className="mt-16 mb-8 flex flex-col items-center">
              <div className="w-full border-t-2 border-black mb-6"></div>
              <Link href="/contract">
                <div className="bg-black text-white py-4 px-8 rounded-md flex items-center justify-center cursor-pointer transition-colors will-change-transform">
                  <span className="text-xl font-bold tracking-[0.15em] uppercase mr-3">SIGN YOUR CONTRACT TODAY</span>
                  <ChevronDown className="h-6 w-6" />
                </div>
              </Link>
              <div className="w-full border-b-2 border-black mt-6"></div>
            </div>
          </div>
        </div>

        {/* Right content - 3D Scene */}
        <div className="w-full md:w-1/2 h-[calc(100vh-160px)] md:h-screen sticky top-40 bg-black overflow-hidden" style={{ contain: 'strict' }}>
          {/* Grid background */}
          <div className="absolute inset-0 grid-background"></div>
          <div className="relative z-10 w-full h-full" style={{ contain: 'layout paint' }}>
            <Spotlight className="left-1/2 top-1/2" size={300} />
            <div className="absolute inset-0 w-full h-full">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="z-20 p-6 flex justify-between items-center text-xs uppercase tracking-widest bg-white" style={{ contain: 'layout paint' }}>
        <div>© 2023-2025 BarBaby Fitness</div>
        <div>Secure Contract Portal</div>
      </footer>
    </div>
  )
}
