// OtechPlusIcon.tsx
import React from "react"

export interface IconProps {
  className?: string
}

const Export: React.FC<IconProps> = ({ className = "" }) => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.06002 9.46826C4.46002 9.77826 2.99002 11.6283 2.99002 15.6783V15.8083C2.99002 20.2783 4.78002 22.0683 9.25002 22.0683H15.76C20.23 22.0683 22.02 20.2783 22.02 15.8083V15.6783C22.02 11.6583 20.57 9.80826 17.03 9.47826"
        stroke="#FDFCFC"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.5 15.5685V4.18848"
        stroke="#FDFCFC"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.14997 6.41836L12.5 3.06836L15.85 6.41836"
        stroke="#FDFCFC"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Export
