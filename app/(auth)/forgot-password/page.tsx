"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
// Importing modular components
import { ButtonModule } from "components/ui/Button/Button"
import { FormInputModule } from "components/ui/Input/Input"
import { notify } from "components/ui/Notification/Notification"
import { GoArrowLeft } from "react-icons/go"
import Link from "next/link"

const ForgotPassword: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [showErrorNotification, setShowErrorNotification] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const router = useRouter()

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

      setTimeout(() => router.push("/reset-pin"), 1000)
    } catch (error) {
      notify("error", "Login failed", {
        description: "Invalid credentials. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked)
  }

  useEffect(() => {
    if (showSuccessNotification || showErrorNotification) {
      const timer = setTimeout(() => {
        setShowSuccessNotification(false)
        setShowErrorNotification(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [showSuccessNotification, showErrorNotification])

  const isButtonDisabled = loading || username.trim() === ""

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
                <p className="text-center text-4xl font-semibold text-[#212121]">Reset Password</p>
                <p className="mb-4 text-center text-[#6C757D] max-sm:text-center">
                  Enter your registered email address, and we’ll send you a one-time verification code.
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <FormInputModule
                  label="Email"
                  type="email"
                  placeholder="info@mindra.com"
                  value={username}
                  onChange={handleUsernameChange}
                  className="mb-3"
                />

                <div className="mt-4 flex w-full items-center justify-between md:mb-10"></div>

                <ButtonModule type="submit" variant="primary" size="lg" disabled={isButtonDisabled} className="w-full">
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
                    "Reset Password"
                  )}
                </ButtonModule>
              </form>
              <Link href="/signin" className="mt-4 flex w-full items-center justify-center gap-2 hover:text-[#3841C0] ">
                <GoArrowLeft />
                <p>Back to login</p>
              </Link>
            </div>
          </div>
        </div>
        {/* Right side with decorative elements */}
        <div className="relative mb-4 flex h-full flex-col items-center justify-center gap-2 overflow-hidden bg-[#FDFCFC] max-sm:hidden">
          <div className="absolute right-[-50px] top-[-50px] h-64 w-64 rounded-full bg-white opacity-20"></div>
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-white opacity-20"></div>
          <img src="/images/Mindra PNG@4x 1.svg" alt="profile" className="w-[470.3px]" />
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
