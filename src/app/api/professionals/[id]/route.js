import { NextResponse } from 'next/server';
import Professional from '../../../../models/professional';
import { connectToDB } from '../../../../utils/database';

export async function GET (request, {params}) {
  try {
    await connectToDB();
    const professional = await Professional.findById(params.id);
    if (!professional) return NextResponse.json({message:'Professional not found'}, {status:404});
    return NextResponse.json(professional, {status:200})
  } catch (error) {
    console.log('Failed to get professional information', error)
    return NextResponse.json({message:'Failed to get professional information', error: error},
      {status: 400})
  }
};

export async function PUT (request, {params}) {
  try {
    await connectToDB();
    const data = request.json();
    const professional = await Professional.findByIdAndUpdate(params.id, data, {new:true});
    if (!professional) return NextResponse.json({message:'Professional not found'}, {status:404})
    return NextResponse.json(professional, {message:'Professional updated successfully'},{status:201})
  } catch (error) {
    console.log('Failed to update professional information', error)
    return NextResponse.json({message:'Failed to update professional information', error: error},
      {status: 400})
  }
};

export async function DELETE (request, {params}) {
  try {
    await connectToDB();
    const professional = await Professional.findByIdAndDelete(params.id);
    if (!professional) return NextResponse.json({message:'Professional not found'}, {status:404})
    return NextResponse.json(professional, {message:'Professional deleted successfully'},{status:201})
  } catch (error) {
    console.log('Failed to delete professional', error);
    return NextResponse.json({message:'Failed to delete professional', error}, {status:400})
  }
};

