import React, { useContext, useState } from 'react'
import {Input} from "@heroui/react";
import {Button} from "@heroui/react";
import {  useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




export default function UpdateUserPassword() {
  const [isLoading , setIsLoading] = useState(false)
  const [errMessage , setErrMessage] = useState("")
  const navigate = useNavigate()

  const initialValues =  {   
    currentPassword: "",
    password :"",  
    rePassword : "", 
  }


  function onSubmit(values){    
     setIsLoading(true)  
   axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",values ,
   {
    headers : {
      token: localStorage.getItem("token")
    }
   }
   ).then(({data})=> {
       if(data.statusMsg == "success"){             
        localStorage.setItem("token" , data.token)            
        navigate("/login")
        console.log(data)
       }
   }).catch((err)=>{
    setErrMessage(err.response.data.message)
   }).finally(()=>{
    setIsLoading(false)
   })    
  }
  
  const validationSchema = Yup.object({  
    currentPassword: Yup.string().required("Current password is required"),
    password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ,"Password must be 8+ characters with a letter, number, and special character."),
    rePassword: Yup.string().required("Repassword is required").oneOf([Yup.ref("password")],"Password and Repassword must be the same" ),
   
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
     
       <Input isInvalid={touched.currentPassword && errors.currentPassword} errorMessage={errors.currentPassword} name='currentPassword' value={values.currentPassword} onChange={handleChange} onBlur={handleBlur} className='md:col-span-2 w-full' variant='faded' label="Current Password" type="password" />
      <Input isInvalid={touched.password && errors.password} errorMessage={errors.password} name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} className='md:col-span-2 w-full'  variant='faded' label="Your New Password" type="password" />
      <Input isInvalid={touched.rePassword && errors.rePassword} errorMessage={errors.rePassword} name='rePassword' value={values.rePassword} onChange={handleChange} onBlur={handleBlur} className='md:col-span-2 w-full' variant='faded' label="Confirm Password" type="password" />
      <Button disabled={isLoading} isLoading={isLoading} type='submit' className='my-2 md:col-span-2' color="primary">
      Update Your password
    </Button>   
    {errMessage && <p className='text-black dark:text-white text-small'>{errMessage}</p>}
    </div>
    
        </form>
      </div>
    </>
  )
}
