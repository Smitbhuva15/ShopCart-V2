import { prisma } from "@/prishma";
import { NextResponse } from "next/server";


export async function POST(req:Request) {
    
try {
    const {userId,productId,quantity,size,color,coupon,img,price,name}=await req.json();
  const newprice=price.toString();
    
   const productexist=await prisma.product.findFirst({
    where:{
      AND:{
        userId:userId,
        productId:productId
      }
    }
   })
   

   const newquantity=productexist?.quantity+quantity
   
   if(productexist){
   
    await prisma.product.updateMany({
      where:{
        AND:{
          userId:userId,
          productId:productId
        }
      },
      data:{
          quantity:newquantity,
          size,
          color,
          coupon
      }
     })
   }
   else{
    await prisma.product.create({
      data:{
        userId,
        productId,
        quantity,
        size,
        color,
        coupon,
         name,
         img,
         price:newprice,
      
       
      }
    })
   }
return NextResponse.json({ message: "Your product has been added successfully!!" }, { status: 200 })
    
    
} catch (error) {
return NextResponse.json({ message: "Internal server error!!" }, { status: 500 })
    
}


}
