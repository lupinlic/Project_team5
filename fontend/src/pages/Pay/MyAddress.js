import ShippingForm from '../Shipping/ShippingForm';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyAddress = ({onClose}) =>{
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedReceiverId, setSelectedReceiverId] = useState(null);
  const openForm = (receiverId=null) => {
    setSelectedReceiverId(receiverId);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };
// đổ dl
    const [receiver, setData] = useState([]);
    const [userId, setUserId] = useState(null);

    const userData = localStorage.getItem('user');
    useEffect(() => {
        
        const parsedUser = JSON.parse(userData);
        setUserId(parsedUser.user_id);

      }, []);
      useEffect(() => {
          console.log(userId)
         
            axios.get(`http://localhost:8000/api/users/${userId}/receivers`)
                .then(response => {
                    // Truy cập vào phần "data" của API trả về và đặt vào state
                    setData(response.data.data);
                    console.log(response.data.data)
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                });
              
      }, [userId]);


    return ( 
        <div>
            <div className="form-popup" style={{padding:'20px'}}>
                <h6 style={{padding:'20px 0',borderBottom:'1px solid #000'}} >Địa chỉ của tôi</h6>
                <div style={{overflowY: 'auto',overflowX: 'hidden',marginTop:'8px',height:'350px'}}>
                    {receiver.map(item => (
                    <div className='row' style={{padding:'12px 0',borderBottom:'1px solid #000'}}>
                        <div className='col-md-1'>
                            <input type='checkbox'></input>
                        </div>
                        <div className='col-md-8'>
                            <p>
                                <span className="name">{item.receiver_name} | </span>
                                <span className="sđt"> {item.receiver_phone}</span>
                                </p>
                            <p>{item.receiver_dsc}</p>
                            <p>{item.receiver_commune}, {item.receiver_district}, {item.receiver_city}</p>
                            <p className="macd " style={{color: 'red'}}>Mặc định</p>
                        </div>
                        <div className='col-md-3'>
                            <button style={{border:'none'}} onClick={() => openForm(item.receiver_id)}>Cập nhật</button>
                            {isFormVisible && (
                                <>
                                <ShippingForm onClose={closeForm} />
                                </>
                            )}
                        </div>
                        

                    </div> ))}
                </div>
                <button style={{width:'200px', height:'50px',margin:'20px'}} onClick={openForm}> + Thêm địa chỉ mới</button>
                {isFormVisible && (
                    <>
                    <ShippingForm 
                    receiverId={selectedReceiverId} 
                    onClose={closeForm} />
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