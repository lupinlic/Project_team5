import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faList,faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {Link,useParams  } from 'react-router-dom';


import './style.css'
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

const Product = () =>{
        const [isMenuOpen, setIsMenuOpen] = useState(false);

        const openMenu = () => {
            setIsMenuOpen(true);
        };

        const closeMenu = () => {
            setIsMenuOpen(false);
        };
        
        const { category_Id } = useParams();
// gọi api đỏ sản phẩm
const [data, setData] = useState([]);
const [categorys, setCategory] = useState([]);
const [filteredProducts, setFilteredProducts] = useState([]);
        const [selectedFilter, setSelectedFilter] = useState(""); 
useEffect(() => {
    // Gọi hai API để lấy dữ liệu sản phẩm và danh mục, nhà cung cấp
    if(category_Id){
        axios.get(`http://localhost:8000/api/categorys/${category_Id}/products`)
        .then(response => {
            // Truy cập vào phần "data" của API trả về và đặt vào state
            setData(response.data.data);
            
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });

        axios.get(`http://localhost:8000/api/categorys/${category_Id}`)
        .then(response => {
            // Truy cập vào phần "data" của API trả về và đặt vào state
            setCategory([response.data.data]);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });

        

        
    }else{
    axios.get('http://localhost:8000/api/products')
        .then(response => {
            // Truy cập vào phần "data" của API trả về và đặt vào state
            setData(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });

    axios.get('http://localhost:8000/api/categorys')
    .then(response => {
        // Truy cập vào phần "data" của API trả về và đặt vào state
        setCategory(response.data.data);
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
    });
    }

    
     // Thiết lập mặc định
   

}, [category_Id]);
useEffect(() => {
    setSelectedFilter("all");
    // Khi vào trang, thiết lập sản phẩm hiển thị là tất cả
    setFilteredProducts(data); // Hiển thị tất cả sản phẩm
  }, [data]);

const getCategoryName = (categoryId) => {
    let categoryName = 'Không xác định';
    categorys.forEach(category => {
      if (category.category_id == categoryId) {
        categoryName = category.category_name;
      }
    });
    return categoryName;
  };
  const getImagePath = (categoryId, productImg) => {
    const categoryName = getCategoryName(categoryId);
    try {
      return `http://localhost:8000/uploads/Categories/${categoryName}/${productImg}`;
    } catch (error) {
      console.error('Error loading image:', error);
      return null; // Hoặc có thể trả về một hình ảnh mặc định
    }
  };

const shortenText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };
        

        

  // Hàm để lọc sản phẩm theo giá dựa trên checkbox đã chọn
  const handleCheckboxChange = (value) => {
    
     if (selectedFilter === value) {
        setSelectedFilter(""); // Nếu checkbox đang chọn bị click lại, bỏ chọn
        setFilteredProducts(data); // Hiển thị tất cả sản phẩm
      }
      else {
        setSelectedFilter(value);
        
        if (value === "all") {
        setFilteredProducts(data); // Hiển thị tất cả sản phẩm
        } else if (value === "under_100") {
        setFilteredProducts(data.filter(product => product.product_price < 100000));
        } else if (value === "between_100_200") {
        setFilteredProducts(
            data.filter(product => product.product_price >= 100000 && product.product_price <= 200000)
        );
        } else if (value === "between_200_300") {
        setFilteredProducts(data.filter(product => product.product_price >= 200000 && product.product_price <= 300000));
        }else if (value === "between_300_500") {
            setFilteredProducts(data.filter(product => product.product_price >= 300000 && product.product_price <= 500000));
        }
        else if (value === "between_500_1000") {
            setFilteredProducts(data.filter(product => product.product_price >= 500000 && product.product_price <= 1000000));
        }else if (value === "above_1000") {
            setFilteredProducts(data.filter(product => product.product_price >= 1000000 ));
        }
    }
  };
//   gộp product với category
// const productsByCategory = categorys.map(category => ({
//     ...category,
//     filteredProducts: filteredProducts.filter(product => product.category_id === category.id)
// }));
    return (
        <div style={{margin:'30px 0'}}>
            <h5>TRANG CHỦ/SẢN PHẨM</h5>
            <h6 id="menuButton" className=''><FontAwesomeIcon icon={faList} onClick={openMenu}/>Danh mục</h6>
            {/* menu */}
            <div id="overlay" onClick={closeMenu} style={{
                opacity: isMenuOpen ? '1' : '0',
                visibility: isMenuOpen ? 'visible' : 'hidden',
                transition: 'opacity 0.3s, visibility 0.3s',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: '10'
                }}>

            </div>
                <div id="menuContainer" 
                style={{
                    overflowY: 'auto',overflowX: 'hidden',
                    position: 'fixed',
                    top: 0,
                    left: isMenuOpen ? '0' : '-300px',
                    width: '300px',
                    height: '100%',
                    backgroundColor: '#fff',
                    transition: 'left 0.3s',
                    zIndex: '20'
                }}>
                        <span id="closeButton" onClick={closeMenu}>×</span>

                        <div className='container col-md-2 main-left border-end d-block d-md-none mt-4'>
                            <h6>MỨC GIÁ</h6>
                            <form>
                                <div className="form-check m-2">
                                    <input className="form-check-input custom-checkbox" type="checkbox" defaultValue value="all" defaultChecked
                                        checked={selectedFilter === "all"} // Kiểm tra checkbox đã chọn
                                        onChange={() => handleCheckboxChange("all")} id="all" />
                                    <label className="form-check-label" htmlFor="checkbox1" style={{fontSize:'17px',margin:'0'}}>
                                    Tất cả sản phẩm
                                    </label>
                                </div>
                                
                                <div className="form-check m-2">
                                    <input className="form-check-input custom-checkbox" type="checkbox" defaultValue value="under_100"
                                        checked={selectedFilter === "under_100"} // Kiểm tra checkbox đã chọn
                                        onChange={() => handleCheckboxChange("under_100")} id="under_100" />
                                    <label className="form-check-label" htmlFor="checkbox1" style={{fontSize:'17px',margin:'0'}}>
                                    Giá dưới 100.000đ
                                    </label>
                                </div>
                                <div className="form-check m-2">
                                <input className="form-check-input custom-checkbox" type="checkbox" defaultValue value="between_100_200"
                                        checked={selectedFilter === "between_100_200"} // Kiểm tra checkbox đã chọn
                                        onChange={() => handleCheckboxChange("between_100_200")} id="between_100_200" />
                                    <label className="form-check-label" htmlFor="checkbox2" style={{fontSize:'17px',margin:'0'}}>
                                    100.000-200.000đ
                                    </label>
                                </div>
                                <div className="form-check m-2">
                                <input className="form-check-input custom-checkbox" type="checkbox" defaultValue value="between_200_300"
                                        checked={selectedFilter === "between_200_300"} // Kiểm tra checkbox đã chọn
                                        onChange={() => handleCheckboxChange("between_200_300")} id="between_200_300" />
                                    <label className="form-check-label" htmlFor="checkbox3" style={{fontSize:'17px',margin:'0'}}>
                                    200.000-300.000đ
                                    </label>
                                </div>
                                <div className="form-check m-2">
                                <input className="form-check-input custom-checkbox" type="checkbox" defaultValue value="between_300_500"
                                        checked={selectedFilter === "between_300_500"} // Kiểm tra checkbox đã chọn
                                        onChange={() => handleCheckboxChange("between_300_500")} id="between_300_500" />
                                    <label className="form-check-label" htmlFor="checkbox4" style={{fontSize:'17px',margin:'0'}}>
                                    300.000-500.000đ
                                    </label>
                                </div>
                                <div className="form-check m-2">
                                <input className="form-check-input custom-checkbox" type="checkbox" defaultValue value="between_500_1000"
                                        checked={selectedFilter === "between_500_1000"} // Kiểm tra checkbox đã chọn
                                        onChange={() => handleCheckboxChange("between_500_1000")} id="between_500_1000" />
                                    <label className="form-check-label" htmlFor="checkbox5" style={{fontSize:'17px',margin:'0'}}>
                                    500.000-1.000.000đ
                                    </label>
                                </div>
                                <div className="form-check m-2">
                                <input className="form-check-input custom-checkbox" type="checkbox" defaultValue value="above_1000"
                                    checked={selectedFilter === "above_1000"} // Kiểm tra checkbox đã chọn
                                        onChange={() => handleCheckboxChange("above_1000")} id="above_1000" />
                                    <label className="form-check-label" htmlFor="checkbox6" style={{fontSize:'17px',margin:'0'}}>
                                    Giá trên 1.000.000đ
                                    </label>
                                </div>
                            </form>

                        </div>

                        <ul className="list-group mb-3">
                            <li className="list-group-item active" style={{backgroundColor: '#e5677d', border: 'none'}}>DANH MỤC SẢN PHẨM</li>
                            <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/icon11.png" alt='' /><Link to="/Product/2">Sữa rửa mặt</Link></li>
                            <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/trang-diem-2.png" alt='' /><Link to="/Product/1">Tẩy trang</Link></li>
                            <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/salon-toc.png" alt='' /><Link to="/Product/3">Mặt nạ</Link></li>
                            <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/duong-the.png" alt='' /><Link to="/Product/4">Nước hoa hồng</Link></li>
                            <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/nuoc-hoa-1.png" alt='' /><Link to="/Product/5">Dưỡng ẩm</Link></li>
                            <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/dac-tri.png" alt='' /><Link to="/Product/8">Chăm sóc tóc</Link></li>
                            <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/icon11.png" alt='' /><Link to="/Product/7">Trang điểm</Link></li>
                            <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/trang-diem-2.png" alt='' /><Link to="/Product/6">Dưỡng thể</Link> </li>
                        </ul>
                </div>
            {/* main */}
            <div className='row mt-4' id='main'>
                <div className='col-md-2 main-left border-end d-none d-md-block'>
                    <h6>MỨC GIÁ</h6>
                    <form>
                        <div className="form-check m-2">
                            <input className="form-check-input custom-checkbox" type="checkbox" defaultValue value="all" defaultChecked
                                checked={selectedFilter === "all"} // Kiểm tra checkbox đã chọn
                                onChange={() => handleCheckboxChange("all")} id="all" />
                            <label className="form-check-label" htmlFor="checkbox1" style={{fontSize:'17px',margin:'0'}}>
                            Tất cả sản phẩm
                            </label>
                        </div>
                        
                        <div className="form-check m-2">
                            <input className="form-check-input custom-checkbox" type="checkbox" defaultValue value="under_100"
                                checked={selectedFilter === "under_100"} // Kiểm tra checkbox đã chọn
                                onChange={() => handleCheckboxChange("under_100")} id="under_100" />
                            <label className="form-check-label" htmlFor="checkbox1" style={{fontSize:'17px',margin:'0'}}>
                            Giá dưới 100.000đ
                            </label>
                        </div>
                        <div className="form-check m-2">
                        <input className="form-check-input custom-checkbox" type="checkbox" defaultValue value="between_100_200"
                                checked={selectedFilter === "between_100_200"} // Kiểm tra checkbox đã chọn
                                onChange={() => handleCheckboxChange("between_100_200")} id="between_100_200" />
                            <label className="form-check-label" htmlFor="checkbox2" style={{fontSize:'17px',margin:'0'}}>
                            100.000-200.000đ
                            </label>
                        </div>
                        <div className="form-check m-2">
                        <input className="form-check-input custom-checkbox" type="checkbox" defaultValue value="between_200_300"
                                checked={selectedFilter === "between_200_300"} // Kiểm tra checkbox đã chọn
                                onChange={() => handleCheckboxChange("between_200_300")} id="between_200_300" />
                            <label className="form-check-label" htmlFor="checkbox3" style={{fontSize:'17px',margin:'0'}}>
                            200.000-300.000đ
                            </label>
                        </div>
                        <div className="form-check m-2">
                        <input className="form-check-input custom-checkbox" type="checkbox" defaultValue value="between_300_500"
                                checked={selectedFilter === "between_300_500"} // Kiểm tra checkbox đã chọn
                                onChange={() => handleCheckboxChange("between_300_500")} id="between_300_500" />
                            <label className="form-check-label" htmlFor="checkbox4" style={{fontSize:'17px',margin:'0'}}>
                            300.000-500.000đ
                            </label>
                        </div>
                        <div className="form-check m-2">
                        <input className="form-check-input custom-checkbox" type="checkbox" defaultValue value="between_500_1000"
                                checked={selectedFilter === "between_500_1000"} // Kiểm tra checkbox đã chọn
                                onChange={() => handleCheckboxChange("between_500_1000")} id="between_500_1000" />
                            <label className="form-check-label" htmlFor="checkbox5" style={{fontSize:'17px',margin:'0'}}>
                            500.000-1.000.000đ
                            </label>
                        </div>
                        <div className="form-check m-2">
                        <input className="form-check-input custom-checkbox" type="checkbox" defaultValue value="above_1000"
                               checked={selectedFilter === "above_1000"} // Kiểm tra checkbox đã chọn
                                onChange={() => handleCheckboxChange("above_1000")} id="above_1000" />
                            <label className="form-check-label" htmlFor="checkbox6" style={{fontSize:'17px',margin:'0'}}>
                            Giá trên 1.000.000đ
                            </label>
                        </div>
                    </form>

                </div>
                <div className='col-md-10 main-right'>
                    {categorys!==null &&categorys?.length>0 ? 
                    <>
                    {categorys?.map(category => (
                                                            
                        <div className='row' key={category.id}>
                            <h5>{category.category_name}</h5>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.filter(product => product.category_id === category.category_id)?.map(item =>(
                                <div className='col-md-3 p-3 col-6' key={item.id}>
                                <Link to={`/Product_detail/${item.product_id}`} style={{textDecoration:'none'}}>
                                    <img src={getImagePath(item.category_id, item.product_img)} style={{width:'100%'}}/>
                                    <Link to={`/Product_detail/${item.product_id}`} className='pro-name' style={{marginLeft:'16px'}}>{shortenText(item.product_name, 25)}</Link>
                                    <div className='d-flex justify-content-between' style={{marginLeft:'16px'}}>
                                        <p style={{color:'red'}}>{item.product_price} đ</p>
                                        <Link to={`/Product_detail/${item.product_id}`}><FontAwesomeIcon icon={faShoppingCart}  style={{color:'red'}}/></Link>
                                    </div>
                                    </Link>
                                </div>
                            ))) : (<p style={{color:'red'}}>Không có sản phẩm nào!!!</p> ) // Thông báo khi không có sản phẩm
                            }           
                        </div>))
                        }         
                        </>           
                    :
                    console.log(categorys)
                    }{
                    
                    }
                
                </div>
                

            </div>
        </div>
    );

};

export default Product;