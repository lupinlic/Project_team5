import './style.css'
import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import MyAddress from './MyAddress';
import VoucherForm from '../Voucher/VoucherForm';


function Pay() {
    
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormVisible_products, setisFormVisible_products] = useState([]);
    const [isFormVisible_shop, setIsFormVisible_shop] = useState(false);
    const [receiver, setData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [carts, setCarts] = useState([]);
    const [carts_total, setcarts_total] = useState(0);
    const [category, setcategory] = useState(null);
    const [Voucher_shop, setVoucher_shop] = useState([]);
    const [Voucher_freeship, setVoucher_freeship] = useState([]);
    const [Shipping_price, setShipping_price] = useState(30000);
    const [discountShipping, setdiscountShipping] = useState(0);
    const [discountTotal, setdiscountTotal] = useState(0);
    const [totalPayMent, settotalPayMent] = useState(0);
    const [ordercontent, setordercontent] = useState('');
    const [isfinishOrder, setisfinishOrder] = useState(false);


    //form thanh toán
    /**
     * 1.các đối tượng cần đc ưu tiên lấy trước
     *      user_id , receiver,Carts(cart này đc select từ bên mua hàng)
     * 
     */

     //   1.các đối tượng cần đc ưu tiên lấy trước
        // user_id
        useEffect(() => {
         const userData = localStorage.getItem('user');
         const carts_session = sessionStorage.getItem('Carts');
         const carts_total = sessionStorage.getItem('carts_total');
         
         const parsedUser = JSON.parse(userData);
         const parsedCarts = JSON.parse(carts_session);
         const parsedcarts_total = JSON.parse(carts_total);
         setUserId(parsedUser.user_id);
         setCarts(parsedCarts);
         setcarts_total(parsedcarts_total)

         settotalPayMent(carts_total-Shipping_price)
         ClearSession()
       }, []);

        // receiver : lấy receiver mặc định và show các form như bên receiver
       useEffect(() => {       
          axios.get(`http://localhost:8000/api/users/${userId}/receivers/type`)
              .then(response => {
                  // Truy cập vào phần "data" của API trả về và đặt vào state
                  setData(response.data.data);
              })
              .catch(error => {
                  console.error('Error fetching data: ', error);
              });
            
    }, [userId]);

    //sau khi render và các đói tượng cần thiết đc khởi tạo thì logic kiểm tra xem các sp này có cx 1 nhóm ko
    useEffect(()=>{
        if(carts?.length>0){
            if(carts?.length==1){
                setcategory(carts[0].product.category_id)
            }else{
                let firt_category = carts[0].product.category_id;
                carts.every(cart => cart.product.category_id == firt_category) ? setcategory(firt_category) : console.warn('các sản phẩm ko trùng nhóm nào cả');
            }
        }
    },[carts])

    const openFormProducts = (product_id) => {
        setisFormVisible_products((prevstate => ({
            ...prevstate,
            [product_id]:true,
        })));
      };
    
    //   Đóng form
      const closeFormProducts = (product_id) => {
        setisFormVisible_products((prevstate => ({
            ...prevstate,
            [product_id]:false,
        })));      
    };

      const openForm = () => {
        // setSelectedSupplierId(supplierId);
        setIsFormVisible(true);
      };
    
      // Đóng form
      const closeForm = () => {
        setIsFormVisible(false);
      };
      
      const openForm_shop = () => {
        setIsFormVisible_shop(true);
      };
    
      // Đóng form
      const closeForm_shop = () => {
        setIsFormVisible_shop(false);
      };


    //hành động set lại receiver 
    const setReceiver = (receiver) =>{
        setData(receiver);
    }
    

    const HandleSeveVoucher = (voucher,product_id,isCancelVoucher) => {
        if(isCancelVoucher){
            if(product_id!==null){
                HandleVoucherToProduct(voucher,product_id,isCancelVoucher)
            }else{
                handleVoucherToShopandShip(voucher,isCancelVoucher)
            }
        }else{
            HandleVoucherToProduct(voucher,product_id,isCancelVoucher)
            handleVoucherToShopandShip(voucher,isCancelVoucher)
        }
    }

    const HandleVoucherToProduct = (voucher,product_id,isCancelVoucher) =>{
        let cart = carts.map(item => {
                if (item.product.product_id === product_id) {
                    // Thêm voucher vào object
                    if(isCancelVoucher){
                    return {
                        ...item,
                        voucher: voucher,
                        discount_product : handelVoucher_Type(voucher,item.product.product_price*item.cart_quantity)
                    };

                    }else{
                        let {voucher,discount_product,...rest} = item;
                    return {
                        ...rest
                    };

                    }
                }
                return item;
            });
        setCarts(cart)
    }

    const handleVoucherToShopandShip = (voucher,isCancelVoucher) => {
        switch(voucher.voucherGroup_id){
            case 1:
                if(isCancelVoucher){
                    setVoucher_freeship({...voucher,Voucher_freeship : handelVoucher_Type(voucher,carts_total)});
                    break; 
                }
                setVoucher_freeship({})
                break;
            case 2:
                if(isCancelVoucher){
                    setVoucher_shop({...voucher,Voucher_shop : handelVoucher_Type(voucher,carts_total)}) 
                    break; 
                }
                setVoucher_shop({}) 
                break;
            default:
                console.warn('có lỗi trong việc lưu state voucher');
                break;
        }
    }

    const handelVoucher_Type = (voucher,money) => {
        if(voucher.voucher_minOrder <= money){
            if(voucher.voucher_type == 0){
                return voucher.voucher_discount; 
            }else{
                if((voucher.voucher_discount*money)/100 >= voucher.voucher_maxDiscount){
                    return voucher.voucher_maxDiscount;
                }
                return (voucher.voucher_discount*money)/100;
            }
        }
    }

    const ClearSession = () => {
        sessionStorage.removeItem('VoucherOfProduct');
        sessionStorage.removeItem('VoucherOfShip');
        sessionStorage.removeItem('VoucherOfShop');
    }

    useEffect(() =>{
        if(Voucher_freeship?.voucher_id){
            setdiscountShipping(handelVoucher_Type(Voucher_freeship,Shipping_price));
        }
    },[Voucher_freeship])

    useEffect(()=>{
        let totalDiscount = carts.reduce((total, item) => total + (item.discount_product || 0), 0);
        let voucher_shop = Voucher_shop.Voucher_shop ? Voucher_shop.Voucher_shop:0;
        setdiscountTotal(totalDiscount+voucher_shop);
    },[carts,Voucher_shop]);


    useEffect(()=>{
        if(discountTotal>0 || discountShipping>0){
            settotalPayMent(carts_total+Shipping_price-discountShipping-discountTotal);
        }
    },[discountTotal,discountShipping])

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, nên cần cộng 1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
      
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const HandleOrder = () => {
        let order = {
            order_date: formatDate(new Date()),       // Lấy timestamp hiện tại
            order_status: 0,              // Trạng thái đơn hàng
            order_totalmoney: totalPayMent, // Tổng tiền
            user_id: userId,              // ID người dùng
            order_content: ordercontent,  // Nội dung đơn hàng
            receiver_id: receiver[0].receiver_id, // ID người nhận
            shipping_id: 1                // ID phương thức giao hàng
        };
        axios.post(`http://localhost:8000/api/orders`,
            order
        )
        .then(response => {
            HandleOrderDetail(response.data.data.order_id);
            HandleDeleteCart();
            setisfinishOrder(!isfinishOrder);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }


    const HandleOrderDetail = (order_id) => {
        carts.map(cart=>{
            axios.post(`http://localhost:8000/api/orderDetails`,
                {
                    product_id : cart.product.product_id,
                    order_id : order_id,
                    orderDetail_quantity : cart.cart_quantity,
                    orderDetail_total : cart.cart_totalmoney,
                }
            )
            .then(response => {
                console.log('đã lưu vào ls đơn hàng chi tiết')
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
        })
    }

    const HandleDeleteCart = () => {
        carts.map(cart=>{
            axios.delete(`http://localhost:8000/api/carts/${cart.cart_id}`)
            .then(response => {
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
        })
    }

    useEffect(()=>{
        if(isfinishOrder){
            sessionStorage.clear();
        }
    },[isfinishOrder])


    // phần return giao diện
    return ( 
        <div style={{margin:'20px 0'}}>
            <div style={{padding:'12px'}}>
                <h5 style={{color:'red',fontWeight:'400',fontSize:'24px',marginBottom:'8px'}}>Địa chỉ nhận hàng</h5>
                {receiver.map(item => (
                <div className="row">
                    <div className="col-md-3" >
                        <h6>
                            <span style={{marginRight:'8px',fontSize:'18px'}}>{item.receiver_name}</span>
                            <span>{item.receiver_phone}</span>
                        </h6>
                    </div>
                    <div className="col-md-6">
                        <p style={{fontSize:'18px'}}>{item.receiver_dsc}, {item.receiver_commune}, {item.receiver_district}, {item.receiver_city}</p>
                    </div>
                    <div className="col-md-3">
                        <button style={{border:'none', color:'blue'}} onClick={() => openForm()}>Thay đổi</button>
                       
                            {/* Lớp overlay */}
                            {isFormVisible && (
                            <>
                                <div className="overlay"></div> 
                                <MyAddress 
                                onClose={closeForm}
                                setReceiver={setReceiver}
                                />
                             </>
              
                            )}
                       
                    </div>
                </div>
                ))}

            </div>
            {/* ,backgroundColor:'#eaf6fa' */}
            <div style={{marginTop:'12px',padding:'20px'}}>
                <div>
                    <div className="row">
                            <div className="col-6">
                                <p style={{fontSize:'18px'}}>Sản phẩm</p>
                            </div>
                            <div className="col-2">
                                <p style={{float: 'right',color:'#62677399'}}>Đơn giá</p>
                            </div>
                            <div className="col-2">
                                <p style={{float: 'right',color:'#62677399'}}>Số lượng</p>
                            </div>
                            <div className="col-2">
                                <p style={{float: 'right',color:'#62677399'}}>Thành tiền</p>
                            </div>
                    </div>
                
                    {carts?.map(item => (
                        <>
                        <div className="row" key={item.cart_id}>
                            <div className="col-6" style={{display:'flex'}}>
                                <img style={{width:'50px',height:'50px',marginLeft:'12px'}} src={item.product.product_img}></img>
                                <p style={{fontSize:'18px',marginLeft:'12px'}}>{item.product.product_name}</p>
                            </div>
                            <div className="col-2">
                                <p style={{float: 'right',color:'#62677399'}}>{item.product.product_price}</p>
                            </div>
                            <div className="col-2">
                                <p style={{float: 'right',color:'#62677399'}}>{item.cart_quantity}</p>
                            </div>
                            <div className="col-2">
                                <p style={{float: 'right',color:'#62677399'}}>{item.product.product_price*item.cart_quantity}</p>
                            </div>
                        </div>
                        <div className="voucher" style={{padding:'20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <div style={{display:'flex'}}>
                            <img style={{width:'30px',height:'30px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIX6EDRHQ50N9bS7vXmD7tze7adcyO_bhsTg&s"></img>
                            <h5 style={{marginLeft:'8px',fontWeight:'400',marginRight:'23px'}}>EightStore Voucher sản phẩm</h5>
                            <p style={{position:'relative'}}>
                                {item.voucher? 'giảm '+ item.discount_product +'VNĐ':'' }
                            <button style={{border:'none',color:'red',position:'absolute',top:'-10px',background:'#fff'}}>X</button></p>
                        </div>
                        <button style={{border:'none', color:'blue'}} onClick={() => openFormProducts(item.product.product_id)}> Chọn voucher</button>
                        {isFormVisible_products[item.product.product_id] && (
                                    <>
                                        <div className="overlay"></div> 
                                        <VoucherForm 
                                        onClose={closeFormProducts}
                                        getProduct_id={item.product.product_id}
                                        getCategory_id={null}
                                        HandleVoucher={HandleSeveVoucher}
                                        />
                                    </>
                    
                                    )}
                        </div>
                        <div style={{textAlign:'right',marginTop:'12px'}}>
                            <p>Tổng số tiền (1 sản phẩm) :
                                <span style={{color:'red',marginLeft:'8px'}}>
                                    {item.voucher 
                                    ?
                                    item.product.product_price*item.cart_quantity-handelVoucher_Type(item.voucher,item.product.product_price*item.cart_quantity)
                                    :
                                    item.product.product_price*item.cart_quantity}
                                </span>
                            </p>
                        </div>
                        </>
                    ))}
                    
                </div>
                
                <div className="row" style={{borderTop:'1px dashed #000', marginTop:'20px',borderBottom:'1px dashed #000'}}>
                    <div className="col-md-5 d-flex " style={{marginTop:'20px'}}>
                        <p style={{color:'#000'}}>Lời nhắn:</p>
                        <input placeholder="Lưu ý cho người bán" type="text" style={{width:'85%',height:'30px', marginLeft:'8px',outline:'none'}}
                        value={ordercontent}
                        onChange={(e)=>setordercontent(e.target.value)}
                        >
                        </input>
                    </div>
                    <div className="col-md-7" style={{borderLeft:'1px dashed #000',paddingTop:'20px'}}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                            <p>Đơn vị vận chuyển:
                            <span style={{color:'#000',fontSize:'18px',marginLeft:'8px'}}> Vận chuyển nhanh</span></p>
                            <p>{Shipping_price}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* voucher */}
            <div className="voucher" style={{padding:'20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{display:'flex'}}>
                    <img style={{width:'30px',height:'30px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIX6EDRHQ50N9bS7vXmD7tze7adcyO_bhsTg&s"></img>
                    <h5 style={{marginLeft:'8px',fontWeight:'400',marginRight:'20px'}}>EightStore Voucher</h5>
                    <p style={{position:'relative'}}>
                        
                        {Voucher_shop.voucher_id ? 'giảm ' + handelVoucher_Type(Voucher_shop,carts_total)+'VNĐ':'' }

                        <span style={{marginLeft:'8px'}}>

                        {Voucher_freeship.voucher_id ? 'free ship':'' }

                        </span>
                    <button style={{border:'none',color:'red',position:'absolute',top:'-10px',background:'#fff'}}>X</button></p>
                </div>
                <button style={{border:'none', color:'blue'}} onClick={() => openForm_shop()}> Chọn voucher</button>
                {isFormVisible_shop && (
                            <>
                                <div className="overlay"></div> 
                                <VoucherForm 
                                onClose={closeForm_shop}
                                getProduct_id={null}
                                getCategory_id={category}  
                                HandleVoucher={HandleSeveVoucher}
                                />
                             </>
              
                            )}
            </div>

            {/*  */}
            <div style={{margin:'20px 0'}}>
                <h5>Phương thức thanh toán: <span style={{fontSize:'18px',color:'red'}}>Thanh toán khi nhận hàng</span></h5>
                <p style={{padding:'12px',borderBottom:'1px dashed #000',borderTop:'1px dashed #000'}}>Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu hộ.</p>
                <div className="row" style={{padding:'12px 0',borderBottom:'1px dashed #000'}}>
                    <div className="col-md-9"></div>
                    <div className="col-md-3 " style={{textAlign:'right'}}>
                        <div className="row pb-2">
                            <div className="col-md-6">Tổng tiền hàng</div>
                            <div className="col-md-6">{carts_total}</div>
                        </div>
                        <div className="row pb-2">
                            <div className="col-md-6">Phí vận chuyển</div>
                            <div className="col-md-6">{Shipping_price}</div>
                        </div>
                        {Voucher_freeship.voucher_id ?
                         <div className="row pb-2">
                         <div className="col-md-6">Giảm giá phí vận chuyển</div>
                         <div className="col-md-6">{discountShipping}</div>
                        </div>
                        :''}
                        
                        {discountTotal >0 ?
                         <div className="row pb-2">
                         <div className="col-md-6">Tổng voucher giảm</div>
                         <div className="col-md-6">{discountTotal}</div>
                        </div>
                        :''}
                        <div className="row pb-2">
                            <div className="col-md-6">Tổng thanh toán</div>
                            <div className="col-md-6" style={{color:'red', fontSize:'18px'}}>{totalPayMent}</div>
                        </div>
                    </div>

                </div>
                <div className="row" style={{padding:'12px 0',borderBottom:'1px dashed #000'}}>
                    <div className="col-md-9">Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản EightStore</div>
                    <div className="col-md-3 " style={{textAlign:'right'}}>
                        <button 
                        style={{border:'none', background:'red',width:'90%',height:'50px',color:'#fff'}}
                        onClick={()=>HandleOrder()}
                        >Đặt hàng</button>
                    </div>

                </div>
            </div>
        </div>
     );
}

export default Pay;