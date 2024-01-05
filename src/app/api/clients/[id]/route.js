import { connectToDB } from '../../../../utils/database';
import Client from '../../../../models/Cient';
import { NextResponse } from 'next/server';

export async function GET(request, {params}) {
  try {
    await connectToDB();
    const Client = await Client.findById(params.id);
    if (!Client) return NextResponse.json({message:'Client not found'}, {status:404});
    return NextResponse.json(Client, {status:200})
  } catch (error) {
    console.log('Failed to get client information', error);
    return NextResponse.json({message:'Failed to get client information', error:error.message}, {status: 400});
  }
};

export async function PUT(request, {params}) {
  try {
    const data = await request.json();
    await connectToDB();
    const client = await Client.findByIdAndUpdate(params.id, data, {new:true});
    if (!client) return NextResponse.json({message:'Client not found'}, {status:404});
    return NextResponse.json(client, {message:'Client updated successfully'}, {status:201})
  } catch (error) {
    console.log('Failed to update client information', error);
    return NextResponse.json({message:'Failed to update client information', error:error.message}, {status: 400});
  }
};

export async function DELETE(request, {params}) {
  try {
    await connectToDB();
    const client = await Client.findByIdAndDelete(params.id)
    if (!client) return NextResponse.json({message:'Client not found'}, {status:404});
    return NextResponse.json(client, {message:'Client deleted successfully'}, {status:201})
  } catch (error) {
    console.log('Failed to delete client information', error);
    return NextResponse.json({message:'Failed to delete client information', error:error.message}, {status: 400});
  }
};
