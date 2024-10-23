// SupplierForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config';


const CategoryForm = ({ categoryId, onUpdate, onClose }) => {
  const [category, setCategory] = useState({
    category_name: ''
  });

  useEffect(() => {
    if (categoryId) {
      axios.get(`${apiUrl}/api/categorys/${categoryId}`)
        .then(response => {
          setCategory(response.data.data);
        })
    }else {
      // Reset form khi không có supplierId (thêm mới)
      setCategory({
        category_name: ''
      });
    }
  }, [categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


  if (categoryId) {
    // Gọi API sửa nhà cung cấp
    axios.put(`${apiUrl}/api/categorys/${categoryId}`, category)
      .then(response => {
        
        onUpdate(); 
        onClose(); // Cập nhật danh sách sau khi sửa
      })
      
  } else {
    // Gọi API thêm nhà cung cấp mới
    axios.post(`${apiUrl}/api/categorys`, category)
      .then(response => {
       
        setCategory({
          category_name: ''
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
          name="category_name"
          value={category.category_name}
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

export default CategoryForm;
