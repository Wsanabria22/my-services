'use client'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";

const FormAppointment = () => {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  console.log('Session',session);

  const [service, setService] = useState({
    name: '',
    description: '',
    duration: 0,
    price: 0,
    picturePath:"",
    picture: "",
  });

  const [ professionals, setProfessionals ] = useState([])

  const [appointment, setAppointment] = useState({
    firstName:"",
    lastName:"",
    idNumber:"",
    celPhone:"",
    address:"",
    email:"" ,
    _idProfessional:"",
    professionalName: "",
    picturePath:"",
    dateAt: Date.now(),
    startHour: "",
    finalHour: "",
  })

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

  const getService = async () => {
    try {
      const response = await fetch('/api/services/'+params.id)
      const dataService = await response.json()
      setService(dataService)
    } catch (error) {
      console.log('Failed to fetch service information',error)
    }
  };

  const getProfessional = async () => {
    try {
      const response = await fetch('/api/professionals');
      const dataProfessionals = await response.json();
      setProfessionals(dataProfessionals);
    } catch (error) {
      console.log('Failed to fetch professional information', error)
    }
  };

  const getClient = async () => {
    try {
      const response = await fetch('/api/client/'+session.user.email);
      const dataClient = await response.json();
      console.log(dataClient)
      if (dataClient[0]) setAppointment(dataClient[0])
      else setAppointment((prevState)=>({...prevState, firstName: session.user.name,
        lastName: session.user.name,
        email: session.user.email,
        }))
    } catch (error) {
      console.log('Failed to fetch client information', error)
    }
  };

  const handleSubmit = () => {};

  const handleDelete = () => {};

  const handleBack = () => {};

  const handleChange = (e) => {
    if(e.target.name === "startHour") {
      const indexStarHour = dayHours.indexOf(e.target.value);
      console.log((parseInt(indexStarHour) + parseInt(Math.ceil(service.duration / 15))), dayHours[(e.target.value + Math.ceil(service.duration / 15))]);
      const finalHour = dayHours[parseInt(indexStarHour) + parseInt(Math.ceil(service.duration / 15))];
      setAppointment((prevState)=>({...prevState, [e.target.name]: e.target.value, "finalHour": finalHour}))
    } else if (e.target.name === "_idProfessional") {
      const indexProfessional = professionals.findIndex((professional => professional._id === e.target.value))
      setAppointment((prevState)=>(
        {...prevState, [e.target.name]: e.target.value, 
          "picturePath": professionals[indexProfessional].picturePath,
          "professionalName": professionals[indexProfessional].firstName+" "+professionals[indexProfessional].lastName
        }))
    } else setAppointment((prevState)=>({...prevState, [e.target.name]: e.target.value}))
  };

  useEffect(() => {
    console.log(params);
    if(params.id) {
      getService();
      getProfessional();
    }
    if(session) {
      getClient();
    }
    else signIn();
  },[])


  return (
    <main className='border shadow-md mx-2'>
      <section className='mt-12 padding-x padding-y max-width'>
        <div className='flex rounded-sm border border-slat-600 bg-slate-50 home__text-container'>
          <h1 className='text-3xl font-extrabold'>Agendamiento Cita para Sesion</h1>
          <div className='flex gap-4 justify-start items-center w-full'>
            { service.picturePath &&
              <div className='h-[60px] w-[100px] m-2 border border-slate-400 mb-4'>
                <img src={`/images/${service.picturePath}`} 
                  alt={service?.name}
                  className='object-fill h-full w-full'
                />
              </div>
            }
            <div className='mb-4'>
              <h2 className='text-2xl font-bold'>{service.name}</h2>
              <p>{service.description}</p>
            </div>
          </div>
        </div>
      </section>
      <hr className="bg-blue-300 border w-auto"></hr>
      <section className="bg-white col-span-8 padding-x padding-y max-width">
      <form className='bg-white px-5 py-2 w-full flex flex-wrap gap-4' onSubmit={handleSubmit}>
        <div className="flex flex-col w-[45%]">
          <label className="block">
            <span className="text-sm text-satoshi font-semibold text-gray-700">
              Nombres
            </span>    
          </label> 
          <input type='text' name='firstName' placeholder='nombres...'
            className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
            onChange={handleChange} value={appointment.firstName}
            required>
          </input>
        </div>

        <div className="flex flex-col w-[45%]">
          <label className="block">
            <span className="text-sm text-satoshi font-semibold text-gray-700">
              Apellidos
            </span>    
          </label> 
          <input type='text' name='lastName' placeholder='apellidos...'
            className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
            onChange={handleChange} value={appointment.lastName}
            required>
          </input>
        </div>

        <div className="flex flex-col w-[45%]">
          <label className="block">
            <span className="text-sm text-satoshi font-semibold text-gray-700">
              No. Celular
            </span>    
          </label> 
          <input type='text' name='celPhone' placeholder='No de celular o mobil...'
            className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
            onChange={handleChange} value={appointment.celPhone}
            required>
          </input>
        </div>

        <div className="flex flex-col w-[45%]">
          <label className="block">
            <span className="text-sm text-satoshi font-semibold text-gray-700">
              Correo electronico 
            </span>    
          </label> 
          <input type='text' name='email' placeholder='Correo electronico...'
            className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
            onChange={handleChange} value={appointment.email}
            required>
          </input>
        </div>

        <hr className="bg-blue-300 border w-full"></hr>
        <div className='flex justify-between w-full h-auto'>
          <div className='flex flex-wrap w-[75%] gap-4'>

            <div className="flex flex-col w-[45%]">
              <label className="block">
                <span className="text-sm text-satoshi font-semibold text-gray-700">
                  Seleccionar el Profesional 
                </span>    
              </label> 
              <select name="_idProfessional" value={appointment._idProfessional} 
                className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1 shadow-md"  
                onChange={handleChange} required>
                <option value="Seleccione..." selected>Seleccione...</option>
                { professionals?.map( (professional, index) => <option 
                  key={index}
                  value={professional._id}>{professional.firstName+" "+professional.lastName}</option> ) }
              </select>
            </div>

            <div className="flex flex-col w-[25%]">
              <label className="block">
                <span className="text-sm text-satoshi font-semibold text-gray-700">
                  Fecha del Servicio
                </span>    
              </label> 
              <input type='date' name='dateAt' placeholder='Fecha del Servicio...'
                className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1 shadow-md"  
                onChange={handleChange} value={appointment.dateAt}
                required>
              </input>
            </div>

            <div className="flex flex-col w-[25%]">
              <label className="block">
                <span className="text-sm text-satoshi font-semibold text-gray-700">
                  Hora del servicio 
                </span>    
              </label> 
              <select name="startHour" value={appointment.startHour} 
                className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1 shadow-md"  
                onChange={handleChange} required>
                <option value="Seleccione..." selected>Seleccione...</option>
                { dayHours?.map( (hour, index) => <option 
                  key={index}
                  value={hour}>{hour}</option> ) }
              </select>
            </div>
          </div>

          { appointment.picturePath &&
            <div className='flex justify-end h-[100%] w-[15%] border border-slate-400 shadow-md rounded'>
              <img src={`/images/${appointment.picturePath}`} 
                alt={appointment?.professionalName}
                className='object-fill h-full w-full'
              />
            </div>
          }
        </div>

        <div className='col-span-8 w-full'>
          <hr className="bg-blue-300 border w-full"></hr>
          <div className='flex justify-between w-full mt-1'>
            <button type='submit'
              className='bg-blue-600 text-white md:font-semibold sm:px-3 sm:py-1.5 hover:bg-blue-300 hover:text-black
              text-sm hover:border-blue-600 border rounded-md font-normal px-2 py-1'>
              { !params.id ? 'Crear' : 'Modificar'}
            </button>
            {
              params.id &&
              <button type='button' onClick={handleDelete}
                className='bg-red-600 text-white md:font-semibold sm:px-3 sm:py-1.5 hover:bg-red-300 hover:text-black
                text-sm hover:border-red-600 border rounded-md font-normal px-2 py-1'>
                Eliminar 
              </button>
            }
            <button type='button'onClick={handleBack}
              className='bg-green-600 text-white md:font-semibold sm:px-3 sm:py-1.5 hover:bg-green-300 hover:text-black
              text-sm hover:border-green-600 border rounded-md font-normal px-2 py-1'>
              Ir Atras
            </button>
          </div>
        </div>

      </form>
      </section>
    </main>
  )
}

export default FormAppointment