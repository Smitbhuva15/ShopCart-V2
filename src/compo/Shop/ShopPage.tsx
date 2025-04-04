"use client"
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { product_data } from "@/lib/product";
import Pagination from "./Pagination";
import PopulerPost from "../Common/PopulerPost";
import Tag from "../Common/Tag";
import Search from "./Search";
import { Loader2 } from "lucide-react";


const showResult = "Showing 01-07 of 63 Result";


export default function ShopPage() {



  const [gridList, SetGridList] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true)
  const productPerPag = 9;

  const indextOfLastProduct = currentPage * productPerPag;
  const indextOfFirstProduct = indextOfLastProduct - productPerPag;
  const currentProducts = products.slice(indextOfFirstProduct, indextOfLastProduct);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  const getData = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/newproductadd', {
        method: "GET"
      })
      if (res.ok) {
        const data = await res.json();
        setProducts(data.items)
        console.log(data.message)
      }
      else {
        const errdata = await res.json();
        console.log(errdata.message)
      }

    } catch (error) {
      console.log("error found", error)
    }
    finally {
      setIsLoading(false)
    }

  }
  useEffect(() => {
    getData();
  }, [])


  return (
    <div className='shop-page padding-tb'>
      <div className='container'>
        <div className='row justify-content-center'>
          {/* left side */}
          <div className='col-lg-8 col-12'>
            <article>
              <div className='shop-title d-flex flex-wrap justify-content-between'>
                <p>{showResult}</p>
                <div className={`product-view-mode ${gridList ? "gridActive" : "listActive"}`}>
                  <a className='grid ' onClick={() => SetGridList(!gridList)}>
                    <i className='icofont-ghost'></i>
                  </a>
                  <a className='list ' onClick={() => SetGridList(!gridList)}>
                    <i className='icofont-listine-dots'></i>
                  </a>
                </div>
              </div>

              {/* Card */}
              {
                isLoading ?
                  (
                    <div className="fixed inset-0 flex justify-center items-center z-50 bg-white">
                      <Loader2 className="h-9 w-9 animate-spin text-gray-500" />
                    </div>
                  ) :
                  (
                    <div>
                      <ProductCard gridList={gridList} products={currentProducts} />
                    </div>
                  )


              }


              <Pagination
                productPerPag={productPerPag}
                totalProducts={products.length}
                paginate={paginate}
                activePage={currentPage}
              />
            </article>
          </div>


          <div className='col-lg-4 col-12'>
            <aside>
              <Search products={products} gridList={gridList} />
              <PopulerPost />
              <Tag />
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
