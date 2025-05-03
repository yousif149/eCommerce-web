import React, { useContext, useState } from 'react'
import {Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { Formik, useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Contexts/AuthContext/AuthContextProvider';


export default function Login() {
  const [isLoading , setIsLoading] = useState(false)
  const [errMessage , setErrMessage] = useState("")
  const navigate = useNavigate()

  const initialValues =  {   
    email :"",
    password :"",   
  }

  function signup(){
    navigate("/register");
  }
  function forgetpassword(){
    navigate("/forgetpassword");
  }


 const {setIsLogedIn} = useContext(authContext)

  function onSubmit(values){
    setIsLoading(true)
   axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
   .then(({data})=> {
       if(data.message == "success"){       
        setIsLogedIn(true)
        localStorage.setItem("token" , data.token)        
        navigate("/")
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
  
   email: Yup.string().required("Email is required").email("Invalid email"),
   password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ,"Password must be 8+ characters with a letter, number, and special character."),
   
  }) 

  const {values , handleChange , handleSubmit , errors , touched ,handleBlur} =useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  
  return (
    <>
         <div className="mt-4 py-6 ">
        <form onSubmit={handleSubmit}>
        <div className="lg:w-2/3 m-auto grid md:grid-cols-2 gap-4">
        <h1 className='text-2xl font-bold'>Login Now</h1>
     
      <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} name='email'value={values.email} onChange={handleChange} onBlur={handleBlur} className='md:col-span-2 w-full'  variant='faded' label="Email" type="email" />
      <Input isInvalid={touched.password && errors.password} errorMessage={errors.password} name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} className='md:col-span-2 w-full'  variant='faded' label="Password" type="password" />
    
      <Button disabled={isLoading} isLoading={isLoading} type='submit' className='my-2 md:col-span-2' color="primary">
      Login
    </Button>   
    {errMessage && <p className='text-red-500 text-small'>{errMessage}  </p>}
    </div>
     <div className=" flex md:flex-row justify-around align-middle pt-2">
     
     <p className='text-sm'>Don't have an account? <a href='#' onClick={signup} className='text-blue-600 underline dark:text-blue-500 '>Signup</a></p>
     <a href='#' onClick={forgetpassword} className='  dark:text-white text-sm '> Forget Password?</a>
     </div>
        </form>
      </div>
    </>
  )
}
