import React from 'react'
import { Link } from 'react-router-dom'

export default function Navebar() {
  return (
    <div className='flex justify-around my-5'>
        <div className='flex items-center text-2xl font-bold'>
            <Link to="/">list of videos</Link>
        </div>
      <div className="flex items-center text-2xl font-bold">
        <Link to="/upload">Upload</Link>
      </div>
    </div>
  )
}
