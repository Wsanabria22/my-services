import Image from 'next/image'
import { connectToDB } from '@/utils/database';
import Service from '@/models/Service';

const loadServices = async () =>{
  const services = await Service.find();
  console.log(services);
}

export default async function Home() {
  const allServices = await loadServices();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>My Services</h1>
      {
        allServices && allServices.map((service) => (
          <div key={service._id}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
          </div>
        ))
      }
    </main>
  )
}
