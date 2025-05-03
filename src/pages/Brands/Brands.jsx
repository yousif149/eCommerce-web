import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import LoadingScreen from "../../component/LoadingScreen/LoadingScreen"
import { Button } from "@heroui/react"
import { Link } from "react-router-dom"

export default function Brands() {

  function getAllBrands(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }
    const {data , isLoading} = useQuery({
      queryKey:['Brands'],
      queryFn:getAllBrands,
      select: (data)=> data?.data.data
    }) 


   

    if (isLoading){
      return <LoadingScreen/>
    }
 console.log(data)
  return (
    <>      
    
    <div className="max-w-7xl mx-auto px-4">
  <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white text-center">
    Brands
  </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {data?.map((product, index) => (
      <div key={index} className="bg-white text-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Image Section */}
        <Link to={"/brandDetails/"+product._id}>
          <div className="overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-contain transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
        {/* Brand Name Section */}
        <div className="p-4 text-center bg-transparent">
          <Link to={"/brandDetails/"+product._id}>
            <Button className="text-lg font-semibold bg-transparent shadow-md dark:text-black">
              {product.name}
            </Button>
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>

    </>
  )
}
