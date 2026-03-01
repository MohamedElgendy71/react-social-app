import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Eye, EyeSlash } from 'iconsax-reactjs'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'




import * as z from "zod"
import ErrorMessage from '../../Components/ErorMassege/ErrorMassege'

let Schema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(10, "Name must be at most 10 characters"),

  email: z.string().email("Invalid email"),

  password: z.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
    "Password must be 8-10 chars with upper, lower, number & symbol"
  ),

  rePassword: z.string(),

  dateOfBirth: z.string(),

  gender: z.enum(["male", "female"])
}).refine((values) => {
  if (values.password === values.rePassword) { return true }
  return false
},
  { error: "the confirm not correct!", path: ["rePassword"] });


export default function register() {

  let [isShow, setisShow] = useState(false)


  function handlePassword() {
    setisShow(!isShow)
  }

  let [isShowtwo, setisShowtwo] = useState(false)


  function handleConfirmPassword() {
    setisShowtwo(!isShowtwo)
  }

  let [formError, setFormError] = useState(null)

  let [formResponse, setFormResponse] = useState(null)

  let [isLoading, setIsLoading] = useState(false)


  let Router = useNavigate()

  let { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: 'male',
    },
    mode: "all"
  })



  async function SendDataToRegister(values) {

    console.log(values);

    setIsLoading(true)



    try {

      const { data } = await axios(`${import.meta.env.VITE_API_URL}/users/signup`, {
        method: "POST",
        data: values
      });

      console.log(data);

      setFormResponse(data?.message)

      setTimeout(() => {

        Router("/Login")

      }, 1000);




    } catch (error) {
      let ErrorMessage = ("Error:", error?.response?.data?.error);
      setFormError(ErrorMessage)
      setIsLoading(false)

      setTimeout(() => {
        setFormError(null);
      }, 3000);
    }

  }



  return (
    <div className='min-h-screen flex justify-center items-center mt-5'>


      <div className="card bg-white w-full max-w-lg  p-8 rounded-3xl shadow-xl">
        <h2 className='text-4xl  font-bold text-center text-blue-600 mb-1'>Creat Account</h2>
        <p className='font-semiboldbold text-center text-gray-500'>Jpin  the community and start sharing 🚀</p>

        <form onSubmit={handleSubmit(SendDataToRegister)} className='my-4 '>


          {/* User Name */}
          <div>
            <label className='text-xl font-semibold' htmlFor='name'>User Name</label>
            <input {...register('name')} type="text" className='input' id='name' placeholder='User Name' />
            <ErrorMessage error={formState.errors.name?.message} />
          </div>
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
          {/* Confirm Password */}
          <div className=''>
            <label className='text-xl font-semibold' htmlFor='confirmPassword'>Confirm Password</label>
            <div className='relative'>
              <input {...register('rePassword')} type={isShowtwo ? 'text' : 'password'} className='input' id='confirmPassword' placeholder='Confirm Password' />
              {isShowtwo
                ? <Eye onClick={handleConfirmPassword} className='absolute end-3 top-[50%] translate-y-[-50%] cursor-pointer' />
                : <EyeSlash onClick={handleConfirmPassword} className='absolute end-3 top-[50%] translate-y-[-50%] cursor-pointer ' />
              }
            </div>
            <ErrorMessage error={formState.errors.rePassword?.message} />
          </div>
          {/* Barth Date */}
          <div>
            <label className='text-xl font-semibold' htmlFor='date'>Barth Date</label>
            <input {...register('dateOfBirth')} type="date" className='input' id='date' placeholder='Barth Date' />
            <ErrorMessage error={formState.errors.dateOfBirth?.message} />
          </div>
          {/* Gender */}
          <div >
            <h3 className='text-xl font-semibold mb-2'>Gender</h3>
            <input {...register('gender')} className='me-1' type="radio" id='male' name='gender' value={'male'} placeholder='Confirm Password' />
            <label className='text-xl  me-3' htmlFor='male'>Male</label>
            <input {...register('gender')} className='me-1' type="radio" name='gender' id='female' value={'female'} placeholder='Confirm Password' />
            <label className='text-xl  me-3' htmlFor='female'>female</label>
          </div>

          <ErrorMessage error={formError} />

          {formResponse && (
            <p className='text-green-500 font-semibold'>
              {formResponse}
            </p>
          )}

          <button className='btn'>Creat an account {isLoading && "..."}</button>

          <p className='text-center'>Already have an  account? <Link className='text-blue-600 font-bold' to={'/Login'}>Login Now</Link></p>
        </form>
      </div>

    </div>
  )
}
