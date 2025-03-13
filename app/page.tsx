"use client"

import { useState } from "react"
import Link from "next/link"
import { Dumbbell, Instagram, Youtube, Music, Menu, X, Home as HomeIcon, FileSignature } from "lucide-react"
import { TiktokIcon } from "@/components/ui/icons/tiktok-icon"
import { NewYorkerSpline } from "@/components/new-yorker-spline"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <header className="z-30 relative bg-[#111111] text-white">
        {/* Desktop Navigation */}
        <div className="h-24 py-4 px-6 flex justify-between items-center">
          {/* Logo - Always visible */}
          <Link href="/" className="hover:opacity-80 transition-opacity z-20">
            <div className="text-2xl md:text-3xl tracking-[0.15em] font-light font-serif flex items-center gap-2">
              <Dumbbell className="h-6 w-6" width={24} height={24} />
              BarBaby Fitness
            </div>
          </Link>

          {/* Hamburger Menu Button - Only visible on mobile/tablet */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-20 p-2 w-10 h-10 flex items-center justify-center contain-layout-paint"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" width={24} height={24} />
            ) : (
              <Menu className="h-6 w-6" width={24} height={24} />
            )}
          </button>

          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden md:flex justify-between items-center flex-1 px-8">
            <Link 
              href="/contract" 
              className="absolute left-1/2 transform -translate-x-1/2 will-change-transform contain-layout-paint"
            >
              <div className="flex flex-col items-center">
                <div className="text-2xl md:text-3xl font-serif italic tracking-wide">COMMIT TO BEING FIT</div>
                <div className="text-sm font-extralight italic tracking-wider mt-1 opacity-80">SIGN YOUR CONTRACT TODAY</div>
              </div>
            </Link>

            <div className="flex flex-col items-center ml-auto">
              <div className="text-2xl md:text-3xl tracking-[0.15em] font-light font-serif">LIGE STINER</div>
              <div className="flex justify-center gap-4 mt-2">
                <Link href="https://www.instagram.com/barbabyfitness/" className="will-change-transform contain-layout-paint">
                  <Instagram className="h-5 w-5" width={20} height={20} />
                </Link>
                <Link href="https://tiktok.com" className="will-change-transform contain-layout-paint">
                  <TiktokIcon className="h-5 w-5" width={20} height={20} />
                </Link>
                <Link href="https://www.youtube.com/channel/UCRyHCcXzmOK-LQAMmB2SJ6w" className="will-change-transform contain-layout-paint">
                  <Youtube className="h-5 w-5" width={20} height={20} />
                </Link>
                <Link href="https://audiomack.com/barbaby-fitness/song" className="will-change-transform contain-layout-paint">
                  <Music className="h-5 w-5" width={20} height={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu - Dropdown */}
          <div
            className={`
              absolute top-24 right-0 w-[90%] max-w-[400px] bg-[#111111] z-10
              md:hidden
              transition-transform duration-300 ease-in-out
              shadow-lg rounded-bl-lg
              ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
              contain-layout-paint
            `}
          >
            <nav className="p-4 contain-content">
              {/* Brand Message */}
              <div className="border-b border-gray-700 pb-4 mb-4">
                <div className="px-4 py-2 text-center">
                  <div className="text-xl font-serif italic">COMMIT TO BEING FIT</div>
                  <div className="text-sm font-light italic opacity-80">
                    SIGN YOUR CONTRACT TODAY
                  </div>
                </div>
              </div>

              {/* Main Navigation */}
              <div className="border-b border-gray-700 pb-4 mb-4">
                <Link
                  href="/"
                  className="block w-full py-3 px-4 text-left hover:bg-gray-800 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <HomeIcon className="h-5 w-5" width={20} height={20} />
                    <span>Home</span>
                  </div>
                </Link>

                <Link
                  href="/contract"
                  className="block w-full py-3 px-4 mt-2 text-left hover:bg-gray-800 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <FileSignature className="h-5 w-5" width={20} height={20} />
                    <span>Sign Contract</span>
                  </div>
                </Link>
              </div>

              {/* Social Links */}
              <div className="px-4">
                <div className="text-lg font-serif mb-3">LIGE STINER SOCIAL</div>
                <div className="flex gap-4">
                  <Link
                    href="https://www.instagram.com/barbabyfitness/"
                    className="p-2 hover:bg-gray-800 rounded-full transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Instagram className="h-5 w-5" width={20} height={20} />
                  </Link>
                  <Link
                    href="https://tiktok.com"
                    className="p-2 hover:bg-gray-800 rounded-full transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <TiktokIcon className="h-5 w-5" width={20} height={20} />
                  </Link>
                  <Link
                    href="https://www.youtube.com/channel/UCRyHCcXzmOK-LQAMmB2SJ6w"
                    className="p-2 hover:bg-gray-800 rounded-full transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Youtube className="h-5 w-5" width={20} height={20} />
                  </Link>
                  <Link
                    href="https://audiomack.com/barbaby-fitness/song"
                    className="p-2 hover:bg-gray-800 rounded-full transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Music className="h-5 w-5" width={20} height={20} />
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <NewYorkerSpline />
    </div>
  )
}
