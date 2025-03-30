"use client"
import { useState } from "react";
import ProductCard from "./ProductCard";
import { product_data } from "@/lib/product";


const showResult="Showing 01-07 of 63 Result";


export default function ShopPage() {

      const[gridList ,SetGridList]=useState(true);
      const [products,setProducts] = useState(product_data);
      const [currentPage,setCurrentPage]=useState(1);
      const productPerPag=9;
      
      const indextOfLastProduct=currentPage*productPerPag;
      const indextOfFirstProduct=indextOfLastProduct-productPerPag;
      const currentProducts=products.slice(indextOfFirstProduct,indextOfLastProduct);
 
 

  return (
    <div className='shop-page padding-tb'>
      <div className='container'>
      <div className='row justify-content-center'>
        {/* left side */}
                        <div className='col-lg-8 col-12'>
                         <article>
                            <div className='shop-title d-flex flex-wrap justify-content-between'>
                                <p>{showResult}</p>
                                <div className={`product-view-mode ${gridList?"gridActive":"listActive"}`}>
                                    <a className='grid ' onClick={()=>SetGridList(!gridList)}>
                                        <i className='icofont-ghost'></i>
                                    </a>
                                    <a className='list ' onClick={()=>SetGridList(!gridList)}>
                                        <i className='icofont-listine-dots'></i>
                                    </a>
                                </div>
                            </div>
        
                            {/* Card */}
                            <div>
                                <ProductCard  gridList={gridList}  products={ currentProducts}/>
                            </div>
        
                            
                         </article>
                        </div>
      </div>
      </div>
    </div>
  )
}
