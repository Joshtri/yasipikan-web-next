import './globals.css'

export const metadata = {
  title: 'Yayasan Sirih Pinang Kebaikan',
  description: 'Website Resmi Yayasan Sirih Pinang Kebaikan',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="google-site-verification" content="IBA3YvOhkg3Pq9gQRn66PanVgTSoCrR-2dt9_HEN8hk" />
      <body>
        {children}
      </body>
    </html>
  );
}