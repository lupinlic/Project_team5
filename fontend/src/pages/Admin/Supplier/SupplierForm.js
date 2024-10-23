// SupplierForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config';


const SupplierForm = ({ supplierId, onUpdate, onClose }) => {
  const [supplier, setSupplier] = useState({
    supplier_name: '',
    supplier_address: '',
    supplier_email:'',
    supplier_phone: ''
  });

  useEffect(() => {
    if (supplierId) {
      axios.get(`${apiUrl}/api/suppliers/${supplierId}`)
        .then(response => {
          setSupplier(response.data.data);
        })
    }else {
      // Reset form khi không có supplierId (thêm mới)
      setSupplier({
        supplier_name: '',
        supplier_address: '',
        supplier_email:'',
        supplier_phone: ''
      });
    }
  }, [supplierId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({
      ...supplier,
      [name]: value
    });
  };
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();


  if (supplierId) {
    // Gọi API sửa nhà cung cấp
    axios.put(`${apiUrl}/api/suppliers/${supplierId}`, supplier)
      .then(response => {
        
        onUpdate(); 
        onClose(); // Cập nhật danh sách sau khi sửa
      })
      
  } else {
    // Gọi API thêm nhà cung cấp mới
    axios.post(`${apiUrl}/api/suppliers`, supplier)
      .then(response => {
       
        setSupplier({
          supplier_name: '',
          supplier_address: '',
          supplier_email:'',
          supplier_phone: ''
        });
        onUpdate(); 
        onClose(); // Cập nhật danh sách sau khi thêm
      })
      
  }

};

  return (
    <div className="form-popup">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Thông tin nhà cung cấp</h2>
        <label className="name"><b>Tên nhà cung cấp</b></label>
        <input
          type="text"
          placeholder="Nhập tên"
          name="supplier_name"
          value={supplier.supplier_name}
          onChange={handleChange}
          required
        />

        <label className="address"><b>Địa chỉ</b></label>
        <input
          type="text"
          placeholder="Nhập địa chỉ"
          name="supplier_address"
          value={supplier.supplier_address}
          onChange={handleChange}
          required
        />

        <label className="address"><b>Email</b></label>
        <input
          type="text"
          placeholder="Nhập địa chỉ"
          name="supplier_email"
          value={supplier.supplier_email}
          onChange={handleChange}
          required
        />

        <label className="contact"><b>Liên hệ</b></label>
        <input
          type="text"
          placeholder="Nhập liên hệ"
          name="supplier_phone"
          value={supplier.supplier_phone}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary">Lưu</button>
        <button type="button" className="btn btn-secondary"  onClick={onClose}>Đóng</button>
        {/* onClick={onClose} */}
      </form>
    </div>
  );
};

export default SupplierForm;
