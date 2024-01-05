import React from 'react';
import { connectToDB } from '../../utils/database';
import Client from '../../models/Cient';
import Link from 'next/link';
import ClientCard from '../../components/ClientCard';

const getClients = async () => {
  try {
    await connectToDB();
    const clients = Client.find();
    return clients;
  } catch (error) {
    console.log('Failed to load Clients', error);
  }
};

const Clients = async () => {
  const allClients = await getClients();

  return (
    <section className='bg-slate-200 rounded-sm py-3 px-2 flex-grow'>
      <div className="bg-slate-100 rounded-sm px-4 py-2 flex justify-between">
        <h2 className="text-lg">Administrar Clientes</h2>
        <Link href={'/clients/form'}>
          <button className='bg-blue-600 text-white md:font-semibold sm:px-3 sm:py-1.5 hover:bg-blue-300 hover:text-black
            text-sm hover:border-blue-600 border rounded-md font-normal px-2 py-1'>
            Nuevo
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
        {
          allClients && allClients.map((client) => (
            <ClientCard key={client._id} client={client}/>
          ))
        }
      </div>
    </section>

  )
}

export default Clients 