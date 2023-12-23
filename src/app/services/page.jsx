import Image from 'next/image'
import { connectToDB } from '../../utils/database'
import Service from '../../models/Service';
import ServiceCard from '../../components/ServiceCard';
import Link from 'next/link';

const loadServices = async () =>{
  try {
    await connectToDB();
    const services = await Service.find();
    return services;
  } catch (error) {
    console.log('Error al cargar los servicios', error)
  }
}

export default async function Services() {
  const allServices = await loadServices();
  return (
    <section className='bg-slate-200 rounded-sm py-3 px-2 flex-grow'>
      <div className="bg-slate-100 rounded-sm px-4 py-2 flex justify-between">
        <h2 className="text-lg">Administrar Servicios</h2>
        <Link href={'/services/form'}>
          <button className='bg-blue-600 text-white md:font-semibold sm:px-3 sm:py-1.5 hover:bg-blue-300 hover:text-black
            text-sm hover:border-blue-600 border rounded-md font-normal px-2 py-1'>
            Nuevo
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2 p-2">
        {
          allServices && allServices.map((service) => (
            <ServiceCard service={service} key={service._id}/>
          ))
        }
      </div>
    </section>
  )
}
