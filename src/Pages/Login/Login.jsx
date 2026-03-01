import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeSlash } from 'iconsax-reactjs'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as z from "zod"
import axios from 'axios'
import ErrorMessage from '../../Components/ErorMassege/ErrorMassege'
import { baseURl } from '../../constants'
import { AuthContext } from '../../Context/AuthContextProvider'

let Schema = z.object({


  email: z.string().email("Invalid email"),

  password: z.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
    "Password must be 8-10 chars with upper, lower, number & symbol"
  ),

})



export default function Login() {

  let Router = useNavigate()

  let [isLoading, setIsLoading] = useState(false)

  let [isShow, setisShow] = useState(false)

  let [Error, setError] = useState(null)

  function handlePassword() {
    setisShow(!isShow)
  }

  let { setToken } = useContext(AuthContext)



  let { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: "all"
  })
  





  async function SendDataToLogin(values) {

    console.log(values);

    setIsLoading(true)

    try {

      const { data } = await axios(`${import.meta.env.VITE_API_URL}/users/signin`, {
        method: "POST",
        data: values
      });

      console.log(data);



      setToken(data.data.token)
      localStorage.setItem("token", data?.data?.token)
      
      





      Router("/")




    } catch (error) {
      let ERrorMessage = ("error:", error?.response?.data?.error);
      setError(ERrorMessage)
      setIsLoading(false)

      setTimeout(() => {
        setError(null);
      }, 3000);

    }

  }



  return (
    <div className='min-h-screen flex justify-center items-center '>


      <div className="card bg-white w-full  max-w-lg p-8 rounded-3xl shadow-xl">
        <h2 className='text-4xl  font-bold text-center text-blue-600 mb-1'>Welcome back</h2>
        <p className='font-semiboldbold text-center text-gray-500'>Sign in to your account</p>

        <form onSubmit={handleSubmit(SendDataToLogin)} className='my-4 '>


          {/* Email */}
          <div>
            <label className='text-xl font-semibold' htmlFor='email'>Email</label>
            <input {...register('email')} type="text" className='input' id='email' placeholder='Email' />
            <ErrorMessage error={formState.errors.email?.message} />
          </div>
          {/* Password */}
          <div>
            <label className='text-xl font-semibold' htmlFor='password'>Password</label>
            <div className='relative'>
              <input {...register('password')} type={isShow ? 'text' : 'password'} className='input' id='password' placeholder='Password' />
              {isShow
                ? <Eye onClick={handlePassword} className='absolute end-3 top-[50%] translate-y-[-50%] cursor-pointer' />
                : <EyeSlash onClick={handlePassword} className='absolute end-3 top-[50%] translate-y-[-50%] cursor-pointer' />
              }
            </div>
            <ErrorMessage error={formState.errors.password?.message} />
          </div>

          <ErrorMessage error={Error} />

          <button className='btn'>Sign in {isLoading && "..."}</button>

          <p className='text-center'>Don't have an account? <Link className='text-blue-600 font-bold' to={'/Register'}>Join</Link></p>
        </form>
      </div>

    </div>
  )
}
