import { prisma } from "@/prishma"
import { NextResponse } from "next/server"


export async function GET(req:Request) {
 const{userId}=await req.json()
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

    return NextResponse.json({ message: "userdata" ,user:userdata}, { status: 200 })

    
 } catch (error) {
    return NextResponse.json({ message: "Internal server error!!" }, { status: 500 })

 }
}
