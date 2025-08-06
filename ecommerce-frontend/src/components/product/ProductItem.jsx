import React from 'react'
import ProductImage from '@assets/images/Product/product.jpg'
import { BsCartPlus } from "react-icons/bs";
import { CiStar } from "react-icons/ci";

const ProductItem = () => {
  return (
    <div className='border border-gray-200 hover:shadow-lg cursor-pointer'>
        <div className=''>
            <img src={ProductImage} className='w-full max-w-full h-[320px]' alt="Product"   />
        </div>
        <div className='p-2 '>
            <p className=' text-base line-clamp-2 text-gray-700'>Mũ lưỡi trai_ Tổng hợp nón kết lưỡi trai D,2 bản cao cấp xịn  </p>
            <div className='flex my-1 text-base'>
              <CiStar /><CiStar /><CiStar /><CiStar />
            </div>
            <div className='flex justify-between '>
              <p className='font-semibold text-[#FFB5A7]'>100đ</p>
                <BsCartPlus className='text-xl text-[#FFB5A7]'/>
            </div>
        </div>  
    </div>
  )
}

export default ProductItem