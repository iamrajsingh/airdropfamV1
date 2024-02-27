import React from 'react'

const AirdropCardSkeleton = () => {
  return (
    <div className='w-full border h-[18rem] shadow-inner rounded-md p-3 gap-2 flex flex-col'>
    <div className='w-full h-[80%]  animate-pulse bg-gray-300 rounded-md'>

    </div>
    <div className='w-full h-[20%]  flex justify-between items-center'>
        <div className='w-[55%] animate-pulse bg-gray-300 h-8 rounded-md'></div>
        <div className='w-[20%] animate-pulse bg-gray-300 h-8 rounded-md'></div>
    </div>

    </div>
  )
}

export default AirdropCardSkeleton