import { NextResponse } from 'next/server';
import { connectToDB } from '../../../utils/database';
import Category from '../../../models/Category';

export async function GET(req, res) {
  try {
    await connectToDB();
    const categories = await Category.find();
    if(!categories) return NextResponse.json({message:'Failed to fetch all categories', error:error.message}, {status:500});
    return NextResponse.json(categories, {status:200})
  } catch (error) {
    console.log('Failed to fetch all categories', error);
    return NextResponse.json({message:'Failed to fetch all categories', error:error.message}, {status:500});
  }
};

export async function POST(req, res) {
  try {
    const { name, description } = await req.json();
    await connectToDB();
    const newCategory = await new Category({name, description});
    const savedCategory = await newCategory.save();
    return NextResponse.json(savedCategory, {status:201});
  } catch (error) {
    console.log('Failed to create a category', error);
    return NextResponse.json({message:'Failed to create a category', error:error.message}, {status:500});
  }
};