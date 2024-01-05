import { connectToDB } from '../../../utils/database';
import Client from '../../../models/Cient';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  try {
    await connectToDB();
    const clients = await Client.find();
    return NextResponse.json(clients, {status:200})
  } catch (error) {
    console.log('Failed to fetch all Clients', error);
    return NextResponse.json({message:'Failed to fetch all Clients',error:error.message}, {status:500})
  }
};

export async function POST(req, rest) {
  try {
    const {firstName, lastName, idNumber, celPhone, address, email} = await req.json();
    await connectToDB();
    const newClient = await new Client({firstName, lastName, idNumber, celPhone, address, email});
    const saveClient = await newClient.save();
    return NextResponse.json(saveClient, {status: 201})
  } catch (error) {
    console.log('Failed to create a new client', error);
    return NextResponse.json({message:'Failed to create a new client', error:error.message}, {status:500});
  }
};



