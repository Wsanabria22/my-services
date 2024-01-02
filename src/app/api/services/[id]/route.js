import { NextResponse } from "next/server";
import { connectToDB } from "../../../../utils/database";
import Service from '../../../../models/Service';

export async function GET( request, { params }){
  try {
    await connectToDB();
    const service = await Service.findById(params.id)
    if (!service) return NextResponse.json({message: 'Service not found'}, {status: 404})
    return NextResponse.json(service, {status: 200})
  } catch (error) {
    console.log('Failed to fetch service information', error)
    return NextResponse.json({message: 'Failed to fetch service information', error: error.message}, {status: 400} )
  }
};

export async function PUT( request, { params }) {
  try {
    const data = await request.json();
    await connectToDB();
    const service = await Service.findByIdAndUpdate(params.id, data, {new: true});
    if (!service) return NextResponse.json({message:'Service not found'}, {status: 404});
    return NextResponse.json(service, {message:'Service updated successfully'}, {status:201});
  } catch (error) {
    console.log("Failed to update service", error);
    return NextResponse.json({message:"Failed to update service", error: error.message}, {status: 400});
  }
};

export async function DELETE( request, { params }) {
  try {
    await connectToDB();
    const service = await Service.findByIdAndDelete(params.id);
    if(!service) return NextResponse.json({message:'Service not found'}, {status: 404});
    return NextResponse.json(service, {message:'Service deleted successfully'}, {status: 201});
  } catch (error) {
    console.log('Failed to delete service', error);
    return NextResponse.json({message:'Failed to delete service', error: error.message}, {status:400});
  }
};
