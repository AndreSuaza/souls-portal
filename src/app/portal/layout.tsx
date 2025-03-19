
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <>
      <main className="w-full px-6">
        { children }
      </main>
    </>
        
  );
}
