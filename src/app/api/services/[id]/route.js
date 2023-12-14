import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Service from '@/models/Service';

export async function GET( request, { params }){
  try {
    await connectToDB();
    const service = await Service.findById(params.id)
    if (!service) return NextResponse.json({message: 'Servicio no encontrado'}, {status: 404})
    return NextResponse.json(service, {status: 200})
  } catch (error) {
    console.log('Error obteniendo informacion del servicio', error)
    return NextResponse.json({message: 'Error al leer el servicio', error: error.message}, {status: 400} )
  }
};

export async function PUT( request, { params }) {
  try {
    const data = await request.json();
    await connectToDB();
    const service = await Service.findByIdAndUpdate(params.id, data, {new: true});
    if (!service) return NextResponse.json({message: 'Servicio no encontrado'}, {status: 404});
    return NextResponse.json(service, {message: 'Servicio actualiado con exito'}, {status:201});
  } catch (error) {
    console.log("Error al actualizar servicio", error);
    return NextResponse.json({message: "Error al actualizar servicio", error: error.message}, {status: 400});
  }
};

export async function DELETE( request, { params }) {
  try {
    await connectToDB();
    const service = await Service.findByIdAndDelete(params.id);
    if(!service) return NextResponse.json({message: 'Servicio no encontrado'}, {status: 404});
    return NextResponse.json(service, {message: 'Servicio eliminado con exito'}, {status: 201});
  } catch (error) {
    console.log('Error al eliminar servicio', error);
    return NextResponse.json({message: 'Error al eliminar servicio', error: error.message}, {status:400});
  }
};
