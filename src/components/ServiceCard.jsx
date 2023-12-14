import Link from 'next/link'

const ServiceCard = ({service}) => {
  return (
    <Link href={'/services/'+service._id}>
      <div className='bg-green-300 p-5 text-white rounded-md hover:cursor-pointer hover:bg-green-400'>
        <h3 className='text-2xl font-bold'>{service.name}</h3>
        <p className='text-slate-700'>{service.description}</p>
        <p className='text-slate-800 font-semibold mt-1'>$ {service.price}</p>
      </div>
    </Link>
  )
};

export default ServiceCard;