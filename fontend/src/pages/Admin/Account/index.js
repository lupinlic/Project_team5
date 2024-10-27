import './style.css'
import React, { useState ,useEffect } from 'react';
import AccountForm from './AccountForm';
import axios from 'axios';
import { apiUrl } from '../../../config';


function Account() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [isFormVisible, setIsFormVisible] = useState(false);
    const openForm = (userId = null) => {
        setSelectedUserId(userId);
        setIsFormVisible(true);
      };
    
      // Đóng form
      const closeForm = () => {
        setIsFormVisible(false);
      };

//   đổ
    const [selectedUserId, setSelectedUserId] = useState(null);
    // gọi api
    const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`${apiUrl}/api/users`)
            .then(response => {
                // Truy cập vào phần "data" của API trả về và đặt vào state
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);
    
    // Cập nhật danh sách nhà cung cấp sau khi thêm hoặc sửa
    const updateUsers = () => {
        axios.get( `${apiUrl}/api/users`)
        .then(response => {
            setData(response.data.data);
        })
        .catch(error => {
            console.error('Có lỗi khi cập nhật danh sách danh mục!');
        });
    };
    const deleteUser = (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa nhà cung cấp này không?')) {
          axios.delete(`${apiUrl}/api/users/${userId}`)
            .then(response => {
                updateUsers(); // Cập nhật lại danh sách sau khi xóa
            })
        }
      };
    return ( 
        <div>
            <div style={{backgroundColor:'#fff',minHeight:'100vh',paddingLeft:'4px'}}>
            <div className="container supplier pt-3">
                <button type="button" class="btn btn-success "onClick={() => openForm()}>Thêm</button>
                {isFormVisible && (
                    <>
                    <div className="overlay"></div> {/* Lớp overlay */}
                    <AccountForm 
                    userId={selectedUserId} 
                    onUpdate={updateUsers} 
                    onClose={closeForm}  /> {/* Form */}
                    </>
                )}
            </div>

            <div className='container pt-4'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>SĐT</th>
                        <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {suppliers.map((supplier, index) => (key={index} */}
                        {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.user_name}</td>
                            <td>{item.user_password}</td>
                            <td>{item.user_email}</td>
                            <td>{item.user_role}</td>
                            <td>
                            <button 
                                className="btn btn-warning btn-sm mr-2" 
                                onClick={() => openForm(item.user_id)}
                            >
                                Sửa
                            </button>
                            <button 
                                className="btn btn-danger btn-sm" 
                                onClick={() => deleteUser(item.user_id)}
                            >
                                Xóa
                            </button>
                            </td>
                        </tr>))}
                        
                    </tbody>
                </table>
            </div>
        </div>
        </div>
     );
}

export default Account;