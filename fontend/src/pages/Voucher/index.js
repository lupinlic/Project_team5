import './style.css'
import {Link  } from 'react-router-dom';

// import Order_detail from "./Order_detail";
import React, { useState,useEffect } from 'react';
import axios from 'axios';

function VoucherList() {

    const [Vouchers, setVouchers] = useState(null);
    const [user_id, setuser_id] = useState(null);
    const [voucher_status, setvoucher_status] = useState(0);


    useEffect(() => {
          const userData = localStorage.getItem('user');
          const parsedUser = JSON.parse(userData);
          setuser_id(parsedUser.user_id);

        }, []);

    useEffect(()=>{
        if(user_id!==null && user_id!==undefined){
            GetVouchers();
        }
    },[user_id])

    useEffect(()=>{
        if(voucher_status!==null && voucher_status!==undefined){
            GetVouchers();
        }
    },[voucher_status])

    const GetVouchers =()=>{
        axios.get(`http://localhost:8000/api/users/${user_id}/vouchers/${voucher_status}`)
        .then(response => {
            setVouchers(response.data.data); // assume response data has a 'data' field
        })
        .catch(error => console.error('Error fetching orders:', error));
    }

    return ( 
        <>
        <div className="row pt-3">
            <div className="col-md-12" style={{width:'100%'}}>
                <select 
                name="voucherSelect" 
                style={{width:'180px'}}
                className="form-select" 
                onChange={(e)=>setvoucher_status(parseInt(e.target.value))} id="exampleSelect" aria-label="Default select example">
                    <option value='0'>Chưa sử dụng</option>
                    <option value='1'>Đã sử dụng</option>
                    <option value='2'>Đã hết hạn sử dụng</option>
                </select>
            </div>

           </div>

           {Vouchers && Vouchers.length > 0 ? 
                    (

                        Vouchers.map(item => (
                            <div className='row' 
                            style={{ border: '1px solid', alignItems: 'center', marginBottom: '12px',cursor:'pointer' ,height:'130px',marginTop:'30px'}} 
                            key={item?.voucher_id}
                            >
                                <div className='col-md-4'>
                                    <img style={{ width: '25%', height: '25%' }} src={`http://localhost:8000/uploads/VoucherGroup/${item.voucherGroup_img}`} alt={`Voucher ${item.voucher_id}`} />
                                </div>
                                <div className='col-md-7'>
                                    <p>Giảm {item.voucher_discount} VNĐ</p>
                                    <p>Đơn tối thiểu 0Đ</p>
                                    <p>Giảm tối đa: {item.voucher_maxDiscount}</p>
                                </div>
                                <div className='col-md-1'>
                                    {/* <input 
                                        type='radio' name='selectVoucher'
                                        checked={Vouchers.some(voucher => voucher?.voucher_id==item?.voucher_id)}
                                        
                                    /> */}
                                </div>
                            </div>
                        ))
                    ) 
                    : (
                        <p>Không có voucher nào để hiển thị.</p> // Thông báo nếu không có vouchers
                    )}
           </>
     );
}

export default VoucherList;