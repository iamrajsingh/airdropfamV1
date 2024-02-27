import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.jpg"

const Logo = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/")
  }

  return (
    <div className='flex items-center justify-center shadow-inner rounded-full h-12 w-12 active:scale-95 cursor-pointer' onClick={handleNavigate}>
      <img src={logo} alt="" className='rounded-full'/>
    </div>
  )
}

export default Logo