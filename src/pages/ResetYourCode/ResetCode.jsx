import React, { useState } from 'react'
import {Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function ResetCode() {
      const [isLoading , setIsLoading] = useState(false)
      const [errMessage , setErrMessage] = useState("")
      const navigate = useNavigate()

      const initialValues =  {   
        resetCode :"",       
      }
    
            
      function onSubmit(values){
        setIsLoading(true);
       axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values)
       .then(({data})=> {           
           if(data.status === "Success"){                                
            navigate("/resetpassword")
           }
       }).catch((err)=>{
        setErrMessage(err.response.data.message || "Something went wrong")
       }).finally(()=>{
        setIsLoading(false)
       })    
      }
      
    
      const validationSchema = Yup.object({
      
        resetCode: Yup.string().required("Reset Code is required").matches(/^\d{6}$/ ,  "Reset Code must be exactly 6 digits"),
              
      }) 
    
      const {values , handleChange , handleSubmit , errors , touched ,handleBlur} =useFormik({
        initialValues,
        onSubmit,
        validationSchema,
      })
    
      
  return (
    <>
       <div className="mt-4 py-6">
              <form onSubmit={handleSubmit}>
              <div className="lg:w-2/3 m-auto grid md:grid-cols-2 gap-4">
              <h1 className='text-2xl font-bold'>Enter Your reset Code</h1>
           
            <Input isInvalid={touched.resetCode && errors.resetCode} errorMessage={errors.resetCode} name='resetCode' value={values.resetCode} onChange={handleChange} onBlur={handleBlur} className='md:col-span-2 w-full'  variant='faded' label="Reset code sent to your email" type="text" />
                     
            <Button disabled={isLoading} isLoading={isLoading} type='submit' className='my-2 md:col-span-2' color="primary">
           Confim
          </Button>   
          {errMessage && <p className='text-red-500 text-small'>{errMessage}</p>}
          </div>         
              </form>
            </div>
    </>
  )
}
