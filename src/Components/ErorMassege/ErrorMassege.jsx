import React from 'react'

export default function ErrorMessage({error}) {
  return (
    <p className='text-red-500 font-semibold mt-0.1 mb-3'>{error}</p>
  )
}
