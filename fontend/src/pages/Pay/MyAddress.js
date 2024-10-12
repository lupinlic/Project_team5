import ShippingForm from '../Shipping/ShippingForm';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyAddress = ({onClose,setReceiver}) =>{
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedReceiverId, setSelectedReceiverId] = useState(null);
    const [styleReceiver_type, setstyleReceiver_type] = useState({color: 'red',display:'inline-block'});
    const [ischeck, setIscheck] = useState(false);
    const [receiver, setreceiver] = useState([]);



  const openForm = (receiverId=null) => {
    setSelectedReceiverId(receiverId);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };
// đổ dl
    const [receivers, setData] = useState([]);
    const [userId, setUserId] = useState(null);

    const userData = localStorage.getItem('user');
    useEffect(() => {
        
        const parsedUser = JSON.parse(userData);
        setUserId(parsedUser.user_id);

      }, []);

      useEffect(() => {
          updateReceivers();    
      }, [userId]);

      const updateReceivers = () => {
        axios.get(`http://localhost:8000/api/users/${userId}/receivers`)
        .then(response => {
            setData(response.data.data);
        })
        .catch(error => {
            console.error('Có lỗi khi cập nhật danh sách danh mục!');
        });
        };

        const setDefault = (receiver) => {
            if(userId!==null){
              axios.get(`http://localhost:8000/api/users/${userId}/receivers/${receiver.receiver_id}/status`,)
              .then(response => {
                  // Gọi lại API để cập nhật danh sách địa chỉ sau khi thiết lập mặc định
                  updateReceivers();
              })
              .catch(error => {
                console.error('Lỗi khi thiết lập mặc định:', error);
              });
            }
          };

        //sau khi có tất cả receiver rổi lấy ra th cố định và cho vào mảng riêng
        useEffect(()=>{
            let receiver_type1 = receivers.filter(item => item.receiver_type == 1);
            setreceiver(receiver_type1);
        },[receivers])

        const handleSaveReceiver =(e)=>{
            setReceiver(receiver);
            onClose();
        }

        const SaveReceiver =(item)=>{
            if(receiver.length > 0){
                if(receiver[0].receiver_id !== item.receiver_id){
                    setreceiver([item]);
                }
            }else{
                setreceiver([item]);
            }
        }


    return ( 
        <div>
            <div className="form-popup" style={{padding:'20px'}}>
                <h6 style={{padding:'20px 0',borderBottom:'1px solid #000'}} >Địa chỉ của tôi</h6>
                <div style={{overflowY: 'auto',overflowX: 'hidden',marginTop:'8px',height:'350px'}}>
                    {receivers.map(item => (
                    <div className='row' style={{padding:'12px 0',borderBottom:'1px solid #000'}}>
                        <div className='col-md-1'>
                            <input type='radio' name='select_receiver' 
                            onClick={(e)=>SaveReceiver(item)}
                            checked={receiver.some(receiver => receiver.receiver_id==item.receiver_id)}
                            ></input>
                        </div>
                        <div className='col-md-8'>
                            <p>
                                <span className="name">{item.receiver_name} | </span>
                                <span className="sđt"> {item.receiver_phone}</span>
                                </p>
                            <p>{item.receiver_dsc}</p>
                            <p>{item.receiver_commune}, {item.receiver_district}, {item.receiver_city}</p>
                            <p className="macd " style={item.receiver_type == 1 ? styleReceiver_type :{display:'none'} }
                            >Mặc định</p>
                        </div>
                        <div className='col-md-3'>
                            <button style={{border:'none'}} onClick={() => openForm(item.receiver_id)}>Cập nhật</button>
                            {isFormVisible && (
                            <>
                                <div className="overlay"></div>
                                <ShippingForm 
                                receiverId={selectedReceiverId} 
                                onUpdate={updateReceivers} 
                                onClose={closeForm} 
                                setDefault={setDefault}
                                />
                            </>
                            )}
                        </div>
                        

                    </div> ))}
                </div>
                <button style={{width:'200px', height:'50px',margin:'20px 0 50px 0'}} onClick={() => openForm()}> + Thêm địa chỉ mới</button>
                {isFormVisible && (
                    <>
                    <ShippingForm 
                        receiverId={selectedReceiverId} 
                        onUpdate={updateReceivers} 
                        onClose={closeForm} 
                        setDefault={setDefault}
                        />
                    </>
                )}
                <div style={{position:'absolute',bottom:'4%',right:'4%'}}>
                    <button type="button" className="btn btn-primary" onClick={(e)=>handleSaveReceiver()}>Lưu</button>
                    <button type="button" className="btn btn-secondary"  onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>

     );
}

export default MyAddress;