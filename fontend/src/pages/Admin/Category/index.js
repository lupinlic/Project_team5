import './style.css'
import React, { useState ,useEffect } from 'react';
import CategoryForm from './CategoryForm';
import axios from 'axios';
import { apiUrl } from '../../../config';


function Category() {

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    // gọi api
    const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`${apiUrl}/api/categorys`)
            .then(response => {
                // Truy cập vào phần "data" của API trả về và đặt vào state
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);


    // Cập nhật danh sách nhà cung cấp sau khi thêm hoặc sửa
    const updateCategorys = () => {
        axios.get(`${apiUrl}/api/categorys`)
        .then(response => {
            setData(response.data.data);
        })
        .catch(error => {
            console.error('Có lỗi khi cập nhật danh sách danh mục!');
        });
    };

    const [isFormVisible, setIsFormVisible] = useState(false);

    const openForm = (categoryId = null) => {
        setSelectedCategoryId(categoryId);
        setIsFormVisible(true);
      };
    
      // Đóng form
      const closeForm = () => {
        setIsFormVisible(false);
      };
    //   xóa
    const deleteCategory = (categoryId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa nhà cung cấp này không?')) {
          axios.delete(`${apiUrl}/api/categorys/${categoryId}`)
            .then(response => {
                updateCategorys(); // Cập nhật lại danh sách sau khi xóa
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
                    <CategoryForm 
                    categoryId={selectedCategoryId} 
                    onUpdate={updateCategorys} 
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
                        <th>Tên danh mục</th>
                        <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {suppliers.map((supplier, index) => (key={index} */}
                        {data.map(item => (
                        <tr key={item.id}>
                            <td >{item.category_name}</td>
                            
                          
                            <td>
                            <button 
                                className="btn btn-warning btn-sm mr-2" 
                                onClick={() => openForm(item.category_id)}
                            >
                                Sửa
                            </button>
                            <button 
                                className="btn btn-danger btn-sm" 
                                onClick={() => deleteCategory(item.category_id)}
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

export default Category;