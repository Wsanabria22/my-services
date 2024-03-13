import { NextResponse } from 'next/server';
import { connectToDB } from '../../../../utils/database';
import Journal from '../../../../models/Journal';

export async function GET(request, {params}) {
  try {
    await connectToDB();
    console.log('params.id', params.id);
    const journals = await Journal.find({appointment: params.id})
    if(!journals) return NextResponse.json({message:'Journals not found'}, {status:404})
    return NextResponse.json(journals, {status:200})
  } catch (error) {
    console.log('Failed to get journals information', error);
    return NextResponse.json({message:'Failed to get journals information', error:error.message}, {status:400})
  }
};

export async function PUT(request, {params}) {
  try {
    await connectToDB();
    const data = await request.json();
    const journal = await Journal.findByIdAndUpdate(params.id, data, {new:true});
    if(!journal) return NextResponse.json({message:'Journal not found'}, {status:404})
    return NextResponse.json(journal, {message:'Journal updated successfully'}, {status:201})
  } catch (error) {
    console.log('Failed to update journal information', error);
    return NextResponse.json({message:'Failed to update journal information', error:error.message}, {status:400})
  }
};

export async function DELETE(request, {params}) {
  try {
    await connectToDB();
    const journal = await Journal.deleteMany({appointment: params.id});
    if(!journal) return NextResponse.json({message:'Journal not found'}, {status:404})
    return NextResponse.json(journal, {message:'Journals deleted successfully'}, {status:201})
  } catch (error) {
    console.log('Failed to delete journal information', error);
    return NextResponse.json({message:'Failed to delete journals information', error:error.message}, {status:400})
  }
};