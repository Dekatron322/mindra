import "styles/tailwind.css"
import ThemeProviders from "components/ProvidersComponents/ThemeProviders"
import ReduxProvider from "./api/providers/ReduxProvider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeProviders>{children}</ThemeProviders>
        </ReduxProvider>
      </body>
    </html>
  )
}
