import Image from 'next/image'
import AdminBar from '../components/AdminBar';

export default async function Home() {

  return (
    <main className="bg-blue-50 min-h-screen flex gap-2 p-2">
      <AdminBar />
      <section className='bg-slate-200 rounded-sm py-3 px-2 border-purple-950 flex-grow'>
        Contenido
      </section>
    </main>
  )
}
