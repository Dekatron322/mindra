"use client"
import React from "react"

type ButtonVariant = "primary" | "black" | "secondary" | "outline" | "neutral" | "ghost" | "danger"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps {
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  disabled?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
  /** Optional icon element to render */
  icon?: React.ReactNode
  /** Position of the icon relative to the button text */
  iconPosition?: "start" | "end"
}

export const ButtonModule: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
  children,
  icon,
  iconPosition = "start",
}) => {
  const baseClasses =
    "flex items-center justify-center rounded-[5px] font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantClasses = {
    primary: "bg-[#3841C0] text-white hover:bg-[#2a32a8] focus:ring-[#3841C0]",
    black: "bg-[#131319] text-white hover:bg-[#000000] focus:ring-[#131319]",
    secondary: "bg-[#e6e8ff] text-[#3841C0] hover:bg-[#d0d4ff] focus:ring-[#3841C0]",
    outline: "border border-[#3841C0] text-[#3841C0] hover:bg-[#e6e8ff] focus:ring-[#3841C0]",
    neutral: "border border-[#E0E0E0] text-[#707070] hover:bg-[#e6e8ff] focus:ring-[#3841C0] bg-[#F8F9FA]",
    ghost: "text-[#3841C0] hover:bg-[#e6e8ff] focus:ring-[#3841C0]",
    danger: "bg-[#e05c2a] text-white hover:bg-[#d95425] focus:ring-[#c44d1f]",
  }

  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg",
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      } ${className}`}
    >
      {icon && iconPosition === "start" && <span className="mr-2 inline-flex items-center">{icon}</span>}
      {children}
      {icon && iconPosition === "end" && <span className="ml-2 inline-flex items-center">{icon}</span>}
    </button>
  )
}
