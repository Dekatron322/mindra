"use client"
import React, { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
// Importing modular components
import { ButtonModule } from "components/ui/Button/Button"
import { notify } from "components/ui/Notification/Notification"

const ResetPin: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [showErrorNotification, setShowErrorNotification] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(60) // 60 seconds countdown
  const pinInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const router = useRouter()

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleResend = () => {
    // Reset the timer
    setTimeLeft(60)
    // Add your resend logic here
    notify("success", "New code sent!", {
      description: "A new verification code has been sent to your email.",
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      notify("success", "Login successful!", {
        description: "Redirecting to dashboard...",
        duration: 1000,
      })

      setTimeout(() => router.push("/reset-password"), 1000)
    } catch (error) {
      notify("error", "Login failed", {
        description: "Invalid credentials. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handlePinChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newPin = [...pin]
      newPin[index] = value
      setPin(newPin)

      if (value && index < 5) {
        pinInputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      pinInputRefs.current[index - 1]?.focus()
    }
  }

  const isButtonDisabled = loading || pin.some((digit) => digit === "")

  return (
    <section className="relative flex h-screen w-full overflow-hidden bg-[#FDFCFC]">
      <div className="grid h-full w-full md:grid-cols-2">
        {/* Left side with form */}
        <div className="flex h-full flex-col border-r border-[#E0E0E0]">
          {/* Logo at the top */}
          <div className="flex justify-start px-10 pt-10 max-sm:justify-center 2xl:px-32">
            <img src="/images/Mindra PNG@4x 1.svg" alt="Company Logo" className="w-[201px]" />
          </div>

          {/* Centered form container */}
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-[500px] rounded-lg max-sm:w-[95%] max-sm:p-4 md:bg-[#FDFCFC]">
              <div className="t flex w-full flex-col justify-center">
                <p className="text-center text-4xl font-semibold text-[#212121]">Verify Your Email</p>
                <p className="mb-4 text-center text-[#707070] max-sm:text-center">
                  We sent a 6-digit OTP to your registered email. Enter the code below to proceed.
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-6 flex justify-center space-x-4">
                  {pin.map((digit, index) => (
                    <input
                      key={index}
                      type="password"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handlePinChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      ref={(el: HTMLInputElement | null) => {
                        pinInputRefs.current[index] = el
                      }}
                      className="h-[42px] w-[42px] rounded-lg border border-gray-300 text-center text-2xl focus:border-[#3841C0] focus:outline-none focus:ring-2 focus:ring-[#3841C0]"
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  ))}
                </div>

                <p className="text-center text-[#666666]">OTP will expire in</p>
                <p className="text-center font-semibold text-[#666666]">{formatTime(timeLeft)}</p>

                <ButtonModule
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isButtonDisabled}
                  className="mt-20 w-full"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="mr-2 h-5 w-5 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    "Verify Email"
                  )}
                </ButtonModule>

                <ButtonModule
                  type="button"
                  variant="neutral"
                  size="lg"
                  className="mt-5 w-full"
                  disabled={timeLeft > 0}
                  onClick={handleResend}
                >
                  {timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : "Didn't get the link? Resend"}
                </ButtonModule>
              </form>
              <p className="mt-4 text-center">
                Go back to{" "}
                <a
                  href="/signin"
                  className="text-[#3841C0] transition-all duration-200 ease-in-out hover:text-[#2a32a8] focus:outline-none"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="relative mb-4 flex h-full flex-col items-center justify-center gap-2 overflow-hidden bg-[#FDFCFC] max-sm:hidden">
          <div className="absolute right-[-50px] top-[-50px] h-64 w-64 rounded-full bg-white opacity-20"></div>
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-white opacity-20"></div>
          <img src="/images/Mindra PNG@4x 1.svg" alt="profile" className="w-[470.3px]" />
        </div>
      </div>
    </section>
  )
}

export default ResetPin
