import React, { useState } from 'react'
import {Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { Formik, useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function Address() {
  const [isLoading , setIsLoading] = useState(false) 
  const {cartId} = useParams()
 

  async function Chechout() {
    setIsLoading(true)
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/"+cartId,{
     shippingAddress: values
    },{
      headers:{
        token:localStorage.getItem("token")
      },
      params:{
        url:"https://e-commerce-ecru-eight.vercel.app"
      }
    })
    setIsLoading(false)
   location.href=(data.session.url)  
  }

  const initialValues =  {    
    city :" ",
    details : " ",   
    phone :" "      
  }


  const validationSchema = Yup.object({
   city: Yup.string().required("City is required").min(3,"Name must be at leaste 3 charachters").max(20, "Name must be at most 20 charachters"),
   details: Yup.string().required("Location is required").min(3,"Name must be at leaste 3 charachters").max(20, "Name must be at most 20 charachters"),
   phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Invalid number. Use 010, 011, 012, or 015, with 8 digits."),
  }) 

  const {values , handleChange , handleSubmit , errors , touched ,handleBlur} =useFormik({
    initialValues,
    onSubmit: Chechout,
    validationSchema,
  })

  
  return (
    <>
         <div className="mt-4 py-6">
        <form onSubmit={handleSubmit}>
        <div className="lg:w-2/3 m-auto grid md:grid-cols-2 gap-4">
        <h1 className='text-2xl font-bold'>Enter Your Address</h1>
      <Input isInvalid={touched.city && errors.city} errorMessage={errors.city} name='city' value={values.city}  onChange={handleChange} onBlur={handleBlur} className='md:col-span-2' variant='faded' label="City" type="text" />
      <Input isInvalid={touched.details && errors.details} errorMessage={errors.details} name='details' value={values.details}  onChange={handleChange} onBlur={handleBlur} className='md:col-span-2' variant='faded' label="Location" type="text" />    
      <Input isInvalid={touched.phone && errors.phone} errorMessage={errors.phone} name='phone' value={values.phone} onChange={handleChange} onBlur={handleBlur} className='md:col-span-2'  variant='faded' label="Phone" type="text" />
      <Button disabled={isLoading} isLoading={isLoading} type='submit' className='my-2 md:col-span-2' color="primary">
     Place Order
    </Button>
   
    </div>
        </form>
      </div>
    </>
  )
}

