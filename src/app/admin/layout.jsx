import React from 'react'
import AdminBar from '../../components/AdminBar';

const layout = ({children}) => {
  return (
  <main className='bg-blue-50 min-h-screen flex gap-2 p-2 mt-20'>
    <AdminBar />
    { children }
  </main>
  )
}

export default layout