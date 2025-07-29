export const metadata = {
  title: 'Equinox Sorting Tracker',
  description: 'Track start/end time and total hours for sorting team.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black font-sans">{children}</body>
    </html>
  );
}
