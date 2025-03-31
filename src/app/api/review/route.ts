import { prisma } from '@/prishma';
import { NextResponse } from 'next/server';
import React from 'react'

export async function POST(req:Request) {
  const{email,fullName,message}=await req.json();
     
     try {
         const data=await prisma.review.create({
             data:{
                 email,
                 message,
                 fullName
             }
         })
 
         return NextResponse.json({message:"Review send successfully!!"},{status:200})
         
     } catch (error) {
          return NextResponse.json({message:"Internal server error!!"},{status:500})
     }
}
