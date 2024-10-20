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

    const [selectProducts, setSelectProducts] = useState([]);
    const [ischeckProductAll, setischeckProductAll] = useState(false); // Theo dõi trạng thái chỉnh sửa



    const userData = localStorage.getItem('user');
    
    useEffect(() => {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser.user_id) {
            setUserId(parsedUser.user_id);
        }
    },[userData]); // Thêm userData vào dependency để theo dõi
    
    const parsedSelectCart = JSON.parse(sessionStorage.getItem('Carts'));
    useEffect(()=>{
        if(parsedSelectCart){
            setSelectProducts(parsedSelectCart);
            parsedSelectCart?.length==carts?.length ? setischeckProductAll(true) : setischeckProductAll(false);         
        }
    },[carts])

    const HandleGetCarts = () => {

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
    };

    useEffect(()=>{
        HandleGetCarts();
    },[userId])

    
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

      const deleteProduct = (cartId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?')) {
          axios.delete(`http://localhost:8000/api/carts/${cartId}`)
            .then(response => {
                HandleGetCarts(); // Cập nhật lại danh sách sau khi xóa
            })
        }
      };
      const shortenText = (text, maxLength) => {
        return text?.length > maxLength ? text.substring(0, maxLength) + '...' : text;
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
          return `http://localhost:8000/uploads/Categories/${categoryName}/${productImg}`;
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
        // lấy 12sanr phẩm
        const displayedProducts = products.slice(0, 12);
      


        
      const HandleUpdateCartQuantity = (operator,cart,event)=> {
        let new_quantity=0;
        if(operator=='-'){
            //nếu là th - thì gọi api update giá trị trừ 1 vào và update lại giá mới
            new_quantity = (cart.cart_quantity-1);
        }else if(operator=='+'){
            //nếu là th - thì gọi api update giá trị trừ 1 vào và update lại giá mới
            new_quantity = (cart.cart_quantity+1);
        }else{
            new_quantity = event.target.value;
        }
        let newtotal = new_quantity*(cart.product.product_price);
            axios.put(`http://localhost:8000/api/carts/${cart.cart_id}`, {
                user_id : userId,
                product_id : cart.product_id,
                cart_quantity : new_quantity,
                cart_totalmoney : newtotal,
            })
            .then(response=>{
                HandleGetCarts();
            })
            .catch(error=>{
                console.error('lỗi từ server')
            })
      }

      const HandleOnchange = (event,cart_id) => {
        // khi onchange vào input thì cần pai thay đổi state thì nó ms hiển thị nhìn thấy đc
        if(isNaN(event.target.value) || event.target.value === ""){
            event.target.value = "1";
        }
        let carts_coppy = [...carts];

        carts_coppy.forEach(cart => {
            if(cart.cart_id==cart_id){
                let pasint_quantity = parseInt(event.target.value)
                cart.cart_quantity = pasint_quantity;
            }
        });
        setData(carts_coppy);
    };

    const HandleSelectCarts = (cart,event) => {
        //kiểm tra nếu nd click vào thì sẽ set thêm vào mảng
        let carts_coppy=[];
        if(event.target.checked){
            carts_coppy = [...selectProducts,cart];
            setSelectProducts(carts_coppy);
        }else{
        //còn nếu nd mà hủy bỏ click thì đơn giản là xóa cái cart đó khỏi mảng
            carts_coppy = selectProducts.filter(product => product.cart_id !== cart.cart_id)
            console.log(carts_coppy)
            setSelectProducts(carts_coppy);
        }
        if(carts_coppy.length==carts.length){
            setischeckProductAll(true);
        }else{
            setischeckProductAll(false);
        }
        HandleTotalMoney();
        saveSessionCart(carts_coppy);
    };

    const HandleTotalMoney = () => {
        let list_price = selectProducts.map(cart => cart.cart_totalmoney);
        let sumtotal = list_price.reduce((sum,value)=>sum + value,0);
        sessionStorage.setItem('carts_total',sumtotal);
        return sumtotal;
    }

    const handleSelectAll = (event) => {
        setischeckProductAll(!ischeckProductAll);

        let carts_coppy=[];
        if(event.target.checked){
            carts_coppy = [...carts];
            setSelectProducts(carts_coppy);
        }else{
            setSelectProducts([]);
        }
        saveSessionCart(carts_coppy)
    }

    const saveSessionCart = (carts_coppy) =>{
        sessionStorage.setItem('Carts',JSON.stringify(carts_coppy));
    }


    return ( 
            <div style={{margin:'20px 0'}} className='container'>
                <p style={{color: 'darkgrey'}}>Trang chủ &gt; Giỏ hàng</p>   
                <div className='row' style={{height:'50px', backgroundColor:'rgb(254, 223, 249)', alignItems:'center'}}>
                    <div className='col-md-6'>
                        <input type='checkbox' style={{margin:'0 8px'}} checked={ischeckProductAll} onClick={(e)=>handleSelectAll(e)} ></input>
                        Sản Phẩm
                    </div>
                    <div className='col-md-2 d-none d-md-block'>Đơn giá</div>
                    <div className='col-md-2 d-none d-md-block'>Số lượng</div>
                    <div className='col-md-1 d-none d-md-block'>Tổng tiền</div>
                    <div className='col-md-1 d-none d-md-block'>Thao tác</div>
                </div>
                <div className='product-list'>
                {carts && carts?.length > 0 ? carts.map(item => (  
                    <div style={{margin:'20px 0', boxShadow:'0 -4px 10px rgba(0, 0, 0, 0.1)'}}>
                        <div className='row mt-4 pb-2' style={{height:'120px', alignItems:'center',borderBottom:'1px solid rgb(210, 209, 210)'}}>
                            <div className='col-md-6 d-flex align-items-center col-12'>
                                <input id='cart_check' type='checkbox' style={{margin:'0 8px'}}  onChange={(e)=>HandleSelectCarts(item,e)}
                                    checked={selectProducts.some(cart=>cart.cart_id==item.cart_id)}></input>
                                <img src={getImagePath(item.product.category_id, item.product.product_img)} style={{width:'60px',height:'80px',margin:'4px 8px'}}/>
                                <h6>{shortenText(getProductName(item.product_id),30)}</h6>
                            </div>
                            <div className='col-md-2 col-4'>{getProductPrice(item.product_id)}</div>
                            <div className='col-md-2 d-flex col-6'> 
                                    <button style={{border:'none'}} onClick={()=> HandleUpdateCartQuantity('-',item)}>-</button>
                                    <input type='text' name='cart_quantity' 
                                        value={item.cart_quantity} style={{width: '40px'}}
                                        onChange={(e)=>HandleOnchange(e,item.cart_id)}
                                        onBlur={(e)=>HandleUpdateCartQuantity(1,item,e)}/>
                                    <button style={{border:'none'}} onClick={()=> HandleUpdateCartQuantity('+',item)} >+</button>
                            </div>
                            <div className='col-md-1 d-none d-md-block'>{item.cart_totalmoney}</div>
                            <div className='col-md-1 col-2'><button style={{border:'none', color:'red'}} onClick={() => deleteProduct(item.cart_id)}>Xóa</button></div>
                        </div>
                        <div style={{height:'50px', padding:'20px 0',borderBottom:'1px solid rgb(210, 209, 210)'}} className='d-none d-md-block'>
                            <img style={{width:"30px", height:'30px'}} src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/d9e992985b18d96aab90.png'/>
                            Giảm ₫300.000 phí vận chuyển đơn tối thiểu ₫0; Giảm ₫500.000 phí vận chuyển đơn tối thiểu ₫500.000
                        </div>
                    </div>
                )) : <p>Chưa có sản phẩm nào đc mua.</p> }

                
                </div>
            {/* mua hàng */}
            <div className={ isFixed ? "fixed-checkout-bar bar" : "static-checkout-bar bar"}>
                    <div className='col-md-6 d-none d-md-block' >
                        <div className='d-flex align-items-center' style={{margin:'0 12px'}}>
                            <input type='checkbox' style={{margin:'0  16px 12px 16px'}} checked={ischeckProductAll} onClick={(e)=>handleSelectAll(e)}></input>
                            <p style={{marginRight:'20px'}} className='d-none d-md-block'>Chọn tất cả</p>
                            <p>Xóa</p>
                        </div>
                    </div>
                    <div className='col-md-4 col-6'>
                        <p className='d-flex'>
                            <span className='d-block d-md-none' style={{marginLeft:'8px'}}>Tổng( {selectProducts?.length} sp):</span>
                            <span className='d-none d-md-block'>Tổng thanh toán( {selectProducts?.length} sản phẩm): </span>
                            <span style={{color:'red'}}>{HandleTotalMoney()}</span>
                        </p>
                    </div>
                    <div className='col-md-2 col-6'>
                        <Link to='/pay' >
                            <button style={{height:'40px', width:'80%', color:'#fff', border:'none'}}>Mua hàng</button>
                        </Link>
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
                    <div className='col-md-2 p-1 col-6' key={product.id}>
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