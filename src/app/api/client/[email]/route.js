import { connectToDB } from '../../../../utils/database';
import Client from '../../../../models/Cient';
import { NextResponse } from 'next/server';

export async function GET(request, {params}) {
  try {
    console.log('params',params);
    await connectToDB();
    const client = await Client.find({email: params.email});
    if (!client) return NextResponse.json(null, {status:404});
    return NextResponse.json(client, {status:200})
  } catch (error) {
    console.log('Failed to get client information by email', error);
    return NextResponse.json({message:'Failed to get client information by email', error:error.message}, {status: 400});
  }
};