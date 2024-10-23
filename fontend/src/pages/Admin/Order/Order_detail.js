import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config';


const Order_detail=({sendOrder_id,onClose})=> {
    const [order_id, setorder_id] = useState(null);
    const [orderDetails, setorderDetails] = useState(null);


    useEffect(()=>{
        setorder_id(sendOrder_id);
    })

    useEffect(()=>{
        if(order_id!==null){
            axios.get(`${apiUrl}/api/order/${order_id}/orderDetail`)
            .then(response => {
                setorderDetails(response.data.data); // assume response data has a 'data' field
            })
            .catch(error => console.error('Error fetching orders:', error));
            }
    },[order_id])


    return ( 
        <div>
             <div className="form-popup " style={{width:'800px'}}>
                <h5>Đơn hàng : DK01</h5>
                <div className="m-2 border-bottom p-2">
                    <p style={{fontWeight:'500'}}>Địa chỉ nhận hàng</p>
                    <p className="m-0">Tên</p>
                    <p className="m-0">Số điện thoại</p>
                    <p className="m-0">Địa chỉ</p>
                </div>
                <div style={{overflowY: 'auto',overflowX: 'hidden',marginTop:'20px',height:'300px'}}>
                    <table className="table table-striped pt-3">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Sản phẩm</th>
                                <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Số lượng</th>
                                <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Đơn giá</th>
                                <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails!==null?
                            orderDetails.map(orderDetail=>(
                            <tr >
                                <td>{orderDetail.orderDetail_id}</td>
                                <td>{orderDetail.product.product_name}</td>
                                <td>{orderDetail.orderDetail_quantity}</td>
                                <td>{orderDetail.product.product_price}</td>
                                <td>{orderDetail.orderDetail_total}</td>
                                
                            </tr>
                            ))
                            :
                            <p>ko có đơn hàng chi tiết nào cả</p>
                            }
                        
                        </tbody>
                    </table>
                </div>

                <button type="button" className="btn btn-secondary" style={{position:'absolute', bottom:'5%',right:'5%'}} onClick={onClose}>Đóng</button>
             </div>
        </div>
     );
}

export default Order_detail;