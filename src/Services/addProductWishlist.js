import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default async function addProductWishlist(productId) {
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
            productId,
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        }) 
    console.log(data)
  }

//   function addProductWishlist(){
//     return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist" ,{
//           productId,
//       },{
//           headers:{
//               token:localStorage.getItem("token")
//           }
//       })  
//   }

//   const {data} = useQuery({
//     queryKey: ['addProductWishlist'],
//     queryFn: addProductWishlist,
//     select: (data)=> data
//   })
//   console.log(data)