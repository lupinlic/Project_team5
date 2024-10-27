import './style.css'
import React, { useState,useEffect } from 'react';
import ProductForm from './ProductForm';
import axios from 'axios';
import { apiUrl } from '../../../config';


function AdProduct() {

    const [selectedProductId, setSelectedProductId] = useState(null);
    // gọi api đổ 
    const [data, setData] = useState([]);
    const [categorys, setCategory] = useState([]);
    const [suppliers, setSupplier] = useState([]);
    useEffect(() => {
        // Gọi hai API để lấy dữ liệu sản phẩm và danh mục, nhà cung cấp
        axios.get(`${apiUrl}/api/products`)
            .then(response => {
                // Truy cập vào phần "data" của API trả về và đặt vào state
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });

            axios.get(`${apiUrl}/api/categorys`)
            .then(response => {
                // Truy cập vào phần "data" của API trả về và đặt vào state
                setCategory(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
            axios.get(`${apiUrl}/api/suppliers`)
            .then(response => {
                // Truy cập vào phần "data" của API trả về và đặt vào state
                setSupplier(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    // Cập nhật danh sách sản phẩm sau khi thêm hoặc sửa
    const updateProduct = () => {
        axios.get(`${apiUrl}/api/products`)
        .then(response => {
            setData(response.data.data);
        })
        .catch(error => {
            console.error('Có lỗi khi cập nhật danh sách nhà cung cấp!');
        });
    };


    const getCategoryName = (categoryId) => {
        let categoryName = 'Không xác định';
        categorys.forEach(category => {
          if (category.category_id == categoryId) {
            categoryName = category.category_name;
          }
        });
        return categoryName;
      };
      const getSupplierName = (supplierId) => {
        let supplierName = 'Không xác định';
        suppliers.forEach(supplier => {
          if (supplier.supplier_id == supplierId) {
            supplierName = supplier.supplier_name;
          }
        });
        return supplierName;
      };

    //   get ảnh
        const getImagePath = (categoryId, productImg) => {
        const categoryName = getCategoryName(categoryId);
        try {
          return `${apiUrl}/uploads/Categories/${categoryName}/${productImg}`;
        } catch (error) {
          console.error('Error loading image:', error);
          return null; // Hoặc có thể trả về một hình ảnh mặc định
        }
      };
    // 
    const [isFormVisible, setIsFormVisible] = useState(false);

    const openForm = (productId = null) => {
        setSelectedProductId(productId);
        setIsFormVisible(true);
      };
    
      // Đóng form
      const closeForm = () => {
        setIsFormVisible(false);
      };
    //   xóa
    const deleteProduct = (productId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
          axios.delete(`${apiUrl}/api/products/${productId}`)
            .then(response => {
                updateProduct(); // Cập nhật lại danh sách sau khi xóa
            })
        }
      };

//   cắt chuỗi
const shortenText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };


    return ( 
        <>
        <div style={{backgroundColor:'#fff',minHeight:'100vh',paddingLeft:'4px'}}>
            <div className="container supplier pt-3">
                <button type="button" class="btn btn-success " onClick={() => openForm()}>Thêm</button>
                {isFormVisible && (
                    <>
                    <div className="overlay"></div> {/* Lớp overlay */}
                    <ProductForm 
                    productId={selectedProductId} 
                    onUpdate={updateProduct} 
                    onClose={closeForm} 
                    />
                    </>
                )}
            </div>

            <div className='container pt-4'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th>Tên sản phẩm</th>
                        <th>Danh mục</th>
                        <th>Nhà cung cấp</th>
                        <th>Ảnh sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Mô tả</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {suppliers.map((supplier, index) => (key={index} */}

                        {data.map(item =>(

                       
                        <tr key={item.id} >
                            <td>{item.product_name}</td>
                            <td>{getCategoryName(item.category_id)}</td>
                            <td>{getSupplierName(item.supplier_id)}</td>
                            <img style={{ width: '100px',height:'100px'}} src={getImagePath(item.category_id, item.product_img)}/>
                            <td>{item.product_price}</td>
                            
                            <td>{item.product_quantity}</td>
                            <td>{shortenText(item.product_dsc, 5)}</td>
                            <td>
                            <button 
                                className="btn btn-warning btn-sm mr-2" 
                                onClick={() => openForm(item.product_id)}
                            >
                                Sửa
                            </button>
                            <button 
                                className="btn btn-danger btn-sm" 
                                onClick={() => deleteProduct(item.product_id)}
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

export default AdProduct;