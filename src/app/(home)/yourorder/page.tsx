"use client"
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import PageHeader from '@/compo/Common/PageHeader';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { fetchtype } from '@/types/interface';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error: ${res.statusText}`);
  return res.json();
};


export default function YourOrder() {
  const { data: session,status } = useSession()

  const { data, error, isLoading } = useSWR<fetchtype>(`/api/product/${session?.user?.id}`, fetcher)
   const router = useRouter();
  
    if(status==='unauthenticated'){
      router.push('/login');
    }
  
  return (
    <div>
      <PageHeader title="Your order Page" curPage="Order" />
      {
        isLoading ?
          (
            <div className="fixed inset-0 flex justify-center items-center z-50 bg-white">
              <Loader2 className="h-9 w-9 animate-spin text-gray-500" />
            </div>
          ) :
          (
            <div className='shop-cart padding-tb'>
              <div className='container'>
                <div className='section-wrapper'>
                  <div className='cart-top'>
                    <table>
                      <thead>
                        <tr>
                          <th className=''>OrderId</th>
                          <th className=''>Total amount</th>
                          <th className=''>order Date</th>
                          <th className=''>Delivery Date</th>
                        </tr>
                      </thead>

                      <tbody>
                        {
                          data?.user?.orders.length == 0 ?
                            (
                              <div className="text-2xl text-red-600">There are no confirmed orders.</div>
                            ) :
                            (
                              data?.user?.orders.map((item, index) => {
                                const formattedDate = new Date(item.createdAt).toISOString().split("T")[0];
                                const date = new Date(item.createdAt);
                                date.setDate(date.getDate() + 3);
                                const formattedDate2 = date.toISOString().split("T")[0];
                                return (

                                  <tr key={index}>



                                    <td className='w-1/4'> {item.orderId}</td>
                                    <td className='w-1/4'> ₹{item.amount}</td>
                                    <td className='w-1/4'> {formattedDate}</td>
                                    <td className='w-1/4'> {formattedDate2}</td>

                                  </tr>
                                )
                              })


                            )
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )
      }



    </div>

  )
}
