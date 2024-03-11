import { NextResponse } from 'next/server';
import { connectToDB } from '../../../../utils/database';
import Category from '../../../../models/Category';

export async function GET(request, {params}) {
  try {
    await connectToDB();
    const category = await Category.findById(params.id)
    if(!category) return NextResponse.json({message:'Category not found'}, {status:404})
    return NextResponse.json(category, {status:200})
  } catch (error) {
    console.log('Failed to get category information', error);
    return NextResponse.json({message:'Failed to get category information', error:error.message}, {status:400})
  }
};

export async function PUT(request, {params}) {
  try {
    await connectToDB();
    const data = await request.json();
    const category = await Category.findByIdAndUpdate(params.id, data, {new:true});
    if(!category) return NextResponse.json({message:'Category not found'}, {status:404})
    return NextResponse.json(category, {message:'Category updated successfully'}, {status:201})
  } catch (error) {
    console.log('Failed to update category information', error);
    return NextResponse.json({message:'Failed to update category information', error:error.message}, {status:400})
  }
};

export async function DELETE(request, {params}) {
  try {
    await connectToDB();
    const category = await Category.findByIdAndDelete(params.id);
    if(!category) return NextResponse.json({message:'Category not found'}, {status:404})
    return NextResponse.json(category, {message:'Category deleted successfully'}, {status:201})
  } catch (error) {
    console.log('Failed to delete category information', error);
    return NextResponse.json({message:'Failed to delete category information', error:error.message}, {status:400})
  }
};

