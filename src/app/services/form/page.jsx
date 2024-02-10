'use client'
import {useState, useEffect} from 'react';
import { useRouter, useParams } from 'next/navigation';
import { loadPicture, deletePicture } from '../../../utils/managePictures';

const FormService = () => {
  const router = useRouter();
  const params = useParams();

  const [service, setService] = useState({
    name: '',
    description: '',
    duration: 0,
    price: 0,
    picturePath:"",
    picture: "",
  });

  const getService = async () => {
    try {
      const response = await fetch('/api/services/'+params.id)
      const dataService = await response.json()
      setService(dataService)
    } catch (error) {
      console.log('Failed to fetch service information',error)
    }
  };

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
        router.back()
        router.refresh();
      }
    } catch (error) {
      console.log('Failed to create service', error)
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
      router.back()
      router.refresh()
    } catch (error) {
      console.log('Failed to update service', error)
    }
  };

  const handleChange = (e) => setService((prevState)=>({...prevState, [e.target.name]: e.target.value}))

  const handlePicture = async (e) => {
    console.log('cargando archivo',e.target.files[0]);
    await loadPicture(e.target.files[0]);
    const imagePath = e.target.files[0].name;
    setService((prevState)=>({...prevState, picturePath:imagePath}))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!params.id) await createService();
      else await updateService();
    } catch (error) {
      console.log('Failed to create service', error)
    }
  };

  const handleDelete = async () => {
    try {
      if(window.confirm('Esta seguro de eliminar el servicio?')) {
        const response = await fetch('/api/services/'+params.id,
        { method: 'DELETE'})  
        await deletePicture(service.picturePath)    
        router.back();
        router.refresh();
      }
    } catch (error) {
      console.log('Failed to delete service',error)
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
    <section className='bg-slate-200 rounded-sm py-3 px-2 flex-grow border-blue-600'> 
      <div className='flex justify-between items-center rounded-sm bg-slate-100 py-2 px-4'>
        <h1 className='font-semibold text-xl'>
          { !params.id ? "Crear Servicio" : "Modificar Servicio" }
        </h1>
      </div>
      <hr className="bg-blue-300"></hr>
      <div className="bg-white col-span-8 w-full px-4 py-2"> 
      <form className='bg-white p-5 w-full grid grid-cols-8 gap-4 border border-slate-100' onSubmit={handleSubmit}>
        <div className='col-span-6'>
          <div className="flex flex-col w-full">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                Nombre
              </span>    
            </label> 
            <input type='text' name='name' placeholder='nombre...'
              className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
              onChange={handleChange} value={service.name}
              required>
            </input>
          </div>

          <div className="flex flex-col w-full">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                Descripcion
              </span>    
            </label> 
            <textarea name='description' placeholder='descripcion...' rows={3}
              className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"
              onChange={handleChange} value={service.description}
              required>
            </textarea>
          </div>

          <div className="flex flex-col w-full">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                Tiempo (min.)
              </span>    
            </label> 
            <input type='number' name='duration' placeholder='duracion...'
              className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"
              onChange={handleChange} value={service.duration}>
            </input>
          </div>

          <div className="flex flex-col w-full">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                Precio $
              </span>    
            </label> 
            <input type='number' name='price' placeholder='$price...'
              className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"
              onChange={handleChange} value={service.price}
              required>
            </input>
          </div>

          <div className="flex flex-col w-full">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                Imagen
              </span>    
            </label> 
            <input type='file' name='picture' placeholder='Fotografia / imagen...'
              className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
              onChange={(e)=> { 
                  handleChange(e);
                  handlePicture(e);
              }} 
              value={service.picture}>
            </input>
          </div>

        </div>

        { service.picturePath &&
          <div className='col-span-2 h-auto w-auto m-2 border border-slate-400 mb-4'>
            <img src={`/images/${service.picturePath}`} 
              alt={service?.name}
              className='object-fill h-full w-full'
            />
          </div>
        }

        <div className='col-span-8 mt-2'>
        <hr className="bg-blue-300 border w-full"></hr>
        <div className='flex justify-between w-full mt-2'>
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
        </div>
      </form>
      </div>
    </section>
  )
}

export default FormService