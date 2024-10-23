import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Trong một component
import { apiUrl } from '../../../config';

const AccountForm = ({ userId, onUpdate, onClose }) => {
    const [user, setUser] = useState({
        user_name: '',
        user_password:'',
        user_email:''
      });

      useEffect(() => {
        if (userId) {
          axios.get(`${apiUrl}/api/users/${userId}`)
            .then(response => {
              setUser(response.data.data);
            })
        }else {
          // Reset form khi không có supplierId (thêm mới)
          setUser({
            user_name: '',
            user_password:'',
            user_email:''
          });
        }
      }, [userId]);
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
    
    
      if (userId) {
        // Gọi API sửa nhà cung cấp
        axios.put(`${apiUrl}/api/users/${userId}`, user)
          .then(response => {
            
            onUpdate(); 
            onClose(); // Cập nhật danh sách sau khi sửa
          })
          
      } else {
        // Gọi API thêm nhà cung cấp mới
        axios.post(`${apiUrl}/api/users`, user)
          .then(response => {
           
            setUser({
                user_name: '',
                user_password:'',
                user_email:''
              });
            onUpdate(); 
            onClose(); // Cập nhật danh sách sau khi thêm
          })
          
      }
    
    };

    return ( 
        <div>
             <div className="form-popup">
             <form onSubmit={handleSubmit} className="form-container">
                <h4>Thông tin tài khoản</h4>

                <label className="name"><p>Username</p></label>
                <input
                type="text"
                placeholder="Nhập tên"
                name="user_name"
                value={user.user_name}
                onChange={handleChange}
                required
                />

                <label className="name"><p>Password</p></label>
                <input
                type="text"
                placeholder="Nhập tên"
                name="user_password"
                value={user.user_password}
                onChange={handleChange}
                />

                <label className="name"><p>Email</p></label>
                <input
                type="text"
                placeholder="Nhập tên"
                name="user_email"
                value={user.user_email}
                onChange={handleChange}
                required
                />

                <div>
                    <button type="submit" className="btn btn-primary">Lưu</button>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
                </div>
             </form>
             </div>
        </div>
     );
}

export default AccountForm;