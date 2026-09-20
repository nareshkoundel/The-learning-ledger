import "./globals.css";
export const metadata={title:"The Learning Ledger",description:"A personal knowledge journal about learning, building and sharing."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}