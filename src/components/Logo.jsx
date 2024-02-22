import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/")
  }

  return (
    <div className='flex items-center justify-center shadow-inner rounded-full h-10 w-10 active:scale-95 cursor-pointer' onClick={handleNavigate}>
      
    </div>
  )
}

export default Logo