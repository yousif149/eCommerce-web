import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../Contexts/AuthContext/AuthContextProvider";
import axios from "axios";
import { formatCurrency } from "../../helpers/Currancy";
import LoadingScreen from "../../component/LoadingScreen/LoadingScreen";

export default function Allorders() {
  const { userId } = useContext(authContext);
  console.log(userId);
   const [orders , setOrders ] = useState([])

    const [isLoading , setIsLoading] = useState(false)

  useEffect(() => {
    if (userId) getUserOrders();
  }, [userId]);

  async function getUserOrders() {
    setIsLoading(true)
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/orders/user/" + userId
    );
     setOrders(data)
     setIsLoading(false)
    console.log(data);
  }

  if (isLoading){
    return <LoadingScreen/>
  }
  return (
    <>
    {
       <div className="max-w-6xl mx-auto p-4">
       {orders.length > 0 ? (
         orders.map((order, index) => (
           <div
             key={index}
             className="max-w-4xl my-5 mx-auto dark:bg-slate-900 bg-white shadow-lg rounded-lg"
           >
             {/* Order Details Section */}
             <div className="p-6">
               <div className="grid grid-cols-3 gap-4 items-center">
                 <div>
                   <p className="text-gray-500 dark:text-gray-400">Date placed</p>
                   <p className="font-medium text-gray-800 dark:text-white">
                     {new Date(order.createdAt).toLocaleDateString()}
                   </p>
                 </div>
                 <div>
                   <p className="text-gray-500 dark:text-gray-400">Order number</p>
                   <p className="font-medium text-gray-800 dark:text-white">
                     {order._id}
                   </p>
                 </div>
                 <div className="text-right">
                   <p className="text-gray-500 dark:text-gray-400">Total amount</p>
                   <p className="font-medium text-gray-800 dark:text-white">
                     {formatCurrency(order.totalOrderPrice)}
                   </p>
                 </div>
               </div>
             </div>
 
             {/* Border Between Order Details and Product List */}
             <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-600 my-2"></div>
 
             {/* Product List Section */}
             <div className="p-6">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="border-b dark:border-gray-700">
                     <th className="p-2 font-medium text-gray-500 dark:text-gray-400">
                       Image
                     </th>
                     <th className="p-2 font-medium text-gray-500 dark:text-gray-400">
                       Product Name
                     </th>
                     <th className="p-2 font-medium text-gray-500 dark:text-gray-400 text-right">
                       Price
                     </th>
                   </tr>
                 </thead>
                 <tbody>
                   {order.cartItems.map((item, itemIndex) => (
                     <tr
                       key={itemIndex}
                       className="border-b dark:border-gray-700 last:border-0"
                     >
                       <td className="p-2">
                         <img
                           src={item.product.imageCover}
                           alt={item.product.title}
                           className="w-16 h-16 rounded object-cover"
                         />
                       </td>
                       <td className="p-2 font-medium text-gray-800 dark:text-white">
                         {item.product.title}
                       </td>
                       <td className="p-2 font-medium text-gray-800 dark:text-white text-right">
                         {formatCurrency(item.price)}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
         ))
       ) : (
         <p className="text-center text-gray-500 dark:text-gray-400">
           No orders found.
         </p>
       )}
     </div>
    }
     
 
    </>
  );
}
