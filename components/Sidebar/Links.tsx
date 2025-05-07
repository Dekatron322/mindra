"use client"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { AnalyticsIcon, DashboardIcon, HistoryIcon, NoteIcon } from "./Icons"
import SettingIcon from "public/setting-icon"

interface LinkItem {
  name: string
  href: string
  icon: ({ isActive }: { isActive: boolean }) => JSX.Element
  sublinks?: SublinkItem[] // Make this optional
}

interface SublinkItem {
  name: string
  href: string
}

const links: LinkItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { name: "Notes", href: "/notes", icon: NoteIcon },
  { name: "Categories", href: "/categories", icon: NoteIcon },
  { name: "Analytics", href: "/analytics", icon: AnalyticsIcon },

  { name: "History", href: "/history", icon: HistoryIcon },
  { name: "Settings", href: "/settings", icon: SettingIcon },
]

interface LinksProps {
  isCollapsed: boolean
}

export function Links({ isCollapsed }: LinksProps) {
  const pathname = usePathname()
  const [expandedLink, setExpandedLink] = useState<string | null>(null)

  const handleExpand = (linkName: string) => {
    setExpandedLink(expandedLink === linkName ? null : linkName)
  }

  return (
    <div className="flex flex-col border-black">
      {links.map((link) => {
        const LinkIcon = link.icon
        const hasSublinks = Array.isArray(link.sublinks) && link.sublinks.length > 0
        const isActive = link.href ? pathname.startsWith(link.href) : false
        const hasActiveSublink = hasSublinks && link.sublinks!.some((sublink) => pathname.startsWith(sublink.href))
        const isExpanded = expandedLink === link.name
        const isLinkActive = link.href ? isActive : hasActiveSublink

        // Determine border radius based on collapse and expand state
        const borderRadiusClass = isCollapsed
          ? "rounded-full"
          : hasSublinks
          ? isExpanded
            ? "rounded-full"
            : "rounded-full "
          : "rounded-full"

        return (
          <div key={link.name}>
            <div
              onClick={() => hasSublinks && handleExpand(link.name)}
              className={clsx("dashboard-style", borderRadiusClass, { "active-dashboard": isLinkActive })}
            >
              <Link href={link.href || "#"}>
                <div className="flex w-full items-center justify-between gap-2 pl-3">
                  <LinkIcon isActive={isLinkActive} />
                  <p
                    className={clsx("text-sm font-medium transition-opacity duration-500", {
                      hidden: isCollapsed,
                      "font-extrabold transition-opacity duration-500": isLinkActive,
                    })}
                  >
                    {link.name}
                  </p>
                  {hasSublinks && (
                    <img
                      src="/Icons/CaretDown.png"
                      className={clsx("mr-20 transition-transform duration-300", {
                        "rotate-180 transform": isExpanded,
                        hidden: isCollapsed,
                      })}
                      alt="Caret Icon"
                    />
                  )}
                </div>
              </Link>
            </div>
            {isExpanded && !isCollapsed && hasSublinks && (
              <div className="relative ml-9 border-l-2 border-gray-300">
                {link.sublinks!.map((sublink) => {
                  const isSublinkActive = pathname.startsWith(sublink.href)
                  return (
                    <Link
                      key={sublink.name}
                      href={sublink.href}
                      className={clsx("dashboard-style block rounded-md", {
                        "active-dashboard": isSublinkActive,
                      })}
                    >
                      <div className="flex items-center gap-2 pl-5">
                        <p
                          className={clsx("text-sm font-semibold", {
                            "font-extrabold": isSublinkActive,
                          })}
                        >
                          {sublink.name}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
