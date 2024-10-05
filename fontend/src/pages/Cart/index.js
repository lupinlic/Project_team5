import React, { useState ,useEffect } from 'react';
import {Link  } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const [carts, setData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [products, setProducts] = useState([]);

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

    return ( 
        <div style={{margin:'20px 0'}}>
            <div>
                <p style={{color: 'darkgrey'}}>Trang chủ &gt; Giỏ hàng</p>
                <div style={{display: 'flex'}}>
                    <p style={{fontSize: 20, marginLeft: 8}}>Sản phẩm</p>
                    {/* <p style="color: red; margin-left: 4px;font-size: 20px; "> 1</p> */}
                </div>
                <div className="row">
                    <div className="left col-9">
                    <div className="container py-1 " >
                        <div className="row" style={{backgroundColor: '#cccaca'}}>
                            <div className="col-1">
                                <p style={{float: 'left'}}>Chọn</p>
                            </div>
                            <div className="col-4">
                                <p>Sản phẩm</p>
                            </div>
                            <div className="col-2">
                                <p style={{float: 'right'}}>Giá tiền</p>
                            </div>
                            <div className="col-2">
                                <p style={{float: 'right'}}>Số lượng</p>
                            </div>
                            <div className="col-2">
                                <p style={{float: 'right'}}>Thành tiền</p>
                            </div>
                            <div className="col-1">
                                <p style={{float: 'right'}} />
                            </div>
                        </div>

                        {carts && carts.length > 0 ? carts.map(item => (
                        <div className="row" style={{borderBottom: '1px solid darkgrey',padding:'12px 0'}} key={item.id}>
                            <div className="col-1">
                                <input type='checkbox' name='' id='cart_check' ></input>
                            </div>
                            <div className="col-4">
                                <p>{shortenText(getProductName(item.product_id),50)}</p>
                            </div>
                            <div className="col-2">
                                <p style={{float: 'right'}}>{getProductPrice(item.product_id)}</p>
                            </div>
                            <div className="col-2">
                                <p style={{float: 'right'}}>{item.cart_quantity}</p>
                            </div>
                            <div className="col-2">
                                <p style={{float: 'right'}}>{item.cart_totalmoney}</p>
                            </div>
                            <div className="col-1">
                                <button style={{float: 'right',color:'red',border:'none'}} >xóa</button>
                            </div>
                        </div>)) : <p>Chưa có sản phẩm nào đc mua.</p>
                        }
                    </div>
                    
                    <div className="py-3">
                        <Link to="/" className="tieptuc" style={{color: 'darkgrey'}}><i className="ti-arrow-left" />Tiếp tục mua hàng</Link>
                    </div>
                    </div>
                    {/* right */}
                    <div className="right col-3">
                    <div className="py-1" style={{borderBottom: '1px solid darkgrey'}}><p style={{fontSize: 18, marginLeft: 8, fontWeight: 500}}>Hóa đơn của bạn</p></div>
                    <div className="py-1" style={{borderBottom: '1px solid darkgrey'}}>
                        <div className="row">
                        <div className="col">
                            <p style={{}}>số sản phẩm:</p>
                        </div>
                        <div className="col">
                            <p style={{float: 'right', fontWeight: 500}} className="cart_sosp">0</p>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col">
                            <p>Giảm giá:</p>
                        </div>
                        <div className="col">
                            <p style={{float: 'right', fontWeight: 500}}>0</p>
                        </div>
                        </div>
                    </div>
                    <div>
                        <div className="row py-1">
                        <div className="col">
                            <p>Tổng cộng:</p>
                        </div>
                        <div className="col">
                            <p style={{color: '#fa7551', float: 'right'}} className="cart_tongcong">0</p>
                        </div>
                        </div>
                    </div>
                    <button style={{backgroundColor: '#fa7551', width: '100%', border: 'none', borderRadius: 5}} className="py-2"><Link to='/Pay' style={{textDecoration:'none',color:'#fff'}}>Tiến hành đặt hàng</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )};


export default Cart;