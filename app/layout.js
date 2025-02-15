import './globals.css'

export const metadata = {
  title: 'Yayasan Sirih Pinang Kebaikan',
  description: 'Website Resmi Yayasan Sirih Pinang Kebaikan',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}