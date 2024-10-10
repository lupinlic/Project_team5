import React, { useState, useEffect } from 'react';
import axios from 'axios';


const VoucherFormAd =({onClose}) =>{
    return ( 
        <div className="form-popup">
            <form className="form-container"> 
            <h4>Thông tin voucher</h4>
            <div className='row align-items-center'>
                <div className='col-md-4'>
                    <label className="name"><b>Mã voucher</b></label>
                </div>
                <div className='col-md-8'>
                    <input
                    type="text"
                    placeholder="Nhập tên"
                    name=""
                    value=''
                    onChange=''
                    required
                    />
                </div>
            </div>
            <div className='row align-items-center'>
                <div className='col-md-4'>
                    <label className="name"><b>Mã voucher</b></label>
                </div>
                <div className='col-md-8'>
                    <input
                    type="text"
                    placeholder="Nhập tên"
                    name=""
                    value=''
                    onChange=''
                    required
                    />
                </div>
            </div>
            <div className='row align-items-center'>
                <div className='col-md-4'>
                    <label className="name"><b>Mã voucher</b></label>
                </div>
                <div className='col-md-8'>
                    <input
                    type="text"
                    placeholder="Nhập tên"
                    name=""
                    value=''
                    onChange=''
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