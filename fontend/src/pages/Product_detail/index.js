import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFire} from '@fortawesome/free-solid-svg-icons';
import {Link  } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';
import './style.css'
import axios from 'axios';
import React, { useState, useRef, useEffect,useContext } from 'react';
import { CartContext } from '../../context/cartContext';  // Import CartContext

import { useParams } from 'react-router-dom';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
const Product_detail = () => {
    const { cartCount, setCartCount } = useContext(CartContext);  // Truy cập cartCount và setCartCount

    const { product_id } = useParams(); // Lấy id sản phẩm từ URL
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [categorys, setCategory] = useState([]);
    const [userId, setUserId] = useState(null);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const userData = localStorage.getItem('user');

    useEffect(() => {
        
        const parsedUser = JSON.parse(userData);
        setUserId(parsedUser.user_id);
      }, []);

    useEffect(() => {
        // Giả sử bạn có API để lấy chi tiết sản phẩm
        axios.get(`http://localhost:8000/api/products/${product_id}`)
        .then(response => {
          setProduct(response.data.data);
          
        })
          .catch(error => {
            console.error('Error fetching product details:', error);
          });

         
      }, [product_id]);

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
          return `http://localhost:8000/uploads/Categories/${categoryName}/${productImg}`;
        } catch (error) {
          console.error('Error loading image:', error);
          return null; // Hoặc có thể trả về một hình ảnh mặc định
        }
      };


    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
        setQuantity(quantity - 1);
        }
    };

    // tạo hiệu ứng thêm giỏ hàng
    // end


    let price= product.product_price
    const num = Number(product_id)
    let total= price*quantity
    
    // thêm giỏ hàng
    const addToCart = () => {
        const cartItem = {
          user_id: userId.toString(),
          product_id: product_id,
          cart_quantity: quantity.toString(), // Bạn có thể thay đổi số lượng tùy theo yêu cầu
          cart_totalmoney: total.toString() // Sẽ tính toán trong API hoặc ở đây
        };
    
        console.log(userId.toString(), product_id,quantity.toString(),total.toString())
        // Gọi API để thêm sản phẩm vào giỏ hàng
        axios.post('http://localhost:8000/api/carts', cartItem)
          .then(response => {
            console.log('Thêm vào giỏ hàng thành công:');
            setCartCount(cartCount+1);
          })
          .catch(error => {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
          });
        //   Addcart();
          setIsMessageVisible(true);

        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
            setIsMessageVisible(false);
        }, 3000);
      };
    
    return ( 
        <div className='mt-4 mb-5'>
            <h6>Trang chủ/Sản phẩm</h6>
            <div className='row mt'>
                <div className='col-md-4 '>
                    <img src={getImagePath(product.category_id, product.product_img)} style={{width:'100%'}}/>
                </div>
                <div className='col-md-5'>
                    <h5 >{product.product_name}</h5>
                    <p>Tình trạng: <span style={{color:'red'}}>Còn hàng</span></p>
                    <h5 style={{color:'red', margin:'12px 0'}}>{product.product_price} đ</h5>
                    <p>(Tiết kiệm <span style={{color:'red'}}>75,000đ</span> )</p>
                    <div className='deal p-3'>
                        <h4 style={{textAlign:'center',color:'red'}}>Siêu deal mua 1 tặng 1</h4>
                        <div className="CountdownTimer">
                            <CountdownTimer targetDate="2024-12-31T23:59:59" />
                        </div>
                    </div>
                    {/* số lượng */}
                    <div className='d-flex mt-4'>
                        <p className='pt-2'>Số lượng</p>
                        <div style={{width:'130px',marginLeft:'8px'}}>
                            <InputGroup className="mb-3" >
                                <Button variant="outline-secondary" onClick={handleDecrement}>
                                    -
                                </Button>
                                <FormControl style={{width:'30px'}}
                                    className="text-center"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    min="1"
                                    type="number"
                                />
                                <Button variant="outline-secondary" onClick={handleIncrement}>
                                    +
                                </Button>
                            </InputGroup>
                        </div>
                    </div>   
                    {/*  */}
                    <div className='row'>
                        <div className='col-md-5'>
                            <Link to='/Pay'><Button className='w-100' style={{background: 'white',color: 'rgb(237, 111, 132)',borderColor:'rgb(237, 111, 132)'}}>Mua Ngay</Button></Link>
                        </div>
                        <div className='col-md-5'>
                            <Link to=''><Button className="w-100" style={{background: 'rgb(237, 111, 132)',color: 'white',borderColor:'white'}}
                            onClick={addToCart}>
                            Thêm vào giỏ hàng
                            </Button></Link>
                            {isMessageVisible && <div className="success-message">Thêm vào giỏ hàng thành công!</div>}
                        </div>
                        <div className='col-md-2'>

                        </div>
                    </div>
                    {/* pay */}
                    <h5 className='mt-4' >Phương thức thanh toán</h5>
                    <div>
                        <img style={{width:'60px'}} src='https://theme.hstatic.net/200000551679/1001154878/14/trustbadge_fot_1.png?v=2470'/>
                        <img style={{width:'60px'}} src='https://theme.hstatic.net/200000551679/1001154878/14/trustbadge_fot_2.png?v=2470'/>
                        <img style={{width:'60px'}} src='https://theme.hstatic.net/200000551679/1001154878/14/trustbadge_fot_3.png?v=2470'/>
                        <img style={{width:'60px'}} src='https://theme.hstatic.net/200000551679/1001154878/14/trustbadge_fot_4.png?v=2470'/>
                        <img style={{width:'60px'}} src='https://theme.hstatic.net/200000551679/1001154878/14/trustbadge_fot_5.png?v=2470'/>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-md-6 d-flex align-content-center'>
                            <img style={{width:'40px', marginRight:'8px'}} src='https://theme.hstatic.net/200000551679/1001154878/14/policy_product_image_1.png?v=2470'/>
                            <p className='m-0'>Giao hàng toàn quốc</p>
                        </div>
                        <div className='col-md-6 d-flex align-content-center'>
                            <img style={{width:'40px', marginRight:'8px'}} src='https://theme.hstatic.net/200000551679/1001154878/14/policy_product_image_2.png?v=2470'/>
                            <p className='m-0'>Tích điểm tất cả sản phẩm</p>
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-md-6 d-flex align-content-center'>
                            <img style={{width:'40px', marginRight:'8px'}} src='https://theme.hstatic.net/200000551679/1001154878/14/policy_product_image_3.png?v=2470'/>
                            <p className='m-0'>Miễn phí vận chuyển đơn từ 60k</p>
                        </div>
                        <div className='col-md-6 d-flex align-content-center'>
                            <img style={{width:'40px', marginRight:'8px'}} src='https://theme.hstatic.net/200000551679/1001154878/14/policy_product_image_4.png?v=2470'/>
                            <p className='m-0'>Cam kết chính hãng</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 d-none d-md-block'>
                    <div className='hot'>
                        <h5 ><span style={{color:'white'}}>Ưu đãi Hot</span><FontAwesomeIcon icon={faFire} style={{ marginRight: '8px', color: 'orange' }} /></h5>
                    </div>
                    <Link to='' className='hot-pro'>
                    <div className='row mt-4'>
                        <div className='col-md-4'>
                            <img src='https://product.hstatic.net/200000551679/product/z5370380930165_6421deef0632f6de0b9015a6912415d6_ebf217785d7440c9a8f458900c60209a_large.jpg' style={{width:'100%'}}/>
                        </div>
                        <div className='col-md-8'>
                            <h6>Nước hoa hồng Essense Toner</h6>
                            <p style={{color:'red'}}>245,750đ</p>
                        </div>
                        <div className='km'>Mua 1 tặng 1</div>
                    </div>
                    </Link>
                    <a href='' className='hot-pro'>
                    <div className='row mt-4'>
                        <div className='col-md-4'>
                            <img src='https://product.hstatic.net/200000551679/product/untitled-10-04_ed106d043b904fbf888a081a504fc28a_large.jpg' style={{width:'100%'}}/>
                        </div>
                        <div className='col-md-8'>
                            <h6>Kem dưỡng ẩm Hidro Boost</h6>
                            <p style={{color:'red'}}>396,000đ</p>
                        </div>
                        <div className='km'>Mua 1 tặng 1</div>
                    </div>
                    </a>
                    <a href='' className='hot-pro'>
                    <div className='row mt-4'>
                        <div className='col-md-4'>
                            <img src='https://product.hstatic.net/200000551679/product/2_d9c68509a3084882951e9a2906bd2f77_large.png' style={{width:'100%'}}/>
                        </div>
                        <div className='col-md-8'>
                            <h6>Nước tẩy trang Purete</h6>
                            <p style={{color:'red'}}>39,000đ</p>
                        </div>
                        <div className='km'>Mua 1 tặng 1</div>
                    </div>
                    </a>
                    
                    
                </div>

                

            </div>
            <div className='row'>
                <div className='col-md-9'>
                    <h5 className='mt-4 ' style={{borderBottom:' 1px solid #000', padding:"20px 0"}}>Mô tả sản phẩm</h5>
                    <p>{product.product_dsc}</p>
                </div>
            </div>
        </div>
     );
}

export default Product_detail;