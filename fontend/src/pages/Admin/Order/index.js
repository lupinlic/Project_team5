import Order_detail from "./Order_detail";
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config';


function Order() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [Orders, setOrders] = useState(null);

    const openForm = () => {
        setIsFormVisible(true);
      };
    
      // Đóng form
      const closeForm = () => {
        setIsFormVisible(false);
      };

    useEffect(()=>{
        GetOrders();
    },[])

    const GetOrders =()=>{
        axios.get(`${apiUrl}/api/orders`)
        .then(response => {
            setOrders(response.data.data); // assume response data has a 'data' field
            console.log(response.data)
        })
        .catch(error => console.error('Error fetching orders:', error));
    }


    const OrderConfirmation= (order)=>{
        axios.get(`${apiUrl}/api/order/${order.order_id}/status`)
            .then(response => {
                GetOrders()
            })
            .catch(error => console.error('có lỗi trong việc xác nhận đơn hàng:', error));
    }

    const OrderDelete= (order)=>{
        axios.delete(`${apiUrl}/api/orders/${order.order_id}`)
            .then(response => {
                GetOrders()
                 // assume response data has a 'data' field
            })
            .catch(error => console.error('có lỗi trong việc xóa đơn hàng:', error));
    }

    return ( 
        <div className="p-2">
            <h6>Danh sách đơn hàng</h6>
            <table className="table table-striped pt-3 mt-3">
                    <thead>
                        <tr>
                        <th>Mã đơn hàng</th>
                        <th>Ngày đặt</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Orders!==null && Orders?.length>0 ?
                        Orders.map(order=>(
<>  
                            <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>{order.order_date}</td>
                            <td>{order.order_totalmoney}</td>
                            <td>
                                {order.order_status? 
                                <button  className="btn btn-warning btn-sm mr-2" style={{cursor:'no-drop'}}>Đơn hàng đã giao</button>
                                :
                                <>
                                <button  className="btn btn-warning btn-sm mr-2" 
                                onClick={()=>OrderConfirmation(order)}>Xác nhận</button>
                                <button  className="btn btn-danger btn-sm" 
                                onClick={()=>OrderDelete(order)}> Hủy đơn</button>
                                </>
                                }
                            </td>
                            <td>
                                <button  className="btn btn-warning btn-sm mr-2"  onClick={() => openForm()}>Xem chi tiết </button>
                                {isFormVisible && (
                                    <>
                                    <div className="overlay"></div> {/* Lớp overlay */}
                                    <Order_detail
                                    sendOrder_id={order.order_id}
                                    onClose={closeForm} 
                                    />
                                    </>
                                )}
                            </td>
                            </tr>
                        </>
                        ))
                        :
                        <p>ko có đơn hàng nào cả</p>
                        }
                        
                    
                        
                        {/* ))} */}
                    </tbody>
                </table>
        </div>
     );
}

export default Order;