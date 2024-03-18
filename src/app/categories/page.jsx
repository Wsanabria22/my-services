'use client'
import React, { useEffect, useState } from 'react';
// import { connectToDB } from '../../utils/database';
// import Category from '../../models/Category';
import CategoryCard from '../../components/CategoryCard';
import Link from 'next/link';

// const getCategories = async () => {
//   try {
//     await connectToDB();
//     const categories = await Category.find();
//     return categories;
//   } catch (error) {
//     console.log('Failed to load all categories', error);
//   }
// };


const Categories = () => {
  const [allCategories, setAllCategories] = useState([])
  // const allCategories = await getCategories();

  const getCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const dataCategory = await response.json();
      setAllCategories(dataCategory);
    } catch (error) {
      console.log('Failed to load all categories', error);
    }
  };

  useEffect(() => {
    const dataFetch = async () => {
      await getCategories();
    }

    dataFetch();
  }, []);


  return (
    <section className='bg-slate-200 rounded-sm py-3 px-2 flex-grow'>
      <div className="bg-slate-100 rounded-sm px-4 py-2 flex justify-between">
        <h2 className="text-lg">Administrar Categorias</h2>
        <Link href={'/categories/form'}>
          <button className='bg-blue-600 text-white md:font-semibold sm:px-3 sm:py-1.5 hover:bg-blue-300 hover:text-black
            text-sm hover:border-blue-600 border rounded-md font-normal px-2 py-1'>
            Nuevo
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
      { allCategories && 
        allCategories.map((category)=>(
          <CategoryCard key={category._id} category={category}/>
        ))
      }
    </div>
    </section>
  )
}

export default Categories