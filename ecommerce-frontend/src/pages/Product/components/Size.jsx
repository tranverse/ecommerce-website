import React from 'react'

const Size = ({size}) => {
  return (
    <div className='border rounded-lg p-2 border-gray-300 my-2 cursor-pointer text-sm text-gray-700 hover:border-[var(--primary)]'>
        {size}
    </div>
  )
}

export default Size