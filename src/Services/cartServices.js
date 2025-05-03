import { Bounce, toast } from 'react-toastify';
import axios from 'axios'

export default async function addProuctToCart(productId,setIsLoading) {
    setIsLoading(true)
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
      productId,
    },{
      headers:{
        token: localStorage.getItem("token")
      }
    }) 
    setIsLoading(false)   
      
    if(data.status == 'success'){
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
  }   