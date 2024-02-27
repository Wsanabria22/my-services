import { connectToDB } from '../../../utils/database';
import Appointment from '../../../models/Appointment';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  try {
    await connectToDB();
    const appointments = await Appointment.find();
    return NextResponse.json(appointments, {status:200})
  } catch (error) {
    console.log('Failed to fetch all appointments', error);
    return NextResponse.json({message:'Failed to fetch all appointments',error:error.message}, {status:500})
  }
};

export async function POST(req, rest) {
  try {
    const {user, client, service, quantity, professional, serviceDate, idxStartHour, idxFinalHour} = await req.json();
    await connectToDB();
    const newAppointment = await new Appointment({user, client, service, quantity, professional, serviceDate, idxStartHour, idxFinalHour});
    const appointment = await newAppointment.save();
    return NextResponse.json(appointment, {status: 201})
  } catch (error) {
    console.log('Failed to create a new appointment', error);
    return NextResponse.json({message:'Failed to create a new appointment', error:error.message}, {status:500});
  }
};
