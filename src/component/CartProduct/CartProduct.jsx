import React, { useEffect, useState } from 'react'
import { formatCurrency } from '../../helpers/Currancy'
import { Button } from '@heroui/react'


export default function CartProduct({product, index , RemoveSpecificCartItems , UpdateCartProduct}) {
 
  const [isLoading , setIsLoading] = useState(false)   
  const [productCount , setProductCount] = useState(product.count)

  useEffect(()=>{
    setProductCount(product.count)
  },[product.count]) 

  

  return (
    <>
    <div key={index} className="justify-between items-center mb-6 rounded-lg  dark:bg-slate-900 bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img
            src={product.product.imageCover}
            alt="product-image"
            className="w-full rounded-lg sm:w-40"
          />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900  dark:text-white">{product.product.title}</h2>
              <p className="mt-1 text-xs text-gray-700  dark:text-white">{formatCurrency(product.price)}</p>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-stretch border-gray-100">
                <button disabled={productCount === 1 }  onClick={()=>{setProductCount(productCount - 1) , UpdateCartProduct(product.product._id , productCount - 1 )}}
                 className="disabled:cursor-not-allowed disabled:hover:bg-gray-100  disabled:hover:text-black  min-w-0 rounded-none xl:ms-3 cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100  dark:bg-slate-950 hover:bg-blue-500 hover:text-blue-50">
                 {/* {decrement? <i class="fa fa-spinner animate-spin text-blue-500 "></i>  : "-"} */}
                 -
                </button>
                <input
                  className=" w-8 border  dark:bg-slate-800 bg-white text-center text-xs outline-none"
                  type="number"
                  value={productCount} onChange={(e) => setProductCount(e.target.value)} onBlur={(e)=> UpdateCartProduct(product.product._id , e.target.value ,product.count)}
                  min="1"
                  
                />
                {/* <i className="fas fa-spinner fa-spin"></i> */}
                <button  onClick={()=>{setProductCount(productCount + 1) , UpdateCartProduct(product.product._id , productCount + 1)}}
                 className="disabled:cursor-not-allowed min-w-0 rounded-none cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100  dark:bg-slate-950 hover:bg-blue-500 hover:text-blue-50">
                 {/* {increment?  <i className="fa fa-spinner animate-spin"></i> : "+"} */}
                  +
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">${formatCurrency(productCount * product.price)}</p>
               <Button className='bg-transparent min-w-0' isLoading={isLoading} onPress={()=>RemoveSpecificCartItems(product.product._id,setIsLoading)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>      
        
    </>
  )
}
