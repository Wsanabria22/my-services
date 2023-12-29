import React from 'react'
import Link from 'next/link'

const ProfessionalCard = ({professional}) => {
  return (
    <Link href={'/professionals/'+professional._id}>
      <div className='col-span-1 bg-green-300 p-5 text-white rounded-md hover:cursor-pointer hover:bg-green-400'>
        <h3 className='text-2xl font-bold'>{professional.firstName+" "+professional.lastName }</h3>
        <p className='text-slate-700'>ID # {professional.idNumber}</p>
        <p className='text-slate-800 font-semibold mt-1'>{professional.title}</p>
      </div>
    </Link>
  )
}

export default ProfessionalCard