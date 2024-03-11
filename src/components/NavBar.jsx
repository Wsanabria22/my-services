'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import logo from '../public/assets/images/WAPJA-sm.png';
import Link from "next/link";
import CustomButtom from "./CustomButton";

const NavBar = () => {
  const { data: session } = useSession();
  // console.log('Session',session);

  if(!session) {
    return (
      <header className="w-full absolute z-10">
        <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-3 py-4">

          <Link href="/" className="flex gap-1">
            <Image src={logo} alt="My-Services" width={25} height={25}/>
            <p className='font-semibold text-center items-center flex px-1'>My Services</p>
          </Link>

          <CustomButtom 
            title="Ingresar"
            btnType="button"
            containerStyles="bg-primary-blue text-white rounded-full"
            handleClick={signIn}
          />
       </nav>
      </header>
    )
  } else {
    return (
      <header className="w-full absolute z-10">
      { session?.user && 
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-3 py-4">

        <Link href="/" className="flex gap-1">
          <Image src={logo} alt="My-Services" width={30} height={30}/>
          <p className='font-semibold text-center items-center flex px-1'>My Services</p>
        </Link>
        <div className="flex gap-2 ">
          <Link href="/myappointments" className="flex justify-center items-center shadow-md border rounded-md px-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <p className='font-semibold text-center items-center flex'>Mis Citas</p>
          </Link>
          <CustomButtom 
            title="Salir"
            btnType="button"
            containerStyles="bg-primary-blue text-white rounded-md"
            handleClick={signOut}
          />
          <Image src={session.user.image}
            alt='Profile'
            width={37}
            height={37}
            className='rounded-full'
          />
        </div>
     </nav>

    }
    </header>
    )
  }

}

export default NavBar