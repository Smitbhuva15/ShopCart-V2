import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import 'bootstrap/dist/css/bootstrap.min.css';
import PageHeader from '@/compo/Common/PageHeader';



export default function YourOrder() {
  return (
    <>
      <PageHeader title="Your order Page" curPage="Order" />
    </>

  )
}
