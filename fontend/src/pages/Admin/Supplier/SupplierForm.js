// SupplierForm.js
import React, { useState } from 'react';

const SupplierForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email:'',
    contact: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Thông tin nhà cung cấp:', formData);
    onClose(); // Đóng form sau khi gửi
  };

  return (
    <div className="form-popup">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Thông tin nhà cung cấp</h2>
        <label htmlFor="name"><b>Tên nhà cung cấp</b></label>
        <input
          type="text"
          placeholder="Nhập tên"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="address"><b>Địa chỉ</b></label>
        <input
          type="text"
          placeholder="Nhập địa chỉ"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="address"><b>Email</b></label>
        <input
          type="text"
          placeholder="Nhập địa chỉ"
          name="address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="contact"><b>Liên hệ</b></label>
        <input
          type="text"
          placeholder="Nhập liên hệ"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary">Lưu</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
      </form>
    </div>
  );
};

export default SupplierForm;
