import Image from 'next/image'
import Hero from '../components/Hero';

export default async function Home() {

  return (

    <main className="overflow-hidden">
      <Hero/>

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-3xl font-extrabold'>Catalogo de servicios</h1>
          <p>Explore los servicios deseados</p>
        </div>
      </div>

    </main>
  )
}
