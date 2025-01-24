import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config';


const VoucherFormAd =({GetAllVoucherByGroup,sendvoucherGroup_id,onClose}) =>{
    const [voucherGroup_id,setvoucherGroup_id] = useState(null);
    const [voucher_type,setvoucher_type] = useState(0);
    const [voucher_discount,setvoucher_discount] = useState(null);
    const [voucher_minOrder,setvoucher_minOrder] = useState(null);
    const [voucher_maxDiscount,setvoucher_maxDiscount] = useState(null);
    const [voucher_code,setvoucher_code] = useState(null);
    const [voucher_quantity,setvoucher_quantity] = useState(1);
    const [voucher_dsc,setvoucher_dsc] = useState(null);
    const [start_date,setstart_date] = useState(null);
    const [end_date,setend_date] = useState(null);

    useEffect(()=>{
        setvoucherGroup_id(sendvoucherGroup_id);
    })

    const HandleSaveVoucher = (e) => {
        e.preventDefault();
        let voucher = {
            voucherGroup_id :voucherGroup_id,
            voucher_type :voucher_type,
            voucher_discount :voucher_discount,
            voucher_minOrder :voucher_minOrder,
            voucher_maxDiscount :voucher_maxDiscount,
            voucher_code :voucher_code,
            voucher_quantity :voucher_quantity,
            voucher_dsc :voucher_dsc,
            start_date :start_date,
            end_date :end_date,
        }
        axios.post(`${apiUrl}/api/vouchers`,voucher)
        .then(response =>{
            AddVoucherToUsers(response.data.data.voucher_id);
            GetAllVoucherByGroup();
            onClose();
        } )
        .catch(error => console.error('Có lỗi trong việc tạo voucher:', error));
    }

    const AddVoucherToUsers = (voucher_id) =>{
        axios.get(`${apiUrl}/api/voucher/${voucher_id}/addvoucherToUsers`)
        .then(response =>{})
        .catch(error => console.error('Có lỗi trong việc add voucher cho các users:', error));
    }

    return ( 
        <div className="form-popup">
            <form onSubmit={(e)=>HandleSaveVoucher(e)} className="form-container"> 
            <h4>Thông tin voucher</h4>
            <div className='row align-items-center'>
                <div className='col-md-4'>
                    <label className="name"><b>Mã voucher</b></label>
                </div>
                <div className='col-md-8'>
                    <input
                    type="text"
                    placeholder="Nhập mã voucher"
                    value={voucher_code}
                    onChange={(e)=> setvoucher_code(e.target.value)}
                    required
                    />
                </div>
            </div>
            <div className='row align-items-center'>
                <div className='col-md-4'>
                    <label className="name"><b>Số lượng voucher</b></label>
                </div>
                <div className='col-md-8'>
                    <input
                    type="number"
                    placeholder="Nhập số lượng voucher"
                    name=""
                    value={voucher_quantity}
                    min={1}
                    onChange={(e)=>setvoucher_quantity(parseInt(e.target.value))}
                    required
                    />
                </div>
            </div>
            <div className='row align-items-center'>
                <div className='col-md-4'>
                    <label className="name"><b>Áp dụng tiền theo hình thức</b></label>
                </div>
                <div className='col-md-8'>
                    <select 
                        value={voucher_type}
                        onChange={(e)=>setvoucher_type(parseInt(e.target.value))}
                    >
                        <option value={1}>Theo %</option>
                        <option value={0}>Theo số tiền</option>
                    </select>
                </div>
            </div>

            <div className='row align-items-center'>
                <div className='col-md-4'>
                    <label className="name"><b>{voucher_type?'giảm bao nhiêu %':'Giảm bao nhiêu tiền'}</b></label>
                </div>
                
                <div className='col-md-7'>
                    <input
                    type="number"
                    placeholder="Nhập giá trị theo kiểu muốn giảm"
                    name=""
                    value={voucher_discount}
                    onChange={(e)=>setvoucher_discount(parseInt(e.target.value))}
                    required
                    />
                </div>
                <div className='col-md-1'>
                    <label className="name"><b>{voucher_type?' %':' VNĐ'}</b></label>
                </div>
            </div>

            <div className='row align-items-center'>
                <div className='col-md-4'>
                    <label className="name"><b>Đơn hàng tối thiểu</b></label>
                </div>
                <div className='col-md-7'>
                    <input
                    type="number"
                    placeholder="Nhập đơn hàng tối thiểu"
                    name=""
                    value={voucher_minOrder}
                    onChange={(e)=>setvoucher_minOrder(parseInt(e.target.value))}
                    required
                    />
                </div>
                <div className='col-md-1'>
                    <label className="name"><b>VNĐ</b></label>
                </div>
            </div>

            <div className='row align-items-center'>
                <div className='col-md-4'>
                    <label className="name"><b>Áp dụng tối đa bao nhiêu tiền</b></label>
                </div>
                <div className='col-md-7'>
                    <input
                    type="number"
                    placeholder="Nhập số tiền áp dụng tối đa"
                    name=""
                    value={voucher_maxDiscount}
                    onChange={(e)=>setvoucher_maxDiscount(parseInt(e.target.value))}
                    required
                    />
                </div>
                <div className='col-md-1'>
                    <label className="name"><b>VNĐ</b></label>
                </div>
            </div>

            <div className='row align-items-center'>
                <div className='col-md-4'>
                    <label className="name"><b>Mô tả</b></label>
                </div>
                <div className='col-md-8'>
                    <input
                    type="text"
                    placeholder="Nhập mô tả cho voucher"
                    name=""
                    value={voucher_dsc}
                    onChange={(e)=>setvoucher_dsc(e.target.value)}
                    required
                    />
                </div>
            </div>

            <div className='row align-items-center'>
                <div className='col-md-4'>
                    <label className="name"><b>Ngày bắt đầu</b></label>
                </div>
                <div className='col-md-8'>
                    <input
                    type="date"
                    name=""
                    value={start_date}
                    onChange={(e)=>setstart_date(e.target.value)}
                    required
                    />
                </div>
            </div>

            <div className='row align-items-center'>
                <div className='col-md-4'>
                    <label className="name"><b>Ngày kết thúc</b></label>
                </div>
                <div className='col-md-8'>
                    <input
                    type="date"
                    name=""
                    value={end_date}
                    onChange={(e)=>setend_date(e.target.value)}
                    required
                    />
                </div>
            </div>
            
           

                <button type="submit" className="btn btn-primary">Lưu</button>
                <button type="button" className="btn btn-secondary"  onClick={onClose}>Đóng</button>
            </form>
        </div>
  );
}

export default VoucherFormAd;