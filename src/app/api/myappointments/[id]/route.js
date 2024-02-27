import { connectToDB } from '../../../../utils/database';
import Appointment from '../../../../models/Appointment';
import { NextResponse } from 'next/server';

export async function GET(request, {params}) {
  try {
    await connectToDB();
    const appointments = await Appointment.findById(params.id).populate('professional').populate('service')
    if(!appointments) return NextResponse.json({message:'Client appointments not found'}, {status:404})
    return NextResponse.json(appointments, {status:200})
  } catch (error) {
    console.log('Failed to get client appointments information', error);
    return NextResponse.json({message:'Failed to get client appointments information', error:error.message}, {status:400})
  }
};
