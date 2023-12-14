'use client'
import {useState, useEffect} from 'react';
import { useRouter, useParams } from 'next/navigation';

const FormService = () => {
  const router = useRouter();
  const params = useParams();
  const [service, setService] = useState({
    name: '',
    description: '',
    duration: 0,
    price: 0,
  });

  const handleChange = (e) => setService({...service, [e.target.name]:e.target.value});

  const createService = async () => {
    try {
      const response = await fetch('/api/services',
      {
        method: 'POST',
        body: JSON.stringify(service),
        headers: { "Content-Type" : "application/json"}
      })
      console.log(await response.json())
      if(response.ok) {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.log(error)
    }
  };

  const getService = async () => {
    try {
      const response = await fetch('/api/services/'+params.id)
      const dataService = await response.json()
      setService(dataService)
    } catch (error) {
      console.log(error)
    }
  };

  const updateService = async () => {
    try {
      const response = await fetch(`/api/services/${params.id}`,
      {
        method:'PUT',
        body: JSON.stringify(service),
        headers: {'Content-Type': 'application/json'}
      })
      const dataService = await response.json()
      console.log(dataService)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!params.id) await createService();
    else updateService();
  };

  const handleDelete = async () => {
    try {
      if(window.confirm('Esta seguro de eliminar el servicio?')) {
        const response = await fetch('/api/services/'+params.id,
        { method: 'DELETE'})      
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleBack = () => {
    router.back()
    router.refresh()
  }

  useEffect(() => {
    console.log(params);
    if(params.id) {
      getService();
    }
  },[])

  return (
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-between items-center rounded-sm bg-slate-100 py-2 px-4'>
          <h1 className='font-bold text-xl'>
            { !params.id ? "Crear Servicio" : "Modificar Servicio" }
          </h1>
          <button type='button' onClick={handleDelete}
            className='bg-red-400 px-4 py-2 cursor-pointer hover:bg-red-500 rounded-md
              font-bold text-white'>
            Eliminar
          </button>
        </div>

        <input type='text' name='name' placeholder='nombre...'
          className='bg-green-200 w-full p-4 rounded-lg my-4'
          onChange={handleChange} value={service.name}>
        </input>
        <textarea name='description' placeholder='descripcion...' rows={3}
          className='bg-green-200 w-full p-4 rounded-lg my-4'
          onChange={handleChange} value={service.description}>
        </textarea>
        <input type='number' name='duration' placeholder='duracion...'
          className='bg-green-200 w-full p-4 rounded-lg my-4'
          onChange={handleChange} value={service.duration}>
        </input>
        <input type='number' name='price' placeholder='$price...'
          className='bg-green-200 w-full p-4 rounded-lg my-4'
          onChange={handleChange} value={service.price}>
        </input>
        <div className='flex justify-between'>
          <button type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2
            rounded-md'>
            { !params.id ? 'Crear' : 'Modificar'}
          </button>
          <button type='button'onClick={handleBack}
            className='bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 
            rounded-md'>
            Ir Atras
          </button>
        </div>

      </form>
    </div>
  )
}

export default FormService