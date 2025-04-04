import { prisma } from '@/prishma';
import { NextResponse } from 'next/server';
import React from 'react'

export async function POST(res:Request) {
 
 const{userId ,amount,username,email,orderId,productIds}=await res.json();
 
 try {
   
    const order=await prisma.order.create({
        data:{
            userId ,
            amount:amount/100,
            username,
            email,
            orderId,
            productIds
        }
    })

    await prisma.product.deleteMany({
        where:{
          userId:userId
        }
    })

        return NextResponse.json({ message: "order created successfully!!" }, { status: 200 })

 } catch (error) {
        return NextResponse.json({ message: "Internal server error!!" }, { status: 500 })
    
 }
}
