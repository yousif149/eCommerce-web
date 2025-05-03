import React, { useContext, useState } from 'react'
import {Input} from "@heroui/react";
import {Button} from "@heroui/react";
import {  useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




export default function ResetPassword() {
  const [isLoading , setIsLoading] = useState(false)
  const [errMessage , setErrMessage] = useState("")
  const navigate = useNavigate()

  const initialValues =  {      
    email:"",  
    newPassword: "", 
  }
  
  

  function onSubmit(values){
    setIsLoading(true)
   axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",values)
   .then(({data})=> {
    console.log(data)    
    localStorage.getItem("token")  
    navigate("/login")
   })
   .catch((err)=>{
    setErrMessage(err.response.data.message)
   })
   .finally(()=>{
    setIsLoading(false)
   })    
  }
  const validationSchema = Yup.object({  
    email: Yup.string().required("Email is required").email("Invalid email"),
    newPassword: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ,"Password must be 8+ characters with a letter, number, and special character."),
  
   
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
        <h1 className='text-2xl font-bold'> Update Your password</h1>

       <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} name='email'value={values.email} onChange={handleChange} onBlur={handleBlur} className='md:col-span-2 w-full'  variant='faded' label="Email" type="email" />
       <Input isInvalid={touched.newPassword && errors.newPassword} errorMessage={errors.newPassword} name='newPassword' value={values.newPassword} onChange={handleChange} onBlur={handleBlur} className='md:col-span-2 w-full'  variant='faded' label="New Password" type="password" />
           
    
      <Button disabled={isLoading} isLoading={isLoading} type='submit' className='my-2 md:col-span-2' color="primary">
      Update Your password
    </Button>       
    </div>
    
        </form>
      </div>
    </>
  )
}
