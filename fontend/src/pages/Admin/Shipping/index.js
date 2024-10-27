import './style.css'
import React, { useState,useEffect } from 'react';
import AddShippingForm from './AddShipping';
import UpdateShippingForm from './UpdateShipping';
import axios from 'axios';
import { apiUrl } from '../../../config';


function Shipping() {
    const [selectedShippingId, setSelectedShippingId] = useState(null);
    // gọi api đổ 
    const [shippings, setshippings] = useState([]);

    useEffect(() => {
        GetDataShippings();
    }, []);

    //Cập nhật danh sách sản phẩm sau khi thêm hoặc sửa
    const GetDataShippings = () => {
        axios.get(`${apiUrl}/api/shippings`)
        .then(response => {
            setshippings(response.data.data);
        })
        .catch(error => {
            console.error('Có lỗi khi cập nhật danh sách nhà cung cấp!');
        });
    };

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormUpdate, setIsFormUpdate] = useState(false);

    const openForm = () => {
        setIsFormVisible(true);
      };
    
      // Đóng form
      const closeForm = () => {
        setIsFormVisible(false);
      };

      const openFormUpdate = (shipping_id) => {
        setSelectedShippingId(shipping_id);
      };
    
      // Đóng form
      const closeFormUpdate = (shipping_id) => {
        setSelectedShippingId();
      };
    //   xóa
    const deleteShipping = (shipping_id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa địa chỉ vận chuyển này không?')) {
          axios.delete(`${apiUrl}/api/shippings/${shipping_id}`)
            .then(response => {
                GetDataShippings(); // Cập nhật lại danh sách sau khi xóa
            })
            .catch(error => {
                console.error('Có lỗi khi xóa địa chỉ vận chuyển này!');
            });
        }
      };

    return ( 
        <>
        <div style={{backgroundColor:'#fff',minHeight:'100vh',paddingLeft:'4px'}}>
            <div className="container supplier pt-3">
                <button type="button" class="btn btn-success " onClick={() => openForm()}>Thêm</button>
                {isFormVisible && (
                    <>
                    <div className="overlay"></div> {/* Lớp overlay */}
                    <AddShippingForm 
                    onUpdate={GetDataShippings} 
                    onClose={closeForm} 
                    />
                    </>
                )}
            </div>

            <div className='container pt-4'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th>Id địa chỉ vận chuyển</th>
                        <th>Tên thành phố</th>
                        <th>Tên quận/huyện</th>
                        <th>Tên xã/phường</th>
                        <th>Tên đơn vị vận chuyển</th>
                        <th>Giá của vận chuyển</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {suppliers.map((supplier, index) => (key={index} */}

                        {shippings?.map(item =>(

                        <tr key={item.id} >
                            <td>{item.shipping_id}</td>
                            <td>{item.shipping_cityName}</td>
                            <td>{item.shipping_districtName}</td>
                            <td>{item.shipping_communeName}</td>
                            
                            <td>{item.shipping_name}</td>
                            <td>{item.shipping_price}</td>
                            <td>
                            <button 
                                className="btn btn-warning btn-sm mr-2" 
                                onClick={() => openFormUpdate(item.shipping_id)}
                            >Sửa
                            </button>
                                
                                {selectedShippingId==item.shipping_id && (
                                    <>
                                    <div className="overlay"></div> {/* Lớp overlay */}
                                    <UpdateShippingForm
                                    shipping_send={item}
                                    onUpdate={GetDataShippings} 
                                    onClose={closeFormUpdate} 
                                    />
                                    </>
                                )}
                            <button 
                                className="btn btn-danger btn-sm" 
                                onClick={() => deleteShipping(item.shipping_id)}
                            >
                                Xóa
                            </button>
                            </td>
                        </tr>
                        ))}
                        
                        {/* ))} */}
                    </tbody>
                </table>
            </div>

        </div>
        </>
        
     );
}

export default Shipping;