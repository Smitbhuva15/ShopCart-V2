import { prisma } from "@/prishma"
import { NextResponse } from "next/server"

interface paramstype{
    userId:string
}

export async function GET(req:Request,{params}:{params:paramstype}) {
   const userId=params?.userId;

 try {
    const userdata=await prisma.user.findUnique({
        where:{
            id:userId
        },
        include:{
            orders:true,
            produtcs:true,
            itmes:true
        }
    })

    return NextResponse.json({user:userdata}, { status: 200 })

    
 } catch (error) {
    return NextResponse.json({ message: "Internal server error!!" }, { status: 500 })

 }
}
