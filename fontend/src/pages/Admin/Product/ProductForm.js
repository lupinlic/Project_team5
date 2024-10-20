import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ProductForm = ({ productId, onUpdate, onClose  }) => {
  const [product, setProduct] = useState(null);
  const [product_id, setProduct_id] = useState(null);
    const [product_name, setproduct_name] = useState(null);
    const [category_id, setcategory_id] = useState(null);
    const [supplier_id, setsupplier_id] = useState(null);
    const [product_price, setproduct_price] = useState(null);
    const [product_img, setproduct_img] = useState(null);
    const [product_quantity, setproduct_quantity] = useState(null);
    const [product_dsc, setproduct_dsc] = useState(null);

  const [imageSrc, setImageSrc] = useState('https://png.pngtree.com/png-vector/20190820/ourlarge/pngtree-no-avatar-vector-isolated-on-white-background-png-image_1694546.jpg'); // Ảnh mặc định
  const [categorys, setCategories] = useState(null);
  const [suppliers, setSuppliers] = useState([]);

  const getCategoryName = (categoryId) => {
    const category = categorys?.find(category => category.category_id === categoryId);
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

    setProduct_id(productId);
  }, []);

  useEffect(()=>{
    if (product_id!==null) {
      axios.get(`http://localhost:8000/api/products/${product_id}`)
        .then(response => {
          let product = response.data.data;
          let categoryName = getCategoryName(product.category_id);

          setProduct(product);
          setproduct_name(product.product_name);
          setproduct_price(product.product_price);
          setproduct_quantity(product.product_quantity);
          setproduct_dsc(product.product_dsc);
          setcategory_id(product.category_id);
          setsupplier_id(product.supplier_id);        
        })
        .catch(error => console.error('Error fetching product:', error));
    } 
  },[product_id])

  // lấy link ảnh
  useEffect(() => {
    // Chỉ thực hiện khi cả product và categorys đều đã được tải
    if (product!==null && categorys!==null) {
      const categoryName = getCategoryName(category_id);
      const imagePath = `http://localhost:8000/uploads/Categories/${categoryName}/${product.product_img}`;

      setImageSrc(imagePath);
    }
  }, [product, categorys]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    if(product_img!==null){
      formdata.append('img',product_img);
    }
    formdata.append('product_name',product_name);
    formdata.append('product_price',product_price);
    formdata.append('category_id',category_id);
    formdata.append('supplier_id',supplier_id);
    formdata.append('product_quantity',product_quantity);
    formdata.append('product_dsc',product_dsc);

    if (productId!==null) {
    formdata.append('_method','PUT');

      axios.post(`http://localhost:8000/api/products/${productId}`, formdata)
        .then(response => {
          onUpdate();
          onClose();
        })
        .catch(error => console.error('Error updating product:', error));
        
    } else {
      axios.post('http://localhost:8000/api/products', formdata)
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
      setproduct_img(file);
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
                            value={product_name}
                            onChange={(e)=>setproduct_name(e.target.value)}
                            required
                        />

                        <label className="name mt-1 mb-0">Giá</label>
                        <input
                            type="text"
                            placeholder="Nhập tên"
                            name="product_price"
                            value={product_price}
                            onChange={(e)=>setproduct_price(parseInt(e.target.value))}
                            required
                        />

                        <label for="exampleSelect" class="form-label">Chọn danh mục</label>
                        <select name="category_id" value={category_id} onChange={(e)=>setcategory_id(parseInt(e.target.value))} className="form-select" id="exampleSelect" aria-label="Default select example">
                        <option value="">Chọn danh mục</option>
                          {categorys?.map(category => (
                            <option key={category.category_id} value={category.category_id}>
                              {category.category_name}
                            </option>
                          ))}
                        </select>

                        <label for="exampleSelect" class="form-label">Chọn nhà cung cấp</label>
                        <select name="supplier_id" value={supplier_id} onChange={(e)=>setsupplier_id(parseInt(e.target.value))} className="form-select" id="exampleSelect" aria-label="Default select example">
                        <option value="">Chọn nhà cung cấp</option>
                            {suppliers?.map(supplier => (
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
                            value={product_quantity}
                            onChange={(e)=>setproduct_quantity(parseInt(e.target.value))}
                            required
                        />

                        <label className="name mt-1 mb-0">Mô tả</label>
                        <textarea name="product_dsc" 
                             value={product_dsc}
                             onChange={(e)=>setproduct_dsc(e.target.value)}
                            className='w-100' rows="4" cols="50" style={{resize: 'none'}} placeholder="Nhập mô tả của sản phẩm..."></textarea>

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