import React, { useState } from 'react'
import {Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { Formik, useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [isLoading , setIsLoading] = useState(false)
  const [errMessage , setErrMessage] = useState("")
  const navigate = useNavigate()

  const initialValues =  {
    name : "",
    email :"",
    password :"",
    rePassword :"",
    phone :""  
  }

  function onSubmit(values){
    setIsLoading(true)
   axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
   .then(({data})=> {
       if(data.message == "success"){
        navigate("/login")
       }
   })
   .catch((err)=>{
    setErrMessage(err.response.data.message)
   })
   .finally(()=>{
    setIsLoading(false)
   })    
  }
  
  const validationSchema = Yup.object({
   name: Yup.string().required("Name is required").min(3,"Name must be at leaste 3 charachters").max(20, "Name must be at most 20 charachters"),
   email: Yup.string().required("Email is required").email("Invalid email"),
   password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ,"Password must be 8+ characters with a letter, number, and special character."),
   rePassword: Yup.string().required("Repassword is required").oneOf([Yup.ref("password")],"Password and Repassword must be the same" ),
   phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Invalid number. Use 010, 011, 012, or 015, with 8 digits."),
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
        <h1 className='text-2xl font-bold'>Register Now</h1>
      <Input isInvalid={touched.name && errors.name} errorMessage={errors.name} name='name' value={values.name}  onChange={handleChange} onBlur={handleBlur} className='md:col-span-2' variant='faded' label="Name" type="text" />
      <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} name='email'value={values.email} onChange={handleChange} onBlur={handleBlur} className='md:col-span-2'  variant='faded' label="Email" type="email" />
      <Input isInvalid={touched.password && errors.password} errorMessage={errors.password} name='password' value={values.password} onChange={handleChange} onBlur={handleBlur}  variant='faded' label="Password" type="password" />
      <Input isInvalid={touched.rePassword && errors.rePassword} errorMessage={errors.rePassword} name='rePassword' value={values.rePassword} onChange={handleChange} onBlur={handleBlur} variant='faded' label="Repassword" type="password" />
      <Input isInvalid={touched.phone && errors.phone} errorMessage={errors.phone} name='phone' value={values.phone} onChange={handleChange} onBlur={handleBlur} className='md:col-span-2'  variant='faded' label="Phone" type="text" />
      <Button disabled={isLoading} isLoading={isLoading} type='submit' className='my-2 md:col-span-2' color="primary">
      Sign Up
    </Button>
    {errMessage && <p className='text-red-500 text-small'>{errMessage}</p>}
    </div>
        </form>
      </div>
    </>
  )
}
