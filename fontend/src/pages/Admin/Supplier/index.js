
import React, { useState ,useEffect } from 'react';
import SupplierForm from './SupplierForm';
import axios from 'axios';
import { apiUrl } from '../../../config';


function Supplier() {

    const [selectedSupplierId, setSelectedSupplierId] = useState(null);

    // gọi api
    const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`${apiUrl}/api/suppliers`)
            .then(response => {
                // Truy cập vào phần "data" của API trả về và đặt vào state
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);


    // Cập nhật danh sách nhà cung cấp sau khi thêm hoặc sửa
    const updateSuppliers = () => {
        axios.get(`${apiUrl}/api/suppliers`)
        .then(response => {
            setData(response.data.data);
        })
        .catch(error => {
            console.error('Có lỗi khi cập nhật danh sách nhà cung cấp!');
        });
    };

    const [isFormVisible, setIsFormVisible] = useState(false);

    const openForm = (supplierId = null) => {
        setSelectedSupplierId(supplierId);
        setIsFormVisible(true);
      };
    
      // Đóng form
      const closeForm = () => {
        setIsFormVisible(false);
      };
    //   xóa
    const deleteSupplier = (supplierId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa nhà cung cấp này không?')) {
          axios.delete(`${apiUrl}/api/suppliers/${supplierId}`)
            .then(response => {
                updateSuppliers(); // Cập nhật lại danh sách sau khi xóa
            })
        }
      };
    return ( 
        <div style={{backgroundColor:'#fff',minHeight:'100vh',paddingLeft:'4px'}}>
            <div className="container supplier pt-3">
                <button type="button" class="btn btn-success " onClick={() => openForm()}>Thêm</button>
                {isFormVisible && (
                    <>
                    <div className="overlay"></div> {/* Lớp overlay */}
                    {isFormVisible && (
                    <SupplierForm 
                    supplierId={selectedSupplierId} 
                    onUpdate={updateSuppliers} 
                    onClose={closeForm} 
                    />
      )}
                    </>
                )}
            </div>

            <div className='container pt-4'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th>Tên nhà cung cấp</th>
                        <th>Địa chỉ</th>
                        <th>Email</th>
                        <th>SĐT</th>
                        <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {suppliers.map((supplier, index) => (key={index} */}
                        {data.map(item => (
                        <tr key={item.id}>
                            <td >{item.supplier_name}</td>
                            
                            <td>{item.supplier_address}</td>
                            <td>{item.supplier_email}</td>
                            <td>{item.supplier_phone}</td>
                            <td>
                            <button 
                                className="btn btn-warning btn-sm mr-2" 
                                onClick={() => openForm(item.supplier_id)}
                            >
                                Sửa
                            </button>
                            <button 
                                className="btn btn-danger btn-sm" 
                                onClick={() => deleteSupplier(item.supplier_id)}
                            >
                                Xóa
                            </button>
                            </td>
                        </tr>))}
                        {/* ))} */}
                    </tbody>
                </table>
            </div>
        </div>
     );
}

export default Supplier;