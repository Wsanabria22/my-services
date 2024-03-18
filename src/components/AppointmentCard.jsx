import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const AppointmentCard = ({appointment}) => {
  const router = useRouter();
  const {_id: _id1} = appointment;
  const {_id } = appointment.service;
  const [dayHours, setDayHours ] = useState([ 
    "7:00am","7:15am","7:30am","7:45am",
    "8:00am","8:15am","8:30am","8:45am",
    "9:00am","9:15am","9:30am","9:45am",
    "10:00am","10:15am","10:30am","10:45am",
    "11:00am","11:15am","11:30am","11:45am",
    "12:00pm","12:15pm","12:30am","12:45pm",
    "1:00pm","1:15pm","1:30pm","1:45pm",
    "2:00pm","2:15pm","2:30pm","2:45pm",
    "3:00pm","3:15pm","3:30pm","3:45pm",
    "4:00pm","4:15pm","4:30pm","4:45pm",
    "5:00pm","5:15pm","5:30pm","5:45pm",
    "6:00pm","6:15pm","6:30pm","6:45pm",
    "7:00pm","7:15pm","7:30pm","7:45pm",
    "8:00pm","8:15pm","8:30pm","8:45pm",
  ]);

  const deleteAppointment = async () => {
    try {
      const response = await fetch(`/api/appointments/${_id1}`, {
        method: 'DELETE',
      });
      if(response.ok) {
        const deletedAppointment = await response.json();
        return deletedAppointment;
      } else return false;
    } catch (error) {
      console.log('Failed to delete appointment information', error);
    }
  };

  const deleteJournals = async () => {
    try {
      const response = await fetch('/api/journals/'+_id1,{
        method:'DELETE',
      })
      if(response.ok) return await response.json()
      else return false;
    } catch (error) {
      console.log('Failed to delete journals appointments', error);
    }
  };

  const handleBack = () => {
    router.back()
    router.refresh()
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if(window.confirm('Esta seguro de eliminar la cita agendada?')) {
      try {
        const deletedAppointment = await deleteAppointment();
        if(deletedAppointment) {
          const deletedJournal = deleteJournals();
          if(deletedJournal) handleBack();
        }
      } catch (error) {
        console.log('Failed to delete appointment', error);
      }
    }
  };

  return (
  <div className='flex flex-col border shadow-md p-2 max-w-[500px]'>
    <section className='flex gap-4 justify-start items-center'>
      { appointment.service.picturePath &&
        <div className='h-[60px] w-[100px] m-2 border bg-slate-50 border-slate-400 mb-4'>
          <img src={`/images/${appointment.service.picturePath}`}
            alt={appointment.service?.name}
            className='object-fill h-full w-full'
          />
        </div>
      }
      <div className='mb-4'>
        <h2 className='text-2xl font-bold'>{appointment.service.name}</h2>
        <p>{appointment.service.description}</p>
      </div>
    </section>
    <hr className="bg-blue-300 border w-auto"></hr>
    <section className='flex gap-2 p-2'>
      <div className='flex flex-row flex-wrap gap-3 w-[50%]'>
        <div className="flex flex-col w-full">
          <label className="block">
            <span className="text-sm text-satoshi font-semibold text-gray-700">
              Profesional:
            </span>    
          </label> 
          <p className="bg-slate-50 text-sm text-satoshi font-semibold text-gray-700 border rounded border-slate-200 px-2 py-1 shadow-md" >
            {appointment.professional.firstName+" "+appointment.professional.lastName}
          </p> 
        </div>

        <div className="flex flex-col w-[50%]">
          <label className="block">
            <span className="text-sm text-satoshi font-semibold text-gray-700">
              Fecha: 
            </span>    
          </label> 
          <p className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1 shadow-md">
            {appointment.serviceDate.slice(0,10)}
          </p>
        </div>

        <div className="flex flex-col w-[35%]">
          <label className="block">
            <span className="text-sm text-satoshi font-semibold text-gray-700">
              Hora: 
            </span>    
          </label> 
          <p className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1 shadow-md">
            {dayHours[appointment.idxStartHour]}
          </p>
        </div>
      </div>
      <div className='flex justify-center items-center w-[45%]'>
        { appointment.professional.picturePath &&
          <div className='h-full w-full m-2 border border-slate-400 mb-4'>
            <img src={`/images/${appointment.professional.picturePath}`} 
              alt={appointment.service?.name}
              className='object-fill h-full w-full'
            />
          </div>
        }
      </div>
      <div className='flex flex-col gap-3 justify-center items-center w-[15%] h-full p-2'>
        <Link href={"/appointments/front/"+_id+"/"+_id1} className="w-full h-[35%] shadow-md border bg-green-200 rounded-md p-1 hover:bg-green-800">
          <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" className="w-full h-full text-green-600">
            <path d="M1.172,19.119A4,4,0,0,0,0,21.947V24H2.053a4,4,0,0,0,2.828-1.172L18.224,9.485,14.515,5.776Z"/>
            <path d="M23.145.855a2.622,2.622,0,0,0-3.71,0L15.929,4.362l3.709,3.709,3.507-3.506A2.622,2.622,0,0,0,23.145.855Z"/>
          </svg>
            {/* <p className='font-semibold text-center items-center flex'>Editar</p> */}
        </Link>
        <button onClick={handleDelete} className="w-full h-[35%] shadow-md border bg-red-500 rounded-md p-1 hover:bg-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" className="w-full h-full text-red-500">
            <path d="M23,3H18V2.5A2.5,2.5,0,0,0,15.5,0h-7A2.5,2.5,0,0,0,6,2.5V3H1V6H3V21a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V6h2ZM18,21H6V6H18Z"/>
            <rect x="8" y="9" width="3" height="9"/>
            <rect x="13" y="9" width="3" height="9"/>
          </svg>

            {/* <p className='font-semibold text-center items-center flex'>Editar</p> */}
        </button>
      </div>
    </section>
  </div>
  )
}

export default AppointmentCard