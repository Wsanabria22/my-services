import { NextRequest, NextResponse } from "next/server";
import path from 'path';
import { writeFile, rm } from "fs/promises";

export async function POST(req, res) {
  try {
    const formData = await req.formData()
    const image = formData.get('image');
    if(!image) return NextResponse.json({message:'There is not a file to load', error:error.message}, {status:400});
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join('./public/images', image.name);
    const promise = await writeFile(filePath, buffer);
    return NextResponse.json({imagePath: `${image.name}`},{status: 200})
  } catch (error) {
    console.log('Failed to load professional picture', error.message)    
    return NextResponse.json({message:'Failed to load professional picture', error:error.message}, {status:500})
  }
};


export async function DELETE(req, rest) {
  try {
    const formData = await req.formData()
    const imageName = formData.get('imageName');
    if(!imageName) return NextResponse.json({message:'There is not a file to delete', error:error.message}, {status:400});
    const filePath = path.join('./public/images', imageName);
    console.log(filePath)
    await rm(filePath, {force:true});
    return NextResponse.json({imageName: `${imageName}`},{status: 200})
  } catch (error) {
    console.log('Failed to delete a professional picture', error.message)    
    return NextResponse.json({message:'Failed to delete a professional picture', error:error.message}, {status:500})
  }
};

