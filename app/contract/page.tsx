"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Dumbbell, Instagram, Youtube, Music, Menu, X, Check, Home, FileSignature } from "lucide-react"
import { TiktokIcon } from "@/components/ui/icons/tiktok-icon"

export default function ContractPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Remove the useRouter hook since we're using Link component for navigation
  
  // State declarations
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneArea, setPhoneArea] = useState("")
  const [phonePrefix, setPhonePrefix] = useState("")
  const [phoneLine, setPhoneLine] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [signature, setSignature] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [agreedLiability, setAgreedLiability] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Format phone number for display and submission
  const formattedPhone = phoneArea && phonePrefix && phoneLine ? `(${phoneArea}) ${phonePrefix}-${phoneLine}` : ""

  // Handle phone number input with auto-formatting
  const handlePhoneAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 3) {
      setPhoneArea(value)
      if (value.length === 3 && e.target.nextElementSibling) {
        ;(e.target.nextElementSibling as HTMLInputElement).focus()
      }
    }
  }

  const handlePhonePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 3) {
      setPhonePrefix(value)
      if (value.length === 3 && e.target.nextElementSibling) {
        ;(e.target.nextElementSibling as HTMLInputElement).focus()
      }
    }
  }

  const handlePhoneLineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      setPhoneLine(value)
    }
  }

  // Check if all required fields are filled and both checkboxes are checked
  useEffect(() => {
    setFormValid(
      firstName.trim() !== "" &&
        lastName.trim() !== "" &&
        email.trim() !== "" &&
        phoneArea.length === 3 &&
        phonePrefix.length === 3 &&
        phoneLine.length === 4 &&
        streetAddress.trim() !== "" &&
        city.trim() !== "" &&
        state.trim() !== "" &&
        zipCode.trim() !== "" &&
        signature.trim() !== "" &&
        agreed &&
        agreedLiability,
    )
  }, [
    firstName,
    lastName,
    email,
    phoneArea,
    phonePrefix,
    phoneLine,
    streetAddress,
    city,
    state,
    zipCode,
    signature,
    agreed,
    agreedLiability,
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const submissionDate = new Date().toISOString()
      const contractData = {
        firstName,
        lastName,
        email,
        phone: formattedPhone,
        address: {
          street: streetAddress,
          city,
          state,
          zipCode,
        },
        signature,
        agreed,
        agreedLiability,
        submissionDate, // Added explicit submission date
        timestamp: submissionDate // Keeping timestamp for consistency
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/contract-submission';
        
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contractData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit contract')
      }

      // Use window.location for form submission redirect
      window.location.href = '/thank-you'
    } catch (error) {
      console.error('Error submitting contract:', error)
      alert('There was an error submitting your contract. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Exact same styling as main page */}
      <header className="z-30 relative bg-[#111111] text-white">
        {/* Desktop Navigation */}
        <div className="h-24 py-4 px-6 flex justify-between items-center">
          {/* Logo - Always visible */}
          <Link href="/" className="hover:opacity-80 transition-opacity z-20">
            <div className="text-2xl md:text-3xl tracking-[0.15em] font-light font-serif flex items-center gap-2">
              <Dumbbell className="h-6 w-6" />
              BarBaby Fitness
            </div>
          </Link>

          {/* Hamburger Menu Button - Only visible on mobile/tablet */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-20 p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden md:flex justify-between items-center flex-1 px-8">
            <Link 
              href="/contract" 
              className="absolute left-1/2 transform -translate-x-1/2 hover:opacity-80 transition-opacity"
            >
              <div className="flex flex-col items-center">
                <div className="text-2xl md:text-3xl font-serif italic tracking-wide">COMMIT TO BEING FIT</div>
                <div className="text-sm font-extralight italic tracking-wider mt-1 opacity-80">SIGN YOUR CONTRACT TODAY</div>
              </div>
            </Link>
            
            <div className="flex flex-col items-center ml-auto">
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
          </div>

          {/* Mobile Menu - Dropdown */}
          <div
            className={`
              absolute top-24 right-0 w-[90%] max-w-[400px] bg-[#111111] z-10
              md:hidden
              transition-all duration-300 ease-in-out
              shadow-lg rounded-bl-lg
              ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            `}
          >
            <nav className="p-4">
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
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </div>
                </Link>
                
                <Link 
                  href="/contract"
                  className="block w-full py-3 px-4 mt-2 text-left hover:bg-gray-800 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <FileSignature className="h-5 w-5" />
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
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link 
                    href="https://tiktok.com" 
                    className="p-2 hover:bg-gray-800 rounded-full transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <TiktokIcon className="h-5 w-5" />
                  </Link>
                  <Link 
                    href="https://www.youtube.com/channel/UCRyHCcXzmOK-LQAMmB2SJ6w" 
                    className="p-2 hover:bg-gray-800 rounded-full transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Youtube className="h-5 w-5" />
                  </Link>
                  <Link 
                    href="https://audiomack.com/barbaby-fitness/song" 
                    className="p-2 hover:bg-gray-800 rounded-full transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Music className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="w-full max-w-[100vw] px-6 md:px-12">
        {/* Back button in full-width container with increased top margin */}
        <div className="mt-16 mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-start text-white bg-black py-4 px-6 rounded-lg hover:bg-black/90 transition-all"
          >
            <ChevronLeft className="mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Centered content container */}
        <div className="max-w-4xl mx-auto">
          {submitted ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8">
                <Check className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold mb-6">Contract Signed Successfully!</h1>
              <p className="text-xl mb-8">
                Thank you for committing to your fitness journey with BarBaby Fitness. We've sent a confirmation email
                with your contract details.
              </p>
              <p className="text-lg mb-12">
                Your personal trainer will contact you within 24 hours to schedule your first session.
              </p>
              <Link
                href="/"
                className="inline-block bg-black text-white py-3 px-8 rounded-md hover:bg-black/90 transition-all"
              >
                Return to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <div className="logo-container mb-12 flex justify-center w-full px-4 sm:px-8">
                  <div className="relative w-full pb-[36%]">
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
                <h1 className="text-5xl md:text-6xl font-serif italic mb-4">
                  Begin Your Journey
                </h1>
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-xl md:text-2xl text-[#C05E0E] font-serif">
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Contract Section Title */}
              <h2 className="text-3xl font-bold mb-6 font-serif text-center">Training Agreement Details</h2>

              {/* First Contract Section */}
              <div className="mb-12 p-6 bg-white rounded-lg border-2 border-[#C05E0E] h-[400px] overflow-y-auto">
                <div className="space-y-4 font-[system-ui]">
                  {/* Contract Header - KEEPING THIS EXACTLY THE SAME */}
                  <div className="text-center mb-12">
                    <h3 className="text-4xl font-serif font-bold mb-4">PERSONAL TRAINING AGREEMENT</h3>
                    <div className="w-2/3 mx-auto border-b-2 border-[#C05E0E] mb-8"></div>
                  </div>

                  {/* Contract Introduction Section - UPDATING THIS PART */}
                  <div className="space-y-8 mb-12">
                    <p className="text-xl leading-relaxed font-medium">
                      This Personal Training Contract (hereinafter referred to as the "Contract") is made and entered into by and between:
                    </p>

                    <div className="py-6 space-y-6 border-y-2 border-[#C05E0E]/30">
                      <div className="space-y-2">
                        <p className="text-2xl font-serif">BarBaby Fitness</p>
                        <p className="text-xl italic text-gray-700">("Trainer/Owner")</p>
                      </div>

                      <p className="text-xl">and</p>

                      <p className="text-2xl font-serif">The Undersigned Client</p>
                    </div>

                    <p className="text-xl leading-relaxed font-medium">
                      By signing below, the Client agrees to comply with the terms and conditions outlined in this Contract.
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="font-bold">1. Contact Information & Facility Access</p>
                    <div className="ml-4 mt-2">
                      <p>• Trainer/Owner Contact:</p>
                      <p>• Phone: (323) 530-3182</p>
                      <p>• Phone: (424) 468-4903</p>
                      <p>• Facility Hours: Open 24 hours</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="font-bold">2. Programs, Packages, and Fees</p>
                    <p className="font-bold ml-4 mt-2">A. Initiation Fees</p>
                    <div className="ml-8">
                      <p>
                        • A <span className="font-bold">$100 initiation fee</span> applies to all new clients or those who
                        have not purchased a session in the last 12 months.
                      </p>
                      <p>
                        • Partnership Program: Each participant must pay a{" "}
                        <span className="font-bold">$100 initiation fee</span> at the start of their contract.
                      </p>
                      <p>
                        • On the Go Program: A <span className="font-bold">$200 initiation fee</span> applies.
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="font-bold ml-4">B. Package Options</p>
                    <p className="ml-4 italic">
                      All sessions are 1 hour in duration and must be completed within 30 days from the first session of
                      the package.
                    </p>

                    <div className="ml-8 mt-2">
                      <p>1. Individual Packages</p>
                      <div className="ml-4">
                        <p>
                          • <u>Barbaby Kick Starter:</u> $195 for 3 sessions/month
                        </p>
                        <p>
                          • <u>Barbaby Steady Climb:</u> $240 for 4 sessions/month
                        </p>
                        <p>
                          • <u>Barbaby Power Surge:</u> $440 for 8 sessions/month
                        </p>
                        <p>
                          • <u>Barbaby Elite Focus:</u> $600 for 12 sessions/month
                        </p>
                      </div>
                    </div>

                    <div className="ml-8 mt-2">
                      <p>2. Partnership Program (12-Month Commitment)</p>
                      <div className="ml-4">
                        <p>• Fee: $500 per month per participant (12 sessions per month)</p>
                        <p>
                          • Initiation: One-time <span className="font-bold">$100 initiation fee per participant</span>
                        </p>
                        <p>• Requirements:</p>
                        <div className="ml-4">
                          <p>• A minimum of two participants at all times.</p>
                          <p>
                            • Each participant must have a partner and complete the full{" "}
                            <span className="font-bold">12-month contract</span>.
                          </p>
                          <p>
                            • If a partner drops out, the remaining participant agrees to pay an additional{" "}
                            <span className="font-bold">$100 per month</span> to cover the discount initially provided.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="ml-8 mt-2">
                      <p>3. On the Go Program</p>
                      <div className="ml-4">
                        <p>• Fee: $75 per session</p>
                        <p>• Initiation: $200</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="font-bold">3. Billing & Payment Terms</p>
                    <div className="ml-4">
                      <p>• Billing Cycle:</p>
                      <div className="ml-4">
                        <p>
                          • Packages are billed <span className="font-bold">monthly</span> or upon session completion.
                        </p>
                        <p>
                          • If the Client does not complete sessions within <span className="font-bold">30 days</span>,
                          the package expires, and unused sessions are forfeited.
                        </p>
                        <p>
                          •{" "}
                          <span className="font-bold">Unused sessions will not roll over, be credited, or refunded.</span>{" "}
                          It is the Client's responsibility to schedule and attend sessions within this timeframe.
                        </p>
                      </div>
                    </div>
                    <div className="ml-4 mt-2">
                      <p className="mt-2">• Cancellation Policy:</p>
                      <div className="ml-4">
                        <p>• Clients may cancel future billing up to 3 days before the next scheduled payment.</p>
                        <p>
                          • Failure to cancel at least 3 days in advance will result in automatic billing for the next
                          month.
                        </p>
                        <p>
                          • All remaining sessions will be forfeited upon early contract cancellation, and no refunds or
                          credits will be provided.
                        </p>
                      </div>
                    </div>
                    <div className="ml-4 mt-2">
                      <p className="mt-2">• Partnership Program Contract Termination:</p>
                      <div className="ml-4">
                        <p>• If both participants wish to cancel the contract early, they must pay either:</p>
                        <p>• Two months of the contract OR</p>
                        <p>• Half of the remaining balance, whichever is less.</p>
                        <p>• All remaining sessions will be forfeited upon early cancellation.</p>
                      </div>
                    </div>
                    <div className="ml-4 mt-2">
                      <p className="mt-2">• Refund Policy:</p>
                      <div className="ml-4">
                        <p>
                          • No refunds will be issued under any circumstances, except in extreme cases approved by Barbaby
                          Fitness.
                        </p>
                        <p>• Extreme cases may include:</p>
                        <p>
                          • Permanent disability preventing physical activity (must be documented by a licensed
                          physician).
                        </p>
                        <p>• Relocation more than 50 miles away (must provide proof of address change).</p>
                        <p>• Medical condition requiring long-term inactivity (6+ months, verified by a physician).</p>
                        <p>
                          • Refund requests must be submitted in writing with supporting documentation. Barbaby Fitness
                          reserves the right to approve or deny any refund request.
                        </p>
                      </div>
                    </div>
                    <div className="ml-4 mt-2">
                      <p className="mt-2">• Late Payment Fee:</p>
                      <div className="ml-4">
                        <p>
                          • If a payment is not resolved within 5 business days, a $25 late fee will be applied. If the
                          balance remains unpaid for 14 days, Barbaby Fitness reserves the right to suspend training and
                          send the outstanding balance to collections.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">4. Session Cancellation & No-Show Policy</p>
                    <div className="ml-4 mt-2">
                      <p>
                        • Cancellation Notice: Clients must cancel a scheduled session at least 5 hours in advance.
                        Cancellations made within less than 5 hours will be considered a used session.
                      </p>
                      <p>
                        • No-Shows: If a client fails to attend a scheduled session without prior notice, the session will
                        be marked as completed and counted as a used session with no make-up session provided.
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">5. Client Health Disclosure & Liability Waiver</p>
                    <div className="ml-4 mt-2">
                      <p>
                        • Health Acknowledgment: The Client certifies that they have disclosed all relevant medical
                        conditions, injuries, or physical limitations to Barbaby Fitness.
                      </p>
                      <p>
                        • Assumption of Risk: The Client acknowledges that physical exercise carries inherent risks,
                        including but not limited to muscle strains, sprains, cardiovascular events, and other injuries.
                        The Client voluntarily assumes all risks associated with training.
                      </p>
                      <p>
                        • Indemnification: The Client agrees to release, discharge, and indemnify Barbaby Fitness and its
                        trainers from any and all liability, including personal injury, illness, or property damage,
                        whether caused by negligence or otherwise.
                      </p>
                      <p>
                        • Medical Emergency Clause: If the Client requires medical attention during a session, they
                        consent to receive medical assistance, and all costs incurred will be the Client's sole
                        responsibility.
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">6. Force Majeure (Unforeseen Events)</p>
                    <p className="ml-4 mt-2">
                      "Barbaby Fitness is not responsible for service interruptions due to events beyond its control. In
                      such cases, sessions may be rescheduled, but no refunds will be issued."
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">7. Social Media & Confidentiality Clause</p>
                    <div className="ml-4 mt-2">
                      <p>
                        • The Client agrees not to make any defamatory, false, or misleading statements about Barbaby
                        Fitness, its trainers, or services in any public forum, including social media, online reviews, or
                        public discussions.
                      </p>
                      <p>
                        • The Client further agrees not to share confidential business practices or trade secrets of
                        Barbaby Fitness.
                      </p>
                      <p>• Violation of this clause may result in legal action.</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">8. Payment & Chargeback Policy</p>
                    <p className="ml-4 mt-2 italic">
                      "If a payment is declined, the Client must resolve it within 5 business days or training will be
                      suspended. If a chargeback is initiated without valid cause, the Client is responsible for the
                      disputed amount plus a $50 chargeback fee. Unresolved chargebacks may be sent to collections and
                      reported to credit agencies."
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">9. Business Closure & Trainer Availability</p>
                    <p className="ml-4 mt-2">
                      "If Barbaby Fitness is unable to provide training services due to unforeseen circumstances, sessions
                      will be rescheduled at the Trainer's discretion. No refunds will be issued."
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">10. Dispute Resolution Clause</p>
                    <div className="ml-4 mt-2">
                      <p>
                        • Any disputes arising under this Contract shall be resolved through binding arbitration in
                        [State/City].
                      </p>
                      <p>• The Client agrees to waive any right to pursue legal action in a court of law.</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">11. Parental Consent (For Clients Under 18 Years Old)</p>
                    <p className="ml-4 mt-2">
                      "For Clients under 18, a parent/guardian must sign this agreement and assume full responsibility for
                      the Client's participation."
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">12. Photography & Video Consent (Optional)</p>
                    <p className="ml-4 mt-2">
                      "By signing this Contract, the Client grants Barbaby Fitness permission to use their photos/videos
                      for promotional and marketing purposes. If the Client does not wish to be photographed or recorded,
                      they must provide written notice to Barbaby Fitness before training begins."
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">13. Acknowledgment & Agreement</p>
                    <div className="ml-4 mt-2">
                      <p className="mb-4">
                        By signing below, the Client acknowledges that they have read and understood this Contract,
                        including the policies regarding session completion, cancellations, billing, and refunds.
                      </p>

                      <div className="flex items-start mt-6 mb-4 border-t-2 border-b-2 border-[#C05E0E] py-4">
                        <label htmlFor="agree" className="flex items-start cursor-pointer">
                          <div className="relative flex items-start">
                            <input
                              type="checkbox"
                              id="agree"
                              checked={agreed}
                              onChange={(e) => setAgreed(e.target.checked)}
                              className="opacity-0 absolute h-6 w-6 cursor-pointer peer"
                            />
                            <div className="w-6 h-6 border-2 border-[#C05E0E] rounded flex items-center justify-center bg-white mr-3 peer-checked:bg-[#C05E0E]/20">
                              {agreed && <Check className="h-5 w-5 text-[#C05E0E] stroke-[3]" />}
                            </div>
                          </div>
                          <span className="text-base font-bold text-gray-800">
                            I confirm that I have read and agree to the terms and conditions of this waiver.
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Contract Section Title */}
              <h2 className="text-3xl font-bold mb-6 font-serif text-center">Release of Liability</h2>

              {/* Second Contract Section */}
              <div className="mb-12 p-6 bg-white rounded-lg border-2 border-[#C05E0E] h-[400px] overflow-y-auto">
                <div className="space-y-4 font-[system-ui]">
                  {/* Contract Header - Matching the style of PERSONAL TRAINING AGREEMENT */}
                  <div className="text-center mb-12">
                    <h3 className="text-4xl font-serif font-bold mb-4">ASSUMPTION OF RISK & RELEASE OF LIABILITY ("Release")</h3>
                    <div className="w-2/3 mx-auto border-b-2 border-[#C05E0E] mb-8"></div>
                  </div>

                  <p className="text-center font-bold mb-6">
                    NOTE: THIS FORM MUST BE READ AND SIGNED BEFORE THE PARTICIPANT IS ALLOWED TO TAKE PART IN ANY
                    ACTVITIES.
                  </p>

                  <p className="mb-4">
                    I understand and agree that Bar Baby Fitness, LLC. Is NOT RESPONSIBLE for any injury, disability,
                    death, or loss of property I may suffer while present at the fitness center ("Gym") for exercises,
                    other activities, or for any reason whatsoever.
                  </p>

                  <p className="mb-4">
                    For and in consideration of permission to enter the Gym or to perform any activities at the Gym, I,
                    for myself and on behalf of my heirs, assigns, personal representatives and next of kin, hereby
                    release, discharge, waive and relinquish Bar Baby Fitness LLC, and any of their partners, affiliates,
                    members, contractors, agents, volunteers, and employees ("Release"), from any or all present and
                    future claims of injury, disability, death, or loss of property however they may occur, including any
                    ordinary negligence, except for any intentional misconduct of release.
                  </p>

                  <p className="mb-4">
                    Further, I am aware of the following risks, and numerous other inherent risks in observing or
                    participating in any exercises or any incidental activities thereto. These risks include, but are not
                    limited to, serious injury or death resulting from: Slips, trips, falls, collision with other persons
                    in the gym, malfunction of equipment, muscle and tendon injuries, fractures, abnormal blood pressure,
                    fainting, disorders of heart rhythm, and heart attack.
                  </p>

                  <p className="mb-4">
                    Although a complete list of all risks has not been provided to me, I subjectively understand the risks
                    of my participation in exercises or other physical activities, and knowing and appreciating these
                    risks, I voluntarily choose to be present at the Gym for exercise, other activities, or for any reason
                    whatsoever, and assume all risks, both known and unknown, of personal injury, death or loss or damage
                    to property. I further acknowledge that I have been advised to seek physician approval before
                    participating in any exercises or other physical activities. I further acknowledge that I have had an
                    opportunity to ask questions and any questions I have asked have been answered to my complete
                    satisfaction. I further agree to indemnify and hold harmless Releases for all claims arising from my
                    participation in exercise or other activities at the Gym.
                  </p>

                  <p className="mb-4">
                    If any provision of this release is held to be invalid or unenforceable, then all other provisions
                    shall continue to be valid and enforceable, and the valid or unenforceable provisions shall be
                    modified, reformed, or restricted, to the minimum extent possible to make that provision valid and
                    enforceable. I affirm that I am of legal age and freely read and sign this release.
                  </p>

                  <p className="font-bold text-center mb-6">
                    I HAVE READ THIS ASSUMPTION OF RISK AGREEMENT AND RELEASE OF LIABILITY, FULLY UNDERSTAND THAT I HAVE
                    GIVEN UP SUBSTANTIAL RIGHTS BY SIGNING IT, AND SIGN IT FREELY AND VOLUNTARILY AND VOLUNTARILY WITHOUT
                    ANY INDICEMENT.
                  </p>

                  <div className="flex items-start mt-6 mb-4 border-t-2 border-b-2 border-[#C05E0E] py-4">
                    <label htmlFor="agreeLiability" className="flex items-start cursor-pointer">
                      <div className="relative flex items-start">
                        <input
                          type="checkbox"
                          id="agreeLiability"
                          checked={agreedLiability}
                          onChange={(e) => setAgreedLiability(e.target.checked)}
                          className="opacity-0 absolute h-6 w-6 cursor-pointer peer"
                        />
                        <div className="w-6 h-6 border-2 border-[#C05E0E] rounded flex items-center justify-center bg-white mr-3 peer-checked:bg-[#C05E0E]/20">
                          {agreedLiability && <Check className="h-5 w-5 text-[#C05E0E] stroke-[3]" />}
                        </div>
                      </div>
                      <span className="text-base font-bold text-gray-800">
                        I confirm that I have read and agree to the terms and conditions of this liability release.
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="text-center text-sm text-[#C05E0E] mb-4">
                  * All fields and agreement checkboxes are required to proceed
                </div>

                {/* Updated form fields with more detailed inputs and placeholders */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 border-b pb-2">Personal Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-[#C05E0E]">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Enter your legal first name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-[#C05E0E]">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Enter your legal last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-[#C05E0E]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Enter your email address (e.g., name@example.com)"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-[#C05E0E]">*</span>
                    </label>
                    <div className="flex items-center">
                      <span className="mr-2">(</span>
                      <input
                        type="text"
                        value={phoneArea}
                        onChange={handlePhoneAreaChange}
                        className="w-16 p-3 border border-gray-300 rounded-md text-center"
                        maxLength={3}
                        placeholder="Area"
                        required
                      />
                      <span className="mx-2">)</span>
                      <input
                        type="text"
                        value={phonePrefix}
                        onChange={handlePhonePrefixChange}
                        className="w-20 p-3 border border-gray-300 rounded-md text-center"
                        maxLength={3}
                        placeholder="Prefix"
                        required
                      />
                      <span className="mx-2">-</span>
                      <input
                        type="text"
                        value={phoneLine}
                        onChange={handlePhoneLineChange}
                        className="w-20 p-3 border border-gray-300 rounded-md text-center"
                        maxLength={4}
                        placeholder="Line"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 border-b pb-2">Address Information</h3>

                  <div className="mb-6">
                    <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address <span className="text-[#C05E0E]">*</span>
                    </label>
                    <input
                      type="text"
                      id="streetAddress"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Enter your street address (e.g., 123 Main St, Apt 4B)"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City <span className="text-[#C05E0E]">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Enter your city"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State <span className="text-[#C05E0E]">*</span>
                      </label>
                      <input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Enter your state (e.g., CA)"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Zip Code <span className="text-[#C05E0E]">*</span>
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Enter your zip code"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 border-b pb-2">Signature</h3>

                  <div>
                    <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-1">
                      Digital Signature (Type your full name) <span className="text-[#C05E0E]">*</span>
                    </label>
                    <input
                      type="text"
                      id="signature"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md font-serif text-xl"
                      placeholder="Type your full name as your signature"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-[#C05E0E] text-white py-4 px-12 rounded-md text-lg font-bold tracking-wider uppercase hover:bg-[#C05E0E]/90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!formValid}
                  >
                    Sign Contract
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Footer - Fixed the syntax error here */}
      <footer className="z-20 p-6 flex justify-between items-center text-xs uppercase tracking-widest bg-white border-t border-gray-200 mt-12">
        <div>© 2023-2025 BarBaby Fitness</div>
        <div>Secure Contract Portal</div>
      </footer>
    </div>
  )
}
