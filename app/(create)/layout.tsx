export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className='bg-n20 pb-10'>{children}</main>
}
