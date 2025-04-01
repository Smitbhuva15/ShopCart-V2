import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/prishma";


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt" as const,
      },
      pages: {
        signIn: "/login", 
      },
      providers: [
        CredentialsProvider({
          name: "Credentials",
        
          credentials: {
            email: { label: "email", type: "text", placeholder: "smith@gmail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
           
            if(!credentials?.email || !credentials?.password){
                return null
            }
  
             const user=await prisma.user.findUnique({
                where:{
                    email:credentials.email
                }
             })
            
             if(!user){
                return null
             }

             const passMatch=await bcrypt.compare(credentials.password,user.password);
             if(!passMatch){
                return null
             }
      
           
              return{email:user.email,firstName:user.firstName,id:user.id}
            
          }
        })
      ],
      callbacks: {
        async jwt({ token, user }:{token:any,user:any}) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.firstName = user.firstName;
              }
              return token;
        },
        async session({ session, token }:{session:any,token:any}) {
            if (session.user) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.firstName = token.firstName;
              }
              return session;
        },
      },
      debug: true, 
}
  const handler = NextAuth(authOptions);

  export { handler as GET, handler as POST };