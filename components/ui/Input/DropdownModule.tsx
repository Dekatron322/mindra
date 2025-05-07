// DropdownPopoverModule.tsx
"use client"
import React, { useEffect, useRef, useState } from "react"

interface DropdownPopoverProps {
  label: string
  options: { value: string; label: string }[]
  placeholder: string
  value: string
  onChange: (value: string) => void
  className?: string
  error?: boolean
}

export const DropdownPopoverModule: React.FC<DropdownPopoverProps> = ({
  label,
  options,
  placeholder,
  value,
  onChange,
  className = "",
  error = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className={`relative w-full min-w-[200px] ${className}`} ref={dropdownRef}>
      <label className="text-grey-400 mb-1 block text-sm">{label}</label>
      <div
        className={`
          flex h-[46px] cursor-pointer items-center rounded-md border px-3
          py-2 ${error ? "border-[#D14343]" : "border-[#E0E0E0]"}
          ${isFocused ? "bg-[#FBFAFC] ring-2 ring-[#3841C0]" : "bg-white"}
          transition-all duration-200
        `}
        onClick={() => setIsOpen(!isOpen)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={0}
      >
        <span className={`w-full text-base ${!value && "text-gray-400"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`ml-2 h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-[200px] rounded-md border border-[#E0E0E0] bg-white shadow-lg">
          <div className="max-h-60 overflow-auto py-1">
            {options.map((option) => (
              <div
                key={option.value}
                className={`flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-gray-100 ${
                  value === option.value ? "bg-[#FBFAFC] text-[#3841C0]" : ""
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
