import './style.css'
import {Link  } from 'react-router-dom';

// import Order_detail from "./Order_detail";
import React, { useState,useEffect } from 'react';
import axios from 'axios';
function Order() {
    
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [Orders, setOrders] = useState(null);
    const [user_id, setuser_id] = useState(null);


    useEffect(() => {
          const userData = localStorage.getItem('user');
          const parsedUser = JSON.parse(userData);
          setuser_id(parsedUser.user_id);

        }, []);

    const openForm = () => {
        setIsFormVisible(true);
      };
    
      // Đóng form
      const closeForm = () => {
        setIsFormVisible(false);
      };

    useEffect(()=>{
        if(user_id!==null && user_id!==undefined){
            GetOrders();
        }
    },[user_id])

    const GetOrders =()=>{
        axios.get(`http://localhost:8000/api/user/${user_id}/orders`)
        .then(response => {
            setOrders(response.data.data); // assume response data has a 'data' field
            console.log(response.data)
        })
        .catch(error => console.error('Error fetching orders:', error));
    }


    const OrderConfirmation= (order)=>{
        axios.get(`http://localhost:8000/api/order/${order.order_id}/status`)
            .then(response => {
            })
            .catch(error => console.error('có lỗi trong việc xác nhận đơn hàng:', error));
    }

    const OrderDelete= (order)=>{
        axios.delete(`http://localhost:8000/api/orders/${order.order_id}`)
            .then(response => {
                GetOrders()
                 // assume response data has a 'data' field
            })
            .catch(error => console.error('có lỗi trong việc xóa đơn hàng:', error));
    }


    return (  
        <div className="mt-3">
            <h6>Đơn hàng của bạn</h6>
            <div className='' style={{height:'30px', backgroundColor:'rgb(254, 223, 249)'}}>
                <h6 style={{color:'red', padding:'4px 0 0 8px',marginTop:'12px'}}>CHỜ THANH TOÁN</h6>
            </div>
            
            {Orders!==null && Orders?.length>0 ? 
            Orders.map(order=>(
            <>
                <Link  to={{
                    pathname: `/Order_details/${order.order_id}`,
                    state: { order_id: order.order_id }
                }} 
                style={{textDecoration:'none'}}
                >
            <div className='border-bottom mt-4' style={{height:'150px',boxShadow:'0 -4px 10px 4px rgba(0, 0, 0, 0.1)'}}>
                <div className='row m-0 border-bottom p-3 align-items-center' >
                    <div className='col-md-1 col-12' style={{width:'100%'}}>
                        <p>Mã đơn hàng :{order.order_id}</p>
                    </div>
                </div>
                <div  className='row container'>
                    <div className='col-md-10'></div>
                    <div className='col-md-2 pt-2'>
                        <p>
                            <span style={{color:'black'}}>Số tiền phải trả : </span>
                            <span style={{color:'red'}}>{order.order_totalmoney}</span>
                        </p>
                    </div>
                </div>
            </div>
            </Link>
            </>
            ))
            :
            <div className="order_none">
                <img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/orderlist/5fafbb923393b712b964.png'/>
                <p>Chưa có đơn hàng </p>
            </div>
            }
        </div>
    );
}

export default Order;