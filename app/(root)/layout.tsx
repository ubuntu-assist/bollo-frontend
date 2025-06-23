import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import WelcomeGuideWrapper from '@/components/core/welcome-guide-wrapper'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      {/* <JoinWaitlistCTA /> */}
      <WelcomeGuideWrapper />
    </>
  )
}
