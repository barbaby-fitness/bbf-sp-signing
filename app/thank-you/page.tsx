"use client"

import Link from "next/link"
import Image from "next/image"
import { Dumbbell, Instagram, Youtube, Music, Check } from "lucide-react"
import { TiktokIcon } from "@/components/ui/icons/tiktok-icon"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="z-30 flex justify-between items-center bg-[#111111] text-white h-24 py-4 px-6">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <div className="text-2xl md:text-3xl tracking-[0.15em] font-light font-serif flex items-center gap-2">
            <Dumbbell className="h-6 w-6" />
            BarBaby Fitness
          </div>
        </Link>
        <div className="flex flex-col items-center">
          <div className="text-2xl md:text-3xl tracking-[0.15em] font-light font-serif">LIGE STINER</div>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="https://www.instagram.com/barbabyfitness/" className="hover:opacity-80 transition-opacity">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="https://tiktok.com" className="hover:opacity-80 transition-opacity">
              <TiktokIcon className="h-5 w-5" />
            </Link>
            <Link href="https://www.youtube.com/channel/UCRyHCcXzmOK-LQAMmB2SJ6w" className="hover:opacity-80 transition-opacity">
              <Youtube className="h-5 w-5" />
            </Link>
            <Link href="https://audiomack.com/barbaby-fitness/song" className="hover:opacity-80 transition-opacity">
              <Music className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-4xl mx-auto p-8 md:p-16">
        {/* Logo */}
        <div className="mb-12 flex justify-center w-full">
          <div className="relative w-full max-w-[300px] h-[120px] flex items-center justify-center">
            <Image
              src="https://pub-ae7a867ffdfc4078b5859520121853d0.r2.dev/BarBaby-Fitness-Logo-Black.png"
              alt="BarBaby Fitness Logo"
              width={300}
              height={120}
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8">
            <Check className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-6 font-serif">Welcome to the BarBaby Family!</h1>
          <div className="space-y-6 max-w-2xl mx-auto">
            <p className="text-xl">
              Thank you for signing your contract with BarBaby Fitness. Your commitment to transformation starts now!
            </p>
            <p className="text-lg text-gray-700">
              A copy of your signed contract has been sent to your email address. Please check your inbox (and spam folder) for confirmation.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-serif mb-4">Next Steps:</h2>
              <ul className="text-left space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Lige will contact you within 24 hours to schedule your first session</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Review the welcome packet in your email for preparation guidelines</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Follow us on social media for daily motivation and updates</span>
                </li>
              </ul>
            </div>
            <div className="mt-12">
              <Link
                href="/"
                className="inline-block bg-black text-white py-3 px-8 rounded-md hover:bg-black/90 transition-all transform hover:scale-105"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="z-20 p-6 flex justify-between items-center text-xs uppercase tracking-widest bg-white border-t border-gray-200 mt-12">
        <div>© 2023-2025 BarBaby Fitness</div>
        <div>Thank You For Joining Us</div>
      </footer>
    </div>
  )
}