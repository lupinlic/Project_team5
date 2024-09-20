import './style.css'
import React, { useState } from 'react';
import SupplierForm from './SupplierForm';

function Supplier() {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleAddClick = () => {
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
  };
    return ( 
        <div style={{backgroundColor:'#fff',minHeight:'100vh',paddingLeft:'4px'}}>
            <div className="container supplier pt-3">
                <button type="button" class="btn btn-success " onClick={handleAddClick}>Thêm</button>
                {isFormVisible && (
                    <>
                    <div className="overlay"></div> {/* Lớp overlay */}
                    <SupplierForm onClose={handleCloseForm} /> {/* Form */}
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
                        <tr >
                            <td>Lâm</td>
                            <td>Thái Bình</td>
                            <td>huatunglam@gmail.com</td>
                            <td>0328443736</td>
                            <td>
                            <button 
                                className="btn btn-warning btn-sm mr-2" 
                                // onClick={() => onEdit(index)}
                            >
                                Sửa
                            </button>
                            <button 
                                className="btn btn-danger btn-sm" 
                                // onClick={() => onDelete(index)}
                            >
                                Xóa
                            </button>
                            </td>
                        </tr>
                        <tr >
                            <td>Lâm</td>
                            <td>Thái Bình</td>
                            <td>huatunglam@gmail.com</td>
                            <td>0328443736</td>
                            <td>
                            <button 
                                className="btn btn-warning btn-sm mr-2" 
                                onClick={handleAddClick}
                                
                            >
                                Sửa
                            </button>
                            <button 
                                className="btn btn-danger btn-sm" 
                                // onClick={() => onDelete(index)}
                            >
                                Xóa
                            </button>
                            </td>
                        </tr>
                        {/* ))} */}
                    </tbody>
                </table>
            </div>
        </div>
     );
}

export default Supplier;