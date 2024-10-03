import ShippingForm from '../Shipping/ShippingForm';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyAddress = ({onClose}) =>{
    const [isFormVisible, setIsFormVisible] = useState(false);

  const openForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };
    return ( 
        <div>
            <div className="form-popup" style={{padding:'20px'}}>
                <h6 style={{padding:'20px 0',borderBottom:'1px solid #000'}} >Địa chỉ của tôi</h6>
                <div className='row' style={{padding:'12px 0',borderBottom:'1px solid #000'}}>
                    <div className='col-md-1'>
                        <input type='checkbox'></input>
                    </div>
                    <div className='col-md-8'>
                        <p>
                            <span className="name">Hứa Tùng Lâm |</span>
                            <span className="sđt">0328443736</span>
                            </p>
                        <p>Số 20, đường tân triều</p>
                        <p>Xã tân triều, huyện Thanh trì</p>
                        <p className="macd " style={{color: 'red'}}>Mặc định</p>
                    </div>
                    <div className='col-md-3'>
                        <button style={{border:'none'}} onClick={openForm}>Cập nhật</button>
                        {isFormVisible && (
                            <>
                            <ShippingForm onClose={closeForm} />
                            </>
                        )}
                    </div>
                    

                </div>
                <button style={{width:'200px', height:'50px',margin:'20px'}} onClick={openForm}> + Thêm địa chỉ mới</button>
                {isFormVisible && (
                    <>
                    <ShippingForm onClose={closeForm} />
                    </>
                )}
                <div style={{position:'absolute',bottom:'4%',right:'4%'}}>
                    <button type="submit" className="btn btn-primary">Lưu</button>
                    <button type="button" className="btn btn-secondary"  onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>

     );
}

export default MyAddress;