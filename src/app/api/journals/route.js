import { connectToDB } from '../../../utils/database';
import Journal from '../../../models/Journal';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  try {
    await connectToDB();
    const journals = await Journal.find();
    return NextResponse.json(journals, {status:200})
  } catch (error) {
    console.log('Failed to fetch all Journal', error);
    return NextResponse.json({message:'Failed to fetch all Journal',error:error.message}, {status:500})
  }
};

export async function POST(req, rest) {
  try {
    const {professional, journalDate, indexHour, appointment, journalStatus} = await req.json();
    await connectToDB();
    const newJournal = await new Journal({professional, journalDate, indexHour, appointment, journalStatus});
    const journal = await newJournal.save();
    return NextResponse.json(journal, {status: 201})
  } catch (error) {
    console.log('Failed to create a new journal', error);
    return NextResponse.json({message:'Failed to create a new journal', error:error.message}, {status:500});
  }
};