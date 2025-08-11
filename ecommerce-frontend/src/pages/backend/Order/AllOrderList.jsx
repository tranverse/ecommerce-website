import OrderService from '@services/order.service'
import React, { useState } from 'react'

const AllOrderList = () => {
  const [allOrder, setAllOrder] = useState([])
  const getAllOrder = async () => {
      const response = await OrderService.getAllOrder()
      if(response.data.success){
        setAllOrder(response.data.data)
      }
  }

  return (
    <div>

    </div>
  )
}

export default AllOrderList