import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { formatCurrency } from "../../helpers/Currancy";
import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import addProuctToCart from "../../Services/cartServices";
import LoadingScreen from "../../component/LoadingScreen/LoadingScreen";

export default function WishList() {
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [removingProductId, setRemovingProductId] = useState(null);

 

  function getWishList() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  const { data, isLoading , refetch } = useQuery({
    queryKey: ["wishList"],
    queryFn: getWishList,
    select: (data) => data?.data.data,
  });

  async function removeProductFromWishlist(productId) {
    setRemovingProductId(productId);
    const { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    localStorage.setItem(`wishlist-${productId}`, "false");
    await refetch();   
    setRemovingProductId(null);
  }

 

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <> 
      {
        data.length > 0 ? 
        
        <div className="">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Wish List
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.map((product, index) => {
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <Link to={"/productDetails/" + product.id} className="">
                  {" "}
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-32 h-32 object-cover mb-4 rounded"
                  />
                </Link>
                <Link to={"/productDetails/" + product.id} className="">
                  {" "}
                  <h2 className="text-lg font-semibold line-clamp-1">
                    {product.title}
                  </h2>
                </Link>
                <p className="text-dark my-1 line-clamp-1">
                  {product.description}
                </p>
                <p className="text-dark mt-1  mb-3">
                  price:{formatCurrency(product.price)}
                </p>
                <div className="flex flex-col md:flex-row md:space-x-2 w-full">
                  <div className=" flex justify-around align-middle w-full">
                    <Button
                      onPress={() =>
                        addProuctToCart(product.id, setAddToCartLoading)
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
                    >
                      Add to cart
                    </Button>
                    <Button
                      onPress={() => removeProductFromWishlist(product.id)}
                      disabled={removingProductId === product.id}
                      className={`text-red-500 hover:text-red-700 !bg-transparent hover:!bg-transparent focus:bg-transparent active:bg-transparent border-none shadow-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none w-full md:w-auto mt-2 md:mt-0 ${
                        removingProductId === product.id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {removingProductId === product.id ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        <i className="fas fa-trash"></i>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      :
      <h1 className="text-3xl text-center font-bold py-10">No Product In Your Wish List</h1>

      }
      
    </>
  );
}
