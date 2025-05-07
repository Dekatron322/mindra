"use client"
import Link from "next/link"
import React, { useState } from "react"
import { Links } from "./Links"
import { CollapsedLogoIcon, LogoIcon, SettingsIcon, SupportIcon } from "./Icons"

import clsx from "clsx"
import LogoutIcon from "../../public/logout-icon"

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
      className={clsx("sidebar flex h-full flex-col justify-between border-r border-[#E4E4E4] max-sm:hidden", {
        "w-20": isCollapsed,
        "w-64": !isCollapsed,
      })}
    >
      <div className="h-full justify-between border-0 border-red-700 lg:mt-2 lg:h-auto">
        <div className=" border-[#E4E4E4] px-7 pb-3 transition-opacity lg:block">
          <Link href="/">{isCollapsed ? <CollapsedLogoIcon /> : <LogoIcon />}</Link>
        </div>

        <div className="mb-2 h-full   border-[#E4E4E4] px-2 lg:h-auto lg:space-y-1">
          <Links isCollapsed={isCollapsed} />
        </div>
      </div>
      <div className="my-4  h-auto items-center justify-between  px-6">
        {!isCollapsed && (
          <p className=" hidden text-sm  font-bold  text-[#6C757D] lg:block 2xl:text-base">Recent Session</p>
        )}
        <div className="flex items-center space-x-2 border-0 pt-5 text-[#6C757D]">
          {!isCollapsed && (
            <div className="  flex items-center gap-2   text-xs 2xl:text-sm ">
              <div className="h-2 w-2 rounded-full bg-[#6C757D]"></div> <p>Lorem Ipsum</p>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 border-0 pt-5 text-[#6C757D]">
          {!isCollapsed && (
            <div className="  flex items-center gap-2   text-xs 2xl:text-sm ">
              <div className="h-2 w-2 rounded-full bg-[#6C757D]"></div> <p>Lorem Ipsum</p>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 border-0 pt-5 text-[#6C757D]">
          {!isCollapsed && (
            <div className="  flex items-center gap-2   text-xs 2xl:text-sm ">
              <div className="h-2 w-2 rounded-full bg-[#6C757D]"></div> <p>Lorem Ipsum</p>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 border-0 pt-5 text-[#6C757D]">
          {!isCollapsed && (
            <div className="  flex items-center gap-2   text-xs 2xl:text-sm ">
              <div className="h-2 w-2 rounded-full bg-[#6C757D]"></div> <p>Lorem Ipsum</p>
            </div>
          )}
        </div>
      </div>
      <div className="my-4  h-auto items-center justify-between border-t px-6">
        <div className="flex items-center space-x-2 border-0 pt-5 text-[#747A80]">
          <SupportIcon />
          {!isCollapsed && <p className=" hidden text-xs  lg:block 2xl:text-sm">Support</p>}
        </div>
        <div className="flex items-center space-x-2 border-0 pt-5 text-[#747A80]">
          <LogoutIcon />
          {!isCollapsed && <p className=" hidden text-xs text-[#CB4F25]  lg:block 2xl:text-sm">Logout</p>}
        </div>
      </div>
    </div>
  )
}

export default SideBar
