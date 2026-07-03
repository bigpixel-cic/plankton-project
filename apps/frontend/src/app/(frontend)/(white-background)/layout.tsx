export default function BlueBackgroundLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex-1 bg-white dark:bg-black text-slate-700 dark:text-slate-300">
      <div className="flex flex-col max-w-7xl mx-3 md:mx-6 lg:mx-auto mt-12 mb-32 space-y-12">
        {children}
      </div>
    </main>
  );
}
