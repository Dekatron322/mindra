"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft"
import { SearchModule } from "components/ui/Search/search-module"
import UserDropdown from "components/ui/UserDropdown/dropdown-popover"
import NotificationDropdown from "components/ui/UserDropdown/notification-popover"
import { RxCross2 } from "react-icons/rx"
import { Links } from "components/Sidebar/Links"
import Messageicon from "public/Icons/message-icon"
import MessageDropdown from "components/ui/UserDropdown/message-popover"
import NotificationIcon from "public/images/notification-icon"

const DashboardNav = () => {
  const [searchText, setSearchText] = useState("")
  const [isNavOpen, setIsNavOpen] = useState(false)
  const pathname = usePathname()

  const handleCancelSearch = () => {
    setSearchText("")
  }

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <>
      <nav className="containerbg hidden border-b px-16 py-4 max-sm:px-3 md:block">
        <div className="flexBetween">
          <p className="text-[#212121]">Home</p>
          <div className="flex gap-4">
            <div className="flex content-center items-center justify-center gap-5">
              <NotificationIcon />
            </div>
            <div className="flex content-center items-center justify-center gap-2">
              <img src="/images/profile-pic.svg" className="h-10 w-10" />
              <div>
                <p className="text-sm text-[#212121]">Chiwendu Igwe</p>
                <p className="text-xs text-[#666666]">Product Manager</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <nav className="block border-b bg-[#ffffff] px-16 py-4 max-md:px-3 md:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" className="content-center">
            <img src="/images/Mindra PNG@4x 1.svg" alt="logo" className="h-10" />
          </Link>
          <FormatAlignLeftIcon onClick={toggleNav} style={{ cursor: "pointer" }} />
        </div>

        <div
          className={`fixed left-0 top-0 z-50 h-full w-[250px] bg-[#E6E6E6] transition-transform duration-300 ${
            isNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4">
            <Link href="/" className="content-center">
              <img src="/images/Mindra PNG@4x 1.svg" alt="logo" className="h-8" />
            </Link>
            <RxCross2 className="text-[#121212]" onClick={toggleNav} style={{ cursor: "pointer" }} />
          </div>

          <div className="mt-4 flex flex-col items-start space-y-2 p-4">
            <Links isCollapsed={false} />

            <Link href="/logout" className="fixed bottom-2 mt-10 flex items-center gap-2 pb-4 text-[#CB4F25]">
              <Image src="/Icons/Logout.svg" width={20} height={20} alt="logout" />
              <p className="mt-1">Logout</p>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default DashboardNav
