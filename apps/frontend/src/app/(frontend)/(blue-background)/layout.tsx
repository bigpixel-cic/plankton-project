export default function BlueBackgroundLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex-1 bg-linear-to-b from-teal-600 from-30% to-sky-800 to-100% dark:from-teal-950 dark:to-sky-950">
      <div className="flex flex-col max-w-7xl mx-6 md:mx-12 lg:mx-auto mt-12 mb-32 space-y-12">
        {children}
      </div>
    </main>
  );
}
