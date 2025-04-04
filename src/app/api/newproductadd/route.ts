import { prisma } from '@/prishma';
import { NextResponse } from 'next/server';





export async function POST(req: Request) {
 try {
    const { category,name ,seller,price,img,userId } = await req.json();
    
   await prisma.item.createMany({
    data:{
        category,name ,seller,price,image:img,userId
    }
   })

    return NextResponse.json({ message: "add successfully!!" }, { status: 200 })


  } catch (error) {
    return NextResponse.json({ message: "Internal server error!!" }, { status: 500 })

  }
}

export async function GET(req: Request) {
  try {
   
     const items=await prisma.item.findMany({
      orderBy:{
        category:'asc'
      }
     })
    
  
     return NextResponse.json({ message: "items get successfully!!",items:items }, { status: 200 })
 
 
   } catch (error) {
     return NextResponse.json({ message: "Internal server error!!" }, { status: 500 })
 
   }
 }
 
