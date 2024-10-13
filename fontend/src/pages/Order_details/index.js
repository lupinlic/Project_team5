import { useLocation } from 'react-router-dom';
import './style.css'
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Order_detail() {
    const [orderDetails, setorderDetails] = useState(null);
    const [order_id, setorder_id] = useState(null);
    const [receiver, setreceiver] = useState(null);
    const [order, setorder] = useState(null);

    const getOrder_id = useParams().order_id;

    useEffect(()=>{
        setorder_id(getOrder_id);
    })

    useEffect(()=>{
        if(order_id!==null){
            axios.get(`http://localhost:8000/api/order/${order_id}/orderDetail`)
            .then(response => {
                setorderDetails(response.data.data); // assume response data has a 'data' field
            })
            .catch(error => console.error('Error fetching orders:', error));
            }
    },[order_id])

    useEffect(()=>{
        if(order_id!==null){
            axios.get(`http://localhost:8000/api/order/${order_id}/receiver`)
            .then(response => {
                setreceiver(...response.data.data); // assume response data has a 'data' field
            })
            .catch(error => console.error('Error fetching orders:', error));
            }
    },[order_id])

    useEffect(()=>{
        if(order_id!==null){
            axios.get(`http://localhost:8000/api/orders/${order_id}`)
            .then(response => {
                setorder(response.data.data); // assume response data has a 'data' field
            })
            .catch(error => console.error('Error fetching orders:', error));
            }
    },[order_id])

    const DeleteOrderDetail = (order_detail_id)=>{
        axios.get(`http://localhost:8000/api/orderDetails/${order_detail_id}`)
        .then(response => {
        })
        .catch(error => console.error('có lỗi trong việc xóa orderDetail:', error));
    }

    return ( 
        <div className='mt-4 mb-4'>
            <div className='row pb-4 mb-4' style={{borderBottom:'1px dashed'}}>
                <div className='col-md-10'></div>
                <div className='col-md-2'>
                    <button style={{height:'40px', width:'150px', border:'none',backgroundColor:'rgb(254, 223, 249)' }}>Hủy đơn hàng</button>
                </div>
            </div>
            <h6>Địa Chỉ Nhận Hàng</h6>
            {receiver!==null? 
            <>
            <p>Họ và tên: {receiver.receiver_name}</p>
            <p>Số điện thoại: {receiver.receiver_phone}</p>
            <p>Địa chỉ: {receiver.receiver_commune}-{receiver.receiver_district}-{receiver.receiver_city}</p>
            </>
            :
            ''
            }
            
           <div className='border-bottom mt-4' style={{height:'350px',boxShadow:'0 -4px 10px 4px rgba(0, 0, 0, 0.1)'}}>
                <div className='border-bottom row m-0 '>
                    <div className='col-md-10'></div>
                    <div className='col-md-2'>Mã đơn hàng: {order!==null?order.order_id:0}</div>
                </div>
                {orderDetails!==null?
                orderDetails.map(orderDetail=>(
                <div className='row m-0 border-bottom p-3 align-items-center' >
                    <div className='col-md-1 col-4'>
                        <img src={orderDetail.product.product_img} style={{width:'80px'}}/>
                    </div>
                    <div className='col-md-5 col-4'>
                        <p>Tên sản phẩm: {orderDetail.product.product_name}</p>
                        <p>Số lượng: {orderDetail.orderDetail_quantity}</p>
                    </div>
                    <div className='col-md-4 col-4'>
                        <p>Đơn giá:{orderDetail.product.product_price}</p>
                        <p>Tổng cộng:{orderDetail.orderDetail_total}</p>
                    </div>
                    <div className='col-md-2 col-2'>
                        <button onClick={()=>DeleteOrderDetail(orderDetail.orderDetail_id)}>Hủy sản phẩm</button>
                    </div>
                </div>
                ))
                :
                ''
                }
            </div>
                {order!==null?
                <>
                <div className='row'></div>
                <div className='row pt-2 pt-md-3 container'>
                    <div className='col-md-8'></div>
                    <div className='col-md-2 col-5'>Tổng tiền</div>
                    <div className='col-md-2 col-7' style={{fontWeight:'500',color:'red'}}>{order.order_totalmoney}</div>
                </div>
                <div className='row pt-2 pt-md-3 container'>
                    <div className='col-md-8'></div>
                    <div className='col-md-2 col-5'>Phí vận chuyển</div>
                    <div className='col-md-2 col-7' style={{fontWeight:'500'}}>100</div>
                </div>
                <div className='row pt-2 pt-md-3 container'>
                    <div className='col-md-8'></div>
                    <div className='col-md-2 col-5'>Tổng tiền voucher áp dụng</div>
                    <div className='col-md-2 col-7' style={{fontWeight:'500',color:'red',fontSize:'20px'}}>100</div>
                </div>
                <div className='row pt-2 pt-md-3 container'>
                    <div className='col-md-8'></div>
                    <div className='col-md-2 col-5'>Thành tiền</div>
                    <div className='col-md-2 col-7' style={{fontWeight:'500',color:'red',fontSize:'20px'}}>100</div>
                </div>
                <div className='row pt-2 pt-md-3 container'>
                    <div className='col-md-8'></div>
                    <div className='col-md-2 col-5'>Phương thức thanh toán</div>
                    <div className='col-md-2 col-7' style={{fontWeight:'500'}}>Thanh toán khi nhận hàng</div>
                </div>
                </>
                :
                ''
                }
                
        </div>
    );
}
export default Order_detail;