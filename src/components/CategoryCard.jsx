import Link from 'next/link'
import React from 'react'

const ClientCard = ({category}) => {
  return (
    <Link href={'/categories/'+category._id}>
      <div className='col-span-1 bg-green-300 p-5 text-white rounded-md hover:cursor-pointer hover:bg-green-400'>
        <h3 className='text-2xl font-bold'>{category.name}</h3>
        <p className='text-slate-700'>{category.description}</p>
      </div>
    </Link>
  )
}

export default ClientCard