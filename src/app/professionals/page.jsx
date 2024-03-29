'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProfessionalCard from "../../components/ProfessionalCard";

const Professionals = () => {
  const [allProfessionals, setAllProfessionals] = useState([])

  const getProfessionals = async () => {
    try {
      const response = await fetch('/api/professionals');
      const dataProfessionals = await response.json();
      setAllProfessionals(dataProfessionals);
    } catch (error) {
      console.log("Failed to load all Professionals", error)
    }
  }

  useEffect(() => {
    const dataFetch = async () => {
      await getProfessionals();
    }

    dataFetch();
  }, []);

  return (
    <section className='bg-slate-200 rounded-sm py-3 px-2 flex-grow'>
      <div className="bg-slate-100 rounded-sm px-4 py-2 flex justify-between">
        <h2 className="text-lg">Administrar Profesionales</h2>
        <Link href={'/professionals/form'}>
          <button className='bg-blue-600 text-white md:font-semibold sm:px-3 sm:py-1.5 hover:bg-blue-300 hover:text-black
            text-sm hover:border-blue-600 border rounded-md font-normal px-2 py-1'>
            Nuevo
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
      { 
        allProfessionals && allProfessionals.map( (professional) => (
          <ProfessionalCard professional={professional} key={professional._id}/>
        ))
      }
      </div>
    </section>

  )
}

export default Professionals