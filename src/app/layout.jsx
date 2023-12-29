import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '../components/NavBar';
import Provider from '../components/Provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Services',
  description: 'Admin your services store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='border border-blue-600 min-w-fit'>
        <Provider>
          <NavBar />
         
            {children}

        </Provider>
      </body>
    </html>
  )
}
