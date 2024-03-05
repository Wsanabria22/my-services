import React, { useState } from 'react'

const AppointmentCard = ({appointment}) => {

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

  return (
  <div className='flex flex-col border shadow-md p-2'>
    <section className='flex gap-4 justify-start items-center w-full'>
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
    <section className='flex p-2'>
      <div className='flex flex-row flex-wrap gap-3 w-[60%]'>
        <div className="flex flex-col w-[80%]">
          <label className="block">
            <span className="text-sm text-satoshi font-semibold text-gray-700">
              Profesional:
            </span>    
          </label> 
          <p className="bg-slate-50 text-sm text-satoshi font-semibold text-gray-700 border rounded border-slate-200 px-2 py-1 shadow-md" >
            {appointment.professional.firstName+" "+appointment.professional.lastName}
          </p> 
        </div>

        <div className="flex flex-col w-[40%]">
          <label className="block">
            <span className="text-sm text-satoshi font-semibold text-gray-700">
              Fecha: 
            </span>    
          </label> 
          <p className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1 shadow-md">
            {appointment.serviceDate.slice(0,10)}
          </p>
        </div>

        <div className="flex flex-col w-[30%]">
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
      <div className='flex justify-center items-center w-[40%]'>
      { appointment.professional.picturePath &&
        <div className='h-[100px] w-[140px] m-2 border border-slate-400 mb-4'>
          <img src={`/images/${appointment.professional.picturePath}`} 
            alt={appointment.service?.name}
            className='object-fill h-full w-full'
          />
        </div>
      }
      </div>
    </section>
  </div>
  )
}

export default AppointmentCard