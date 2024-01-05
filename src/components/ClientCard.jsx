import Link from 'next/link'
import React from 'react'

const ClientCard = ({client}) => {
  return (
    <Link href={'/clients/'+client._id}>
      <div className='col-span-1 bg-green-300 p-5 text-white rounded-md hover:cursor-pointer hover:bg-green-400'>
        <h3 className='text-2xl font-bold'>{client.firstName+" "+client.lastName }</h3>
        <p className='text-slate-700'>ID # {client.idNumber}</p>
        <p className='text-slate-800 font-semibold mt-1'>{client.celPhone}</p>
      </div>
    </Link>
  )
}

export default ClientCard