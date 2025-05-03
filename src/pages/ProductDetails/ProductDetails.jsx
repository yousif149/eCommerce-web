import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../../component/LoadingScreen/LoadingScreen'
import Slider from "react-slick";
import { Button } from '@heroui/react';
import { formatCurrency } from '../../helpers/Currancy';
import addProuctToCart from '../../Services/cartServices';
import addProductWishlist from '../../Services/addProductWishlist';


export default function ProductDetails() {  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };

 const[productDetails,setProductDetails] = useState(null)
 const [isLoading , setIsLoading] = useState(true)
 const [addToCartLoading,setAddToCartLoading] = useState(false);
    const {id} = useParams()   

    useEffect(()=>{
        getProductDetails(id)
    },[])

  async function getProductDetails(ProductId){
    setIsLoading(true)
   const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + ProductId)   
    setProductDetails(data.data)
    setIsLoading(false)  
    }

    if(isLoading){
      return <LoadingScreen/>
     }

  return (
    <>
       <div className="bg-gray-100 dark:bg-slate-900">
      <div className="container mx-auto px-4 ">
        <div className="flex items-center flex-wrap -mx-4">
          {/* Product Images */}
          <div className="w-full md:w-1/3 px-4 mb-8 ">

           
    <Slider {...settings}>
      {
        productDetails.images.map((imgSrc,index) =>{
         return <img key={index}
          src={imgSrc}
          alt={productDetails?.title}
          className="w-full h-auto rounded-lg shadow-md mb-4"
        />
        })
      }     
    </Slider>    
           
          </div>

          {/* Product Details */}
          <div className="w-full md:w-2/3 px-4">
            <h2 className="text-3xl font-bold mb-2 dark:text-white">{productDetails?.title}</h2>
            <p className="text-gray-600 mb-4  dark:text-white">SKU: WH1000XM4</p>
            <div className="mb-4">
            {productDetails?.priceAfterDiscount ?
            <>
            <span className="text-3xl font-bold text-slate-900  dark:text-white">{formatCurrency(productDetails?.priceAfterDiscount)}</span>
            <span className="text-sm text-slate-900 line-through  dark:text-white">{formatCurrency(productDetails?.price)}</span>
           </> :
           <span className="text-3xl font-bold text-slate-900  dark:text-white">{formatCurrency(productDetails?.price)}</span>           
           }
            </div>
            <div className="flex items-center mb-4">
            
               {[1,2,3,4,5].map((rate , index)=>{
                return productDetails?.ratingsAverage >= rate ?
                <svg key={index} aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                :
                <svg key={index} aria-hidden="true" className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
               </svg>
               })}
             
              <span className="ml-2 text-gray-600  dark:text-white">{productDetails?.ratingsAverage} ({productDetails?.ratingsQuantity} reviews)</span>
            </div>

            <h5 className="text-gray-700  my-2-2  dark:text-white">
             <span className='font-bold'>category:</span> <span> {productDetails?.category?.name}</span>
            </h5>

            <h5 className="text-gray-700 my-2  dark:text-white">
            <span className='font-bold'>Brand:</span> <span> {productDetails?.brand?.name}</span>
            </h5>


           <p className="text-gray-700 mb-6  dark:text-white">
              {productDetails?.description}
            </p>
                    

            <div className="flex space-x-4 mb-6">
              <Button isLoading={addToCartLoading}  onPress={()=>addProuctToCart(productDetails?._id , setAddToCartLoading)} className="bg-indigo-600 text-white px-6 py-2 rounded-md">
                Add to Cart
              </Button>
              <Button onPress={addProductWishlist(productDetails?._id)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md">
                Wishlist
              </Button>
            </div>
           
          </div>
        </div>
      </div>
    </div>
           
    </>
  )
}
