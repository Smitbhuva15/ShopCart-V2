import { prisma } from "@/prishma";
import { NextResponse } from "next/server";



export async function POST(req:Request) {
    const{email,username,phone_no}=await req.json();
    
    try {
        const data=await prisma.resister.create({
            data:{
                email,
                username,
                phone_no
            }
        })

        return NextResponse.json({message:"Workshop Resister successfull!!"},{status:200})
        
    } catch (error) {
         return NextResponse.json({message:"Internal server error!!"},{status:500})
    }

}
