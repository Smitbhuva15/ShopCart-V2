
import { prisma } from '@/prishma';
import { NextResponse } from 'next/server';



export async function  PATCH(req: Request) {
    const { address,  city,   country,   Postocode,userId } = await req.json();
     console.log(address,  city,   country,   Postocode,userId);
    try {

       await prisma.user.updateMany({
        where:{
            id:userId
        },
        data:{
            address,  city,  country,   Postocode 
        }
       })
        

        return NextResponse.json({ message: "address add successFully!!" }, { status: 200 })


    } catch (error) {

        return NextResponse.json({ message: "Internal server error!!" }, { status: 500 })

    }


}
