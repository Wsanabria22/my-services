'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import logo from '../public/assets/images/WAPJA-sm.png';
import Link from "next/link";
import CustomButtom from "./CustomButton";

const NavBar = () => {
  const { data: session } = useSession();
  console.log('Session',session);

  if(!session) {
    return (
      <header className="w-full absolute z-10">
        <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-3 py-4">

          <Link href="/" className="flex gap-1">
            <Image src={logo} alt="My-Services" width={25} height={25}/>
            <p className='font-semibold text-center items-center flex px-1'>My Services</p>
          </Link>
          <CustomButtom 
            title="Sign In"
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
        <div className="flex gap-1">
        <CustomButtom 
          title="Log Out"
          btnType="button"
          containerStyles="bg-primary-blue text-white rounded-full"
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