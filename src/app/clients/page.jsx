'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ClientCard from '../../components/ClientCard';

const Clients = () => {
  const [allClients, setAllClients] = useState([])

  const getClients = async () => {
    try {
      const response = await fetch('/api/clients');
      const dataClients = await response.json();
      setAllClients(dataClients);
    } catch (error) {
      console.log('Failed to load all Clients', error);
    }
  };

  useEffect(() => {
    const dataFetch = async () => {
      await getClients();
    }

    dataFetch();
  }, []);

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