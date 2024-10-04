import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ProductForm = ({ productId, onUpdate, onClose  }) => {
  const [product, setProduct] = useState({
    product_name: '',
    category_id: '',
    supplier_id: '',
    product_price: '',
    product_img: '',
    product_quantity: '',
    product_dsc: ''
  });

  const [imageSrc, setImageSrc] = useState('https://png.pngtree.com/png-vector/20190820/ourlarge/pngtree-no-avatar-vector-isolated-on-white-background-png-image_1694546.jpg'); // Ảnh mặc định
  const [categorys, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const getCategoryName = (categoryId) => {
    const category = categorys.find(category => category.category_id === categoryId);
    return category ? category.category_name : 'Không xác định';
  };
  

  // Gọi API để lấy danh sách category và supplier
  useEffect(() => {
    axios.get('http://localhost:8000/api/categorys')
      .then(response => setCategories(response.data.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost:8000/api/suppliers')
      .then(response => setSuppliers(response.data.data))
      .catch(error => console.error('Error fetching suppliers:', error));


      

    if (productId) {
      axios.get(`http://localhost:8000/api/products/${productId}`)
        .then(response => {
          setProduct(response.data.data);
          
        })
        .catch(error => console.error('Error fetching product:', error));
    } else {
      // Reset form khi không có productId (thêm mới)
      setProduct({
        product_name: '',
        category_id: '',
        supplier_id: '',
        product_price: '',
        product_img: '',
        product_quantity: '',
        product_dsc: ''
      });
      setImageSrc('https://png.pngtree.com/png-vector/20190820/ourlarge/pngtree-no-avatar-vector-isolated-on-white-background-png-image_1694546.jpg');
    }
  }, [productId]);

  // lấy link ảnh
  useEffect(() => {
    // Chỉ thực hiện khi cả product và categorys đều đã được tải
    if (product && categorys.length > 0) {
      const categoryName = getCategoryName(product.category_id);
      const imagePath = `/assets/img/${categoryName}/${product.product_img}`;

      setImageSrc(imagePath);
      console.log('Image Path:', imagePath);
    }
  }, [product, categorys]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    if (productId) {
      axios.put(`http://localhost:8000/api/products/${productId}`, product)
        .then(response => {
          onUpdate();
          onClose();
        })
        .catch(error => console.error('Error updating product:', error));
        
    } else {
      axios.post('http://localhost:8000/api/products', product)
        .then(response => {
          onUpdate();
          onClose();
        })
        .catch(error => console.error('Error adding product:', error));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file)); // Hiển thị ảnh tạm thời
      setProduct({
        ...product,
        product_img: file.name // Chỉ lưu tên file
      });
    }
  };
  
return(
    <div className="form-popup " style={{width:'800px'}}>
        <form onSubmit={handleSubmit} className="form-container">
            <h5>Thông tin sản phẩm</h5>
            <div className='container mb-3'>
                <div className='row'>
                    <div className='col-md-8'>
                        <label className="name mt-1 mb-0">Tên sản phẩm</label>
                        <input
                            type="text"
                            placeholder="Nhập tên"
                            name="product_name"
                            value={product.product_name}
                            onChange={handleChange}
                            required
                        />

                        <label className="name mt-1 mb-0">Giá</label>
                        <input
                            type="text"
                            placeholder="Nhập tên"
                            name="product_price"
                            value={product.product_price}
                            onChange={handleChange}
                            required
                        />

                        <label for="exampleSelect" class="form-label">Chọn danh mục</label>
                        <select name="category_id" value={product.category_id} onChange={handleChange} className="form-select" id="exampleSelect" aria-label="Default select example">
                        <option value="">Chọn danh mục</option>
                          {categorys.map(category => (
                            <option key={category.category_id} value={category.category_id}>
                              {category.category_name}
                            </option>
                          ))}
                        </select>

                        <label for="exampleSelect" class="form-label">Chọn nhà cung cấp</label>
                        <select name="supplier_id" value={product.supplier_id} onChange={handleChange} className="form-select" id="exampleSelect" aria-label="Default select example">
                        <option value="">Chọn nhà cung cấp</option>
                            {suppliers.map(supplier => (
                              <option key={supplier.supplier_id} value={supplier.supplier_id}>
                                {supplier.supplier_name}
                              </option>
                            ))}
                        </select>

                        <label className="name mt-1 mb-0">Số lượng</label>
                        <input
                            type="number"
                            placeholder="Nhập tên"
                            name="product_quantity"
                            value={product.product_quantity}
                            onChange={handleChange}
                            required
                        />

                        <label className="name mt-1 mb-0">Mô tả</label>
                        <textarea name="product_dsc" value={product.product_dsc}
                            onChange={handleChange} className='w-100' rows="4" cols="50" style={{resize: 'none'}} placeholder="Nhập mô tả của sản phẩm..."></textarea>

                    </div>
                    <div className='col-md-4'>
                        <div style={{width:'250px',height:'250px'}}>
                            <img className='w-100' src={imageSrc} alt="Ảnh sản phẩm" />
                        </div>
                        <input type="file" onChange={handleImageUpload} />
                        
                    </div>
                </div>

            </div>


            <div>
                <button type="submit" className="btn btn-primary">Lưu</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
            </div>
        </form>
    </div>
);
}
export default ProductForm;