import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { data, useParams } from 'react-router-dom'
import LoadingScreen from '../../component/LoadingScreen/LoadingScreen'

export default function BrandDetails() {
    const {brandId} = useParams()
    console.log(brandId)

    function GetSspecificBrand(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands/" + brandId)
    }
    const {data , isLoading} = useQuery({
        queryKey:['getBrand'],
        queryFn: GetSspecificBrand,
        select: (data)=> data?.data.data
    })
    console.log(data)

 if(isLoading){
    return <LoadingScreen/>
 }
      
  return (
    <>
   <div className="max-w-7xl mx-auto px-4 py-10">
  <div className="flex flex-col md:flex-row items-center gap-10">
    {/* Image Section */}
    <div className="w-full md:w-1/2">
      <div className="overflow-hidden rounded-lg shadow-md group">
        <img
          src={data?.image}
          alt={data?.name}
          className="w-full h-auto object-cover rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>
    </div>

    {/* Details Section */}
    <div className="w-full md:w-1/2 space-y-4">
      <h1 className="text-5xl font-bold text-gray-800 dark:text-white">{data?.name}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        This brand is known for its high-quality products tailored to meet customer needs.
      </p>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Why Choose {data?.name}?
        </h2>
        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
          <li>High-quality products</li>
          <li>Innovative designs</li>
          <li>Exceptional customer service</li>
          <li>Trusted by millions worldwide</li>
        </ul>
      </div>
    </div>
  </div>
</div>

    </>
  )
}
