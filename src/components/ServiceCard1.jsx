'use client';
import React, { useState } from 'react';
import CustomButtom from './CustomButton';

const ServiceCard1 = ({service}) => {
  const {name, description, duration, price, category} = service;
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='service-card group'>
      <div className='service-card__content'>
        <h2 className='service-card__content-title'>{name}</h2>
      </div>
      <p className='flex mt-6 text-[24px] font-extrabold'>
        <span className='Self-start font-medium text-[14px]'>$</span>
        {price}
      </p>

      <div className='relative w-full h-40 my-3 object-contain'>
        {/* <Image 
          src={generateCarImageUrl(car)}
          alt='car model'
          fill
          priority
          className='object-contain'
        /> */}
      </div>

      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-gray'>
          <div className='flex flex-col justify-center items-center gap-2'>
            {/* <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' /> */}
            <p className='text-[14px]'>
              {duration}
              <span className='self-end font-medium text-[14px]'>/Min.</span>
            </p>
          </div>

          <div className='flex flex-col justify-center items-center gap-2'>
            {/* <Image src='/tire.svg' width={20} height={20} alt='tire' /> */}
            <p className='text-[14px]'>
              {category}
            </p>
          </div>

          {/* <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/gas.svg' width={20} height={20} alt='gas' />
            <p className='text-[14px]'>
              {city_mpg} MPG
            </p>
          </div> */}
        </div>
        <div className='service-card__btn-container'>
          <CustomButtom 
            title='View More'
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>


    </div>
  )
}


export default ServiceCard1