'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const FormCategory = () => {
  const params = useParams();
  const router = useRouter();
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const getCategory = async () => {
    try {
      const response = await fetch('/api/categories/'+params.id);
      const dataCategory = await response.json();
      setCategory(dataCategory);
    } catch (error) {
      console.log('Failed to fetch category information', error);
    }
  };

  const createCategory = async () => {
    try {
      const response = await fetch('/api/categories',{
        method:'POST',
        body: JSON.stringify(category),
        headers: { "Content-Type":"application/json"}
      })
      if(response.ok) {
        router.back();
        router.refresh();
      }
    } catch (error) {
      console.log('Failed to create a new Category', error);
    }
  }

  const updateCategory = async () => {
    try {
      const response = await fetch(`/api/categories/${params.id}`,{
        method:"PUT",
        body: JSON.stringify(category),
        headers:{ "Content-Type":"application/json"}
      });
      const dataCategory = response.json();
      router.back();
      router.refresh();
    } catch (error) {
      console.log('Failed to update category', error)
    }
  }
  
  const handleChange = (e) => {
    setCategory({...category, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(params.id) await updateCategory()
    else await createCategory();
  }

  const handleBack = () => {
    router.back()
    router.refresh()
  }

  const handleDelete = async () => {
    try {
      if(window.confirm('Esta seguro de eliminar la categoria')) {
        const response = await fetch(`/api/categories/${params.id}`,{
          method:"DELETE"
        })
        router.back()
        router.refresh()
      }
    } catch (error) {
      console.log('Failed to delete the category',error)
    }
  };

  useEffect(() => {
    if(params.id) getCategory();
  },[])

  return (
    <section className='bg-slate-200 rounded-sm py-3 px-2 flex-grow border-blue-600'> 
      <div className='flex justify-between items-center rounded-sm bg-slate-100 py-2 px-4'>
        <h1 className='font-semibold text-xl'>
          { !params.id ? "Crear Categoria" : "Modificar Categoria" }
        </h1>
      </div>
      <hr className="bg-blue-300"></hr>
      <div className="bg-white col-span-8 w-full px-4 py-2"> 

      <form className='bg-white p-5 w-full flex flex-wrap gap-4 border border-slate-100' onSubmit={handleSubmit}>
        <div className="flex flex-col w-full">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                Nombre
              </span>    
            </label> 
            <input type='text' name='name' placeholder='nombres...'
              className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
              onChange={handleChange} value={category.name}
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
            onChange={handleChange} value={category.description}
            required>
          </textarea>
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

export default FormCategory