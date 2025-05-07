// FormInputModule.tsx
"use client"
import React, { useState } from "react"

interface FormInputProps {
  label: string
  type: string
  name?: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  error?: boolean
}

export const FormInputModule: React.FC<FormInputProps> = ({
  label,
  type,
  placeholder,
  value,
  name,
  onChange,
  className = "",
  error = false,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={` ${className}`}>
      <label className="mb-1 block text-sm text-[#2a2f4b]">{label}</label>
      <div
        className={`
        flex h-[46px] items-center rounded-md border px-3
        py-2 ${error ? "border-[#D14343]" : "border-[#E0E0E0]"}
        ${isFocused ? "bg-[#FBFAFC] ring-2 ring-[#3841C0]" : "bg-white"}
        transition-all duration-200
      `}
      >
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent text-base outline-none"
          value={value}
          name={name}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {/* User icon added here */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 text-gray-400"
        >
          <path
            d="M10 10C12.3012 10 14.1667 8.13452 14.1667 5.83333C14.1667 3.53214 12.3012 1.66666 10 1.66666C7.69881 1.66666 5.83333 3.53214 5.83333 5.83333C5.83333 8.13452 7.69881 10 10 10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.1583 18.3333C17.1583 15.1083 13.95 12.5 9.99999 12.5C6.04999 12.5 2.84166 15.1083 2.84166 18.3333"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
