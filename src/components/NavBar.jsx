'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import logo from '../public/assets/images/WAPJA-sm.png';
import Link from "next/link";

const NavBar = () => {
  const { data: session } = useSession();
  console.log('Session',session);

  if(!session) {
    return (
      <div className='flex justify-between px-4 py-2 bg-slate-200'>
        <Link href="/" className="flex gap-1">
          <Image src={logo} alt="My-Services" width={30} height={30}/>
          <p className='font-semibold text-center items-center flex px-1'>My Services</p>
        </Link>
        <button className='bg-blue-600 text-white px-3 py-1 rounded-md font-normal 
           hover:bg-blue-300 hover:text-black hover:border-blue-600 border'
            onClick={()=> signIn()} >LogIn
        </button>
      </div>
    )
  }

  return (
    <div className='flex justify-between px-4 py-2 bg-slate-200 flex-grow'>
      { session?.user && 
      <>
        <Link href="/" className="flex gap-1">
          <Image src={logo} alt="My-Services" width={30} height={30}/>
          <p className='font-semibold text-center items-center flex px-1'>My Services</p>
        </Link>
        <div className="flex gap-1">
          <button className='bg-blue-600 text-white px-3 py-1 rounded-md font-normal  
            hover:bg-blue-300 hover:text-black hover:border-blue-600 border'
              onClick={()=> signOut()} >LogOut
          </button>
          <Image src={session.user.image}
            alt='Profile'
            width={37}
            height={37}
            className='rounded-full'
          />
        </div>
      </>
      } 
    </div>
  )

}

export default NavBar