import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CartProduct from '../../component/CartProduct/CartProduct'
import { formatCurrency } from '../../helpers/Currancy'
import LoadingScreen from '../../component/LoadingScreen/LoadingScreen'
import { Button } from '@heroui/react'
import { Link } from "react-router-dom";


export default function Cart() {
   const [cartId,setCartId] = useState(null)
   const [numOfCartItems,setNumOfCartItems] = useState(0)
   const [cartData,setCartData] = useState(null)
   const [clearLoading , setClearLoading] = useState(false)
   const [isLoading , setIsLoading] = useState(false)

   const [requestTimeOut , setRequestTimeOut] = useState()

  

  useEffect(()=>{
    GetUserCard()
  },[])

  async function GetUserCard() {
    setIsLoading(true)
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
      headers:{
        token: localStorage.getItem("token")
      }
    })    
    setCartId(data.cartId)
    setNumOfCartItems(data.numOfCartItems)
    setCartData(data.data)
    setIsLoading(false)

  }


  async function RemoveSpecificCartItems(cartId ) {
    
    const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/"+cartId ,{
      headers:{
        token:localStorage.getItem("token")
      }
    })    
    setCartId(data.cartId)
    setNumOfCartItems(data.numOfCartItems)
    setCartData(data.data)
    
  }

  async function ClearAllCart() {
    setClearLoading(true)
    const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart" ,{
      headers:{
        token: localStorage.getItem("token")
      }
    }) 
    setCartId(null)
    setNumOfCartItems(0)
    setCartData(null)    
    setClearLoading(false)
  }


  function UpdateCartProduct(cartId, count ) {
    clearTimeout(requestTimeOut)
    setRequestTimeOut(setTimeout(() => {
      axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${cartId}`,{
        count,
      } ,{
        headers: {
          token : localStorage.getItem("token")
        }
      }).then(({data})=>{
        setCartId(data.cartId)
        setNumOfCartItems(data.numOfCartItems)
        setCartData(data.data)   
      })         
     }, 200));
  }


  if(isLoading){
   return  <LoadingScreen/>
  }

  if(numOfCartItems == 0){
   return <h1 className='text-center text-3xl font-bold py-10'>No Product In Your Cart</h1>
  } 

  return (
    <>    
   <div className="flex justify-between align-middle">
     <h1 className="mb-10 text-center text-2xl font-bold">Cart Items({numOfCartItems})</h1>
    <Button isLoading={clearLoading} variant="bordered" color="danger" onPress={ClearAllCart}> Clear </Button>
   </div>
    <div className="justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">

      {
        cartData?.products?.map((product,index)=>{
          return  <CartProduct product={product} key={index}  RemoveSpecificCartItems={RemoveSpecificCartItems} UpdateCartProduct={UpdateCartProduct}/>
        })
      }  
       
      </div>

      {/* Subtotal Section */}
      <div className="sticky top-10 mt-6 h-full rounded-lg border  dark:bg-slate-900 bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700 dark:text-white">Subtotal</p>
          <p className="text-gray-700  dark:text-white">{formatCurrency(cartData?.totalCartPrice)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700  dark:text-white">Shipping</p>
          <p className="text-gray-700  dark:text-white">$4.99</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div>
            <p className="mb-1 text-lg font-bold ">{formatCurrency(cartData?.totalCartPrice + 4.99)}</p>
            <p className="text-sm text-gray-700  dark:text-white">including VAT</p>
          </div>
        </div>
        <Link to={"/address/"+cartId} className="mt-6 w-full block text-center rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
          Check out
        </Link>
      </div>
    </div>
  
    </>
  )
}
