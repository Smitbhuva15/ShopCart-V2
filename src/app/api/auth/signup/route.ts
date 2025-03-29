import { prisma } from '@/prishma'
import { NextResponse } from 'next/server'
import bcrypt from "bcryptjs";

export async function POST(req:Request) {
  const{firstName,lastName,email, password }=await req.json()


  const hashpassword=bcrypt.hashSync(password,10)
  

    const emailExist = await prisma.user.findFirst({
      where: { email: email },
    });

    if (emailExist) {
      return NextResponse.json(
        { message: "Email address already exists!" },
        { status: 400 }
      );
    }


  try {
    const data=await prisma.user.create({
        data:{
            firstName,lastName,email,
             password:hashpassword
        }
    })
    return NextResponse.json({ message: "User created successFully!!",user:data }, { status: 201 })

    
  } catch (error) {
            return NextResponse.json({ message: "Internal server error!!" }, { status: 500 })
    
  }

}
