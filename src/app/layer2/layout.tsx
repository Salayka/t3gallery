export default function RootLayout({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    return (
      <div lang="en" className="">
        <div className = "w-full">Second Layout</div>
        {children}
      </div>
    );
  }