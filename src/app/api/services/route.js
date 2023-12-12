const { NextResponse } = require("next/server");
import Service from '@/models/Service';
import { connectToDB } from '@/utils/database';


export async function GET () {
  try {
    await connectToDB();
    const services = await Service.find();
    return NextResponse.json(services, { status: 200 })
  } catch (error) {
    console.log('Failed to fetch all services', error);
    return NextResponse.json({message:"Failed to fetch all services", error: error.message},
       { status: 500 })
  }
};

export async function POST(req, res) {
  try {
    const {name, description, duration, price} = await req.json();
    await connectToDB();
    const newService = new Service({ name, description, duration, price });
    const savedService = await newService.save();
    return NextResponse.json(savedService, { status: 201 });
  } catch (error) {
    console.log("Failed to create a new service", error)
    return NextResponse.json({message:"Failed to create a new service", error: error.message},
     { status: 400 } );
  }
};

