import Image from 'next/image'
import { connectToDB } from '@/utils/database';
import Service from '@/models/Service';
import ServiceCard from '@/components/ServiceCard';

const loadServices = async () =>{
  try {
    await connectToDB();
    const services = await Service.find();
    return services;
  } catch (error) {
    console.log('Error al cargar los servicios', error)
  }
}

export default async function Home() {
  const allServices = await loadServices();
  return (
    <div className="grid grid-cols-3 gap-2">
      {
        allServices && allServices.map((service) => (
          <ServiceCard service={service} key={service._id}/>
        ))
      }
    </div>
  )
}
