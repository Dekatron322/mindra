import Image from "next/image"
import Link from "next/link"

export const LogoIcon = () => (
  <>
    <Link href="/" className="icon-style mb-5 content-center">
      <div className=" flex items-center justify-center gap-2">
        <img src="/images/Mindra PNG@4x 1.svg" alt="logo" className="h-10" />
      </div>
    </Link>
  </>
)

export const CollapsedLogoIcon = () => (
  <>
    <Link href="/" className="icon-style content-center">
      <div className=" flex items-center justify-center gap-2">
        <img src="/images/Mindra Icon.svg" alt="logo" className="h-11" />
      </div>
    </Link>
    <Link href="/" className="dark-icon-style content-center ">
      <div className=" flex items-center justify-center gap-2">
        <img src="/images/Mindra Icon.svg" alt="logo" className="h-11" />
      </div>
    </Link>
  </>
)

export const DashboardIcon = ({ isActive }: { isActive: boolean }) => (
  <Image
    src={isActive ? "/images/home-icon-active.svg" : "/images/home-icon.svg"}
    alt="Dashboard"
    width={20}
    height={20}
  />
)

export const NoteIcon = ({ isActive }: { isActive: boolean }) => (
  <Image
    src={isActive ? "/images/note-icon-active.svg" : "/images/note-icon.svg"}
    alt="Dashboard"
    width={20}
    height={20}
  />
)

export const AnalyticsIcon = ({ isActive }: { isActive: boolean }) => (
  <Image
    src={isActive ? "/images/analytics-icon-active.svg" : "/images/analytics-icon.svg"}
    alt="Dashboard"
    width={20}
    height={20}
  />
)

export const HistoryIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/images/history-active.svg" : "/images/history.svg"} alt="Dashboard" width={20} height={20} />
)

export const EstatesIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Estates-active.svg" : "/Icons/Estates.svg"} alt="Estates" width={20} height={20} />
)

export const SetingIcon = ({ isActive }: { isActive: boolean }) => (
  <Image
    src={isActive ? "/images/setting-icon-active.svg" : "/images/setting-icon.svg"}
    alt="Estates"
    width={20}
    height={20}
  />
)

export const HomeIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Home-active.svg" : "/Icons/Home.svg"} alt="Home" width={20} height={20} />
)

export const SupportIcon = ({ isActive }: { isActive?: boolean }) => (
  <Image src={isActive ? "/images/support.svg" : "/images/support.svg"} alt="Utility" width={20} height={20} />
)

export const LogoutIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Utility-active.svg" : "/Icons/Logout.svg"} alt="Utility" width={20} height={20} />
)

export const SettingsIcon = ({ isActive = false }: { isActive?: boolean }) => (
  <Image src={isActive ? "/Icons/setting-2-active.svg" : "/Icons/setting-2.svg"} alt="Utility" width={20} height={20} />
)
