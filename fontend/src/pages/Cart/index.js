import React, { useState ,useEffect } from 'react';
import {Link  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './style.css'

const Cart = () => {
    const [carts, setData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [products, setProducts] = useState([]);
    const [categorys, setCategory] = useState([]);

    const userData = localStorage.getItem('user');
    
    useEffect(() => {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser.user_id) {
            setUserId(parsedUser.user_id);
        }
    }, [userData]); // Thêm userData vào dependency để theo dõi

    useEffect(() => {
        if (userId !== null) { // Thay đổi điều kiện để kiểm tra userId

            axios.get(`http://localhost:8000/api/users/${userId}/carts`)
                .then(response => {
                    setData(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                });

            axios.get('http://localhost:8000/api/products')
                .then(response => {
                    setProducts(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                });
        }
    }, [userId]);

    
    const getProductName = (product_id) => {
        let productName = 'Không xác định';
        products.forEach(product => {
          if (product.product_id == product_id) {
            productName = product.product_name;
          }
        });
        return productName;
      };
      const getProductPrice = (product_id) => {
        let productPrice = 0;
        products.forEach(product => {
          if (product.product_id == product_id) {
            productPrice = product.product_price;
          }
        });
        return productPrice;
      };

    //   const deleteProduct = (cartId) => {
    //     if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?')) {
    //       axios.delete(`http://localhost:8000/api/carts/${cartId}`)
    //         .then(response => {
    //             updateCart(); // Cập nhật lại danh sách sau khi xóa
    //         })
    //     }
    //   };
      const shortenText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
      };

    //   danh mục
      useEffect(() => {
        axios.get('http://localhost:8000/api/categorys')
        .then(response => {
            // Truy cập vào phần "data" của API trả về và đặt vào state
            setCategory(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }, []);

      const getCategoryName = (categoryId) => {
        let categoryName = 'Không xác định';
        categorys.forEach(category => {
          if (category.category_id === categoryId) {
            categoryName = category.category_name;
          }
        });
        return categoryName;
      };
      const getImagePath = (categoryId, productImg) => {
        const categoryName = getCategoryName(categoryId);
        try {
          return `/assets/img/${categoryName}/${productImg}`;
        } catch (error) {
          console.error('Error loading image:', error);
          return null; // Hoặc có thể trả về một hình ảnh mặc định
        }
      };

    //   cuộn
    const [isFixed, setIsFixed] = useState(true);
    useEffect(() => {
        const handleScroll = () => {
          const productList = document.querySelector(".product-list");
          const productBottom = productList.getBoundingClientRect().bottom;
          const windowHeight = window.innerHeight;
    
          if (productBottom <= windowHeight) {
            setIsFixed(false); // Thanh không còn dính nữa khi chạm tới cuối danh sách
          } else {
            setIsFixed(true); // Giữ thanh ở vị trí cố định dưới cùng
          }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

    //   số lượng
    
        const [quantity, setQuantity] = useState(1); // Khởi tạo số lượng sản phẩm
      
        const handleIncrease = () => {
          setQuantity((prev) => prev + 1); // Tăng số lượng
        };
      
        const handleDecrease = () => {
          setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Giảm số lượng, không cho phép nhỏ hơn 1
        };
        // lấy 12sanr phẩm
        const displayedProducts = products.slice(0, 12);
      


    return ( 
        <div style={{margin:'20px 0'}} className='container'>
            <p style={{color: 'darkgrey'}}>Trang chủ &gt; Giỏ hàng</p>   
            <div className='row' style={{height:'50px', backgroundColor:'rgb(254, 223, 249)', alignItems:'center'}}>
                <div className='col-md-6'>
                    <input type='checkbox' style={{margin:'0 8px'}}></input>
                    Sản Phẩm
                </div>
                <div className='col-md-2'>Đơn giá</div>
                <div className='col-md-2'>Số lượng</div>
                <div className='col-md-1'>Tổng tiền</div>
                <div className='col-md-1'>Thao tác</div>

            </div>
            <div className='product-list'>
            {carts && carts.length > 0 ? carts.map(item => (  
                <div style={{margin:'20px 0', boxShadow:'0 -4px 10px rgba(0, 0, 0, 0.1)'}}>
                    <div className='row mt-4' style={{height:'120px', alignItems:'center',borderBottom:'1px solid rgb(210, 209, 210)'}}>
                        <div className='col-md-6 d-flex align-items-center'>
                            <input id='cart_check' type='checkbox' style={{margin:'0 8px'}}></input>
                            <img src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyddlh37mzpp26@resize_w80_nl.webp' style={{width:'60px',height:'80px',margin:'0 8px'}}/>
                            <h6>{shortenText(getProductName(item.product_id),50)}</h6>
                        </div>
                        <div className='col-md-2'>{getProductPrice(item.product_id)}</div>
                        <div className='col-md-2 d-flex'> 
                                <button style={{border:'none'}} onClick={handleDecrease} >-</button>
                                <input type="number" value={quantity} defaultValue={1} style={{width:'40px'}}>{item.cart_quantity}</input>
                                <button style={{border:'none'}} onClick={handleIncrease} >+</button>
                        </div>
                        <div className='col-md-1'>{item.cart_totalmoney}</div>
                        <div className='col-md-1'><button style={{border:'none', color:'red'}}>Xóa</button></div>
                    </div>
                    <div style={{height:'50px', padding:'20px 0',borderBottom:'1px solid rgb(210, 209, 210)'}}>
                        <img style={{width:"30px", height:'30px'}} src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/d9e992985b18d96aab90.png'/>
                        Giảm ₫300.000 phí vận chuyển đơn tối thiểu ₫0; Giảm ₫500.000 phí vận chuyển đơn tối thiểu ₫500.000
                    </div>
                </div>
                )) : <p>Chưa có sản phẩm nào đc mua.</p>
                        }

               
            </div>
            {/* mua hàng */}
            <div className={ isFixed ? "fixed-checkout-bar bar" : "static-checkout-bar bar"}>
                    <div className='col-md-6 ' >
                        <div className='d-flex align-items-center' style={{margin:'0 12px'}}>
                            <input type='checkbox' style={{margin:'0  16px 12px 16px'}}></input>
                            <p style={{marginRight:'20px'}}>Chọn tất cả</p>
                            <p>Xóa</p>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <p>
                            <span>Tổng thanh toán( 0 sản phẩm): </span>
                            <span style={{color:'red'}}> 20000</span>
                        </p>
                    </div>
                    <div className='col-md-2'>
                        <button style={{height:'40px', width:'80%', color:'#fff', border:'none'}}>Mua hàng</button>
                    </div>
            </div>
            {/* có thể cũng thích */}
            <div className='mt-5 '>
                <div className='row'>
                    <div className='col-md-10'>
                        <h6>CÓ THỂ BẠN CŨNG THÍCH</h6>
                    </div>
                    <div className='col-md-2'>
                        <Link to='/Product' style={{color:'red',textDecoration:'none'}}>Xem Tất Cả <FontAwesomeIcon icon={faAngleRight} /></Link>
                    </div>
                </div>
                <div className='row mt-2'>
                {displayedProducts.map(product => (
                    <div className='col-md-2 p-1 ' key={product.id}>
                    <Link to={`/Product_detail/${product.product_id}`} style={{textDecoration:'none'}} className='product_like'>
                        <div className='border product_like-div' style={{height:'330px',boxShadow:'0 -4px 10px rgba(0, 0, 0, 0.1)'}}>
                            <img className='w-100' src={getImagePath(product.category_id, product.product_img)}/>
                            <p style={{margin:'16px 8px',color:'black'}}>{shortenText(product.product_name,30)}</p>
                            <p  style={{color:'red',margin:'0 8px '}}>{product.product_price} đ</p>
                        </div>
                    </Link>
                    </div> ))}
                    
                    
                </div>
            </div>
        </div>
    )};


export default Cart;