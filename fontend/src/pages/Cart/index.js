import React, { useState ,useEffect } from 'react';
import {Link  } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const [carts, setData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [products, setProducts] = useState([]);
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
            parsedSelectCart.length==carts.length ? setischeckProductAll(true) : setischeckProductAll(false);         
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
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
      };

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
        let carts_coppy=null;
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
        let sumtotal = list_price.reduce((sum,value)=>sum + value,0)
        return sumtotal;
    }

    const handleSelectAll = (event) => {
        setischeckProductAll(true);

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
                            <div className="col-2">
                                <div style={{float: 'left'}}>
                                <input type='checkbox' name='' id='selectAllCarts' 
                                checked={ischeckProductAll}
                                onClick={(e)=>handleSelectAll(e)}
                                ></input>
                                <span>--Chọn tất cả</span>  
                                </div>
                            </div>
                            <div className="col-3">
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

                        {/* renderCarts */}

                        {carts && carts.length > 0 ? carts.map(item => (
                        <div className="row" style={{borderBottom: '1px solid darkgrey',padding:'12px 0'}} key={item.id}>
                            <div className="col-2">
                                <input type='checkbox' name='' id='cart_check' 
                                onChange={(e)=>HandleSelectCarts(item,e)}
                                checked={selectProducts.some(cart=>cart.cart_id==item.cart_id)}
                                ></input>
                            </div>
                            <div className="col-3">
                                <p>{shortenText(getProductName(item.product_id),50)}</p>
                            </div>
                            <div className="col-2">
                                <p style={{float: 'right'}}>{getProductPrice(item.product_id)}</p>
                            </div>
                            <div className="col-2">
                                <div style={{float: 'right'}}>
                                <button style={{marginRight: '5px'}} onClick={()=> HandleUpdateCartQuantity('-',item)}>- </button>
                                <input 
                                type='text' name='cart_quantity' 
                                value={item.cart_quantity} style={{width: '40px'}}
                                onChange={(e)=>HandleOnchange(e,item.cart_id)}
                                onBlur={(e)=>HandleUpdateCartQuantity(1,item,e)}
                                ></input>
                                <button style={{marginLeft: '5px'}} onClick={()=> HandleUpdateCartQuantity('+',item)}> +</button>
                                </div>
                            </div>
                            <div className="col-2">
                                <p style={{float: 'right'}}>{item.cart_totalmoney}</p>
                            </div>
                            <div className="col-1">
                                <button style={{float: 'right',color:'red',border:'none'}} 
                                onClick={() => deleteProduct(item.cart_id)}
                                >xóa</button>
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
                            <p style={{float: 'right', fontWeight: 500}} className="cart_sosp">{selectProducts.length}</p>
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
                            <p style={{color: '#fa7551', float: 'right'}} className="cart_tongcong">
                                {HandleTotalMoney()}
                            </p>
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