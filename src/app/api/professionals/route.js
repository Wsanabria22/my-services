import { NextResponse } from "next/server";
import Professional from "../../../models/professional";;
import { connectToDB } from "../../../utils/database";

export async function GET() {
  try {
    await connectToDB();
    const professionals = await Professional.find();
    return NextResponse.json(professionals, { status: 200});
  } catch (error) {
    console.log('Failed to fetch all professionals', error)
    return NextResponse.json({message:'Failed to fetch all professionals', error:error.message}, 
    {status:500})
  }
};

export async function POST(req, res) {
  try {
    const {firstName, lastName, idNumber, title, picturePath} = await req.json();
    await connectToDB();
    const newProfessional = await new Professional({firstName, lastName, idNumber, title, picturePath});
    const savedProfessional = await newProfessional.save();
    return NextResponse.json(savedProfessional, { status: 201 });
  } catch (error) {
    console.log("Failed to create a new professional", error);
    return NextResponse.json({message:"Failed to create a new professional", error: error.message},
     { status: 400 } );
  }
};
