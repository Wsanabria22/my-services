'use client';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const FormProfessional = () => {
  const params = useParams();
  const router = useRouter();

  const [ professional, setProfessional ] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    title: "",
  })

  const getProfessional = async () => {
    try {
      const response = await fetch('/api/professionals/'+params.id);
      const dataProfessional = await response.json();
      setProfessional(dataProfessional);
    } catch (error) {
      console.log('Failed to fetch professional information', error)
    }
  };

  const createProfessional = async () => {
    try {
      const response = await fetch('/api/professionals', {
        method: 'POST',
        body: JSON.stringify(professional),
        headers: {"Content-Type" : "application/json"}
      })
      if(response.ok) {
        router.back();
        router.refresh();
      }
    } catch (error) {
      console.log('Failed to create professional', error)
    }
  };

  const updateProfessional = async ()=> {
    try {
      const response = await fetch(`/api/professionals/${params.id}`, 
      {
        method:'PUT',
        body:JSON.stringify(professional),
        headers: {"Content-Type": "application/json"}
      });
      const dataProfessional = await response.json();
      router.back();
      router.refresh();
    } catch (error) {
      console.log('Failed to update professional', error)
    }
  };

  const handleChange = (e) => {
    setProfessional({...professional, [e.target.name]: e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!params.id) await createProfessional()
      else await updateProfessional();      
    } catch (error) {
      console.log('Failed to create professional', error)
    }
  };

  const handleDelete = async () => {
    try {
      if(window.confirm('Esta seguro de eliminar el profesional?')) {
        const response = await fetch('/api/professionals/'+params.id,
        { method: 'DELETE'})      
        router.back();
        router.refresh();
      }
    } catch (error) {
      console.log('Failed to delete the professional',error)
    }
  };

  const handleBack = () => {
    router.back()
    router.refresh()
  };

  useEffect(() => {
    if (params.id) {
      getProfessional();
    }
  }, [])

  return (
    <section className='bg-slate-200 rounded-sm py-3 px-2 flex-grow border-blue-600'> 
      <div className='flex justify-between items-center rounded-sm bg-slate-100 py-2 px-4'>
        <h1 className='font-semibold text-xl'>
          { !params.id ? "Crear Profesional" : "Modificar Profesional" }
        </h1>
      </div>
      <hr className="bg-blue-300"></hr>
      <div className="bg-white col-span-8 w-full px-4 py-2"> 
      <form className='bg-white p-5 w-full flex flex-wrap gap-4 border border-slate-100' onSubmit={handleSubmit}>
        <div className="flex flex-col w-full">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                Nombres
              </span>    
            </label> 
            <input type='text' name='firstName' placeholder='nombres...'
              className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
              onChange={handleChange} value={professional.firstName}
              required>
            </input>
          </div>

          <div className="flex flex-col w-full">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                Apellido
              </span>    
            </label> 
            <input type='text' name='lastName' placeholder='apellidos...'
              className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
              onChange={handleChange} value={professional.lastName}
              required>
            </input>
          </div>

          <div className="flex flex-col w-full">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                No de Identificacion
              </span>    
            </label> 
            <input type='text' name='idNumber' placeholder='No de identificacion...'
              className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
              onChange={handleChange} value={professional.idNumber}
              required>
            </input>
          </div>

          <div className="flex flex-col w-full">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                Especialidad / Cargo
              </span>    
            </label> 
            <input type='text' name='title' placeholder='Especialidad o Cargo...'
              className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
              onChange={handleChange} value={professional.title}
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
          <button type='button' onClick={handleDelete}
            className='bg-red-600 text-white md:font-semibold px-3 py-1.5   hover:bg-red-300 hover:text-black
            text-sm hover:border-red-600 border rounded-md font-normal'>
            Eliminar 
          </button>
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

export default FormProfessional