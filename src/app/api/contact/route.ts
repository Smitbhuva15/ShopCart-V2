
import { prisma } from '@/prishma';
import { NextResponse } from 'next/server';



export async function POST(req: Request) {
    const { email, phone_no, Name, subject, message } = await req.json();

    try {

       const data=await prisma.contact.create({
        data:{
            email, phone_no, Name, subject, message
        }
       })

        return NextResponse.json({ message: "details send successFully!!" }, { status: 200 })


    } catch (error) {

        return NextResponse.json({ message: "Internal server error!!" }, { status: 500 })

    }


}
