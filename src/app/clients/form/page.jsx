'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const FormClient = () => {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState({
    firstName:"",
    lastName:"",
    idNumber:"",
    celPhone:"",
    address:"",
    email:"" 
  })

  const getClient = async () => {
    try {
      const response = await fetch('/api/clients/'+params.id);
      const dataClient = await response.json();
      setClient(dataClient);
    } catch (error) {
      console.log('Failed to fetch client information', error)
    }
  };

  const createClient = async () => {
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        body: JSON.stringify(client),
        headers: {"Content-Type" : "application/json"}
      })
      if(response.ok) {
        router.back();
        router.refresh();
      }
    } catch (error) {
      console.log('Failed to create client', error)
    }
  };

  const updateClient = async ()=> {
    try {
      const response = await fetch(`/api/clients/${params.id}`, 
      {
        method:'PUT',
        body:JSON.stringify(client),
        headers: {"Content-Type": "application/json"}
      });
      const dataClient = await response.json();
      router.back();
      router.refresh();
    } catch (error) {
      console.log('Failed to update client', error)
    }
  };

  const handleChange = (e) => {
    setClient({...client, [e.target.name]: e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!params.id) await createClient()
      else await updateClient();      
    } catch (error) {
      console.log('Failed to create client', error)
    }
  };

  const handleDelete = async () => {
    try {
      if(window.confirm('Esta seguro de eliminar el cliente?')) {
        const response = await fetch('/api/clients/'+params.id,
        { method: 'DELETE'})      
        router.back();
        router.refresh();
      }
    } catch (error) {
      console.log('Failed to delete the client',error)
    }
  };

  const handleBack = () => {
    router.back()
    router.refresh()
  };


  useEffect(()=>{
    if(params.id) getClient();
  },[]);

  return (
    <section className='bg-slate-200 rounded-sm py-3 px-2 flex-grow border-blue-600'> 
      <div className='flex justify-between items-center rounded-sm bg-slate-100 py-2 px-4'>
        <h1 className='font-semibold text-xl'>
          { !params.id ? "Crear Cliente" : "Modificar Cliente" }
        </h1>
      </div>
      <hr className="bg-blue-300"></hr>
      <div className="bg-white col-span-8 w-full px-4 py-2"> 
      <form className='bg-white p-5 w-full flex flex-wrap gap-4 border border-slate-100' onSubmit={handleSubmit}>
        <div className="flex flex-col w-[45%]">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                Nombres
              </span>    
            </label> 
            <input type='text' name='firstName' placeholder='nombres...'
              className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
              onChange={handleChange} value={client.firstName}
              required>
            </input>
          </div>

          <div className="flex flex-col w-[45%]">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                Apellido
              </span>    
            </label> 
            <input type='text' name='lastName' placeholder='apellidos...'
              className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
              onChange={handleChange} value={client.lastName}
              required>
            </input>
          </div>

          <div className="flex flex-col w-[45%]">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                No de Identificacion
              </span>    
            </label> 
            <input type='text' name='idNumber' placeholder='No de identificacion...'
              className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
              onChange={handleChange} value={client.idNumber}>
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
              onChange={handleChange} value={client.celPhone}
              required>
            </input>
          </div>

          <div className="flex flex-col w-[45%]">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                Direccion 
              </span>    
            </label> 
            <input type='text' name='address' placeholder='Direccion...'
              className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
              onChange={handleChange} value={client.address}>
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
              onChange={handleChange} value={client.email}
              required>
            </input>
          </div>

          <hr className="bg-blue-300 border w-full"></hr>
        <div className='flex justify-between w-full'>
          <button type='submit'
            className='bg-blue-600 text-white md:font-semibold sm:px-3 sm:py-1.5 hover:bg-blue-300 hover:text-black
            text-sm hover:border-blue-600 border rounded-md font-normal px-2 py-1'>
            { !params.id ? 'Crear' : 'Modificar'}
          </button>
          {
            params.id &&
            <button type='button' onClick={handleDelete}
              className='bg-red-600 text-white md:font-semibold px-3 py-1.5   hover:bg-red-300 hover:text-black
              text-sm hover:border-red-600 border rounded-md font-normal'>
              Eliminar 
            </button>
          }

          <button type='button'onClick={handleBack}
            className='bg-green-600 text-white md:font-semibold px-3 py-1.5 hover:bg-green-300 hover:text-black
            text-sm hover:border-green-600 border rounded-md font-normal'>
            Ir Atras
          </button>
        </div>

      </form>
      </div>
    </section>
  )
}

export default FormClient;
