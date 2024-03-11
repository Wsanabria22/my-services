'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AppointmentCard from '../../components/AppointmentCard';

const MyAppointments = () => {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession()

  const [client, setClient] = useState({_id:"", firstName:""});
  const [clientAppointments, setClientAppointments] = useState([])

  const getClient = async () => {
    try {
      const response = await fetch('/api/client/'+session.user.email);
      const dataClient = await response.json();
      console.log('Client',dataClient)
      if (dataClient[0]) {
        setClient(dataClient[0]);
        return dataClient[0]
      } else { 
          alert('Cliente no encontrado')
          return false
      }
    } catch (error) {
      console.log('Failed to fetch client information', error)
    }
  };

  const getAppointments = async (dataClient) => {
    try {
      const response = await fetch('/api/myappointments/'+dataClient._id);
      const dataAppointments = await response.json();
      console.log('dataAppointments', dataAppointments);
      setClientAppointments(dataAppointments);
    } catch (error) {
      console.log('Failed to fetch client appointments information', error)
    }
  };

  useEffect( () => {
    async function fetchData () {
      if(session) {
        console.log('Session',session);
        const dataClient = await getClient();
        console.log('Client',client);
        await getAppointments(dataClient);
      }
      else signIn();
    }
  fetchData();
  },[])

  return (
    <main className='border shadow-md mx-2'>
      <section className='mt-12 padding-x padding-y max-width'>
        <div className='flex rounded-sm border border-slat-600 bg-slate-50 home__text-container'>
          <h1 className='text-3xl font-extrabold'>Mis Citas</h1>
        </div>
      </section>

      <hr className="bg-blue-300 border w-auto padding-x"></hr>
      <section className="bg-white flex flex-wrap gap-3 padding-x padding-y max-width">
        { clientAppointments && clientAppointments?.map((appointment) => (
          <AppointmentCard key={appointment._id} appointment={appointment} />
          ))
        }
      </section>
    </main>
  )
}

export default MyAppointments