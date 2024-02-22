import React from 'react'
import { useNavigate } from 'react-router-dom'
import routes from '../Routes'

const Footer = () => {

  const navigate = useNavigate()

  return (
    <div className="border-t border-gray-400 mt-10 flex flex-col gap-2 py-5">
    <div className='grid grid-cols-5 gap-5 '>
      <div className="border border-yellow-400 h-auto">

      </div>
      <div className="border border-red-400 h-auto">

      </div>
      <div className="border border-blue-400 h-52">

      </div>
      <div className="border border-green-400 h-auto">

      </div>
      <div className="border border-black h-auto">

      </div>
    </div>

    <div className=" h-auto py-6 flex items-center border-b border-gray-400">
        <p className="text-sm text-pale-blue lg:w-[35%]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nihil consequatur nobis dignissimos reiciendis itaque quod, perferendis.
        </p>
    </div>

    <div className="flex justify-between">
      <button onClick={()=> navigate(routes.login)}>login</button>
      <button onClick={()=> navigate(routes.dashboard)}>Dashboard</button>
      <button onClick={()=> navigate(routes.home)}>Home</button>
    </div>
    </div>
  )
}

export default Footer