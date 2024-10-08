import './style.css'
import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import MyAddress from './MyAddress';
import VoucherForm from '../Voucher/VoucherForm';


function Pay() {
    
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormVisible1, setIsFormVisible1] = useState(false);
    const [receiver, setData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [carts, setCarts] = useState([]);
    const [carts_total, setcarts_total] = useState(0);
    const [category, setcategory] = useState(null);

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
       }, []);

        // receiver : lấy receiver mặc định và show các form như bên receiver
       useEffect(() => {       
          axios.get(`http://localhost:8000/api/users/${userId}/receivers/type`)
              .then(response => {
                  // Truy cập vào phần "data" của API trả về và đặt vào state
                  setData(response.data.data);
                  console.log(response.data.data)
              })
              .catch(error => {
                  console.error('Error fetching data: ', error);
              });
            
    }, [userId]);

    //sau khi render và các đói tượng cần thiết đc khởi tạo thì logic kiểm tra xem các sp này có cx 1 nhóm ko
    useEffect(()=>{
        if(carts.length>0){
            if(carts.length==1){
                setcategory(carts[0].product.category_id)
            }else{
                let firt_category = carts[0].product.category_id;
                carts.every(cart => cart.product.category_id == firt_category) ? setcategory(firt_category) : console.warn('các sản phẩm ko trùng nhóm nào cả');
            }
        }
    },[carts])

    const openForm = () => {
        
        setIsFormVisible(true);
      };
    
      // Đóng form
      const closeForm = () => {
        setIsFormVisible(false);
      };
      const openForm1 = () => {
        // setSelectedSupplierId(supplierId);
        setIsFormVisible1(true);
      };
    
      // Đóng form
      const closeForm1 = () => {
        setIsFormVisible1(false);
      };

    //hành động set lại receiver 
    const setReceiver = (receiver) =>{
        setData(receiver);
    }
    



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
                
                    {carts.map(item => (
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
                    ))}
                    
                </div>
                <div className="voucher" style={{padding:'20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{display:'flex'}}>
                    <img style={{width:'30px',height:'30px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIX6EDRHQ50N9bS7vXmD7tze7adcyO_bhsTg&s"></img>
                    <h5 style={{marginLeft:'8px',fontWeight:'400',marginRight:'20px'}}>EightStore Voucher của nhóm sản phẩm</h5>
                    <p style={{position:'relative'}}>giảm 10%
                    <button style={{border:'none',color:'red',position:'absolute',top:'-10px',background:'#fff'}}>X</button></p>
                </div>
                <button style={{border:'none', color:'blue'}} onClick={() => openForm1()}> Chọn voucher</button>
                {isFormVisible1 && (
                            <>
                                <div className="overlay"></div> 
                                <VoucherForm 
                                onClose={closeForm1}
                                getCategory={category}
                                />
                             </>
              
                            )}
                </div>
                <div className="row" style={{borderTop:'1px dashed #000', marginTop:'20px',borderBottom:'1px dashed #000'}}>
                    <div className="col-md-5 d-flex " style={{marginTop:'20px'}}>
                        <p style={{color:'#000'}}>Lời nhắn:</p>
                        <input placeholder="Lưu ý cho người bán" type="text" style={{width:'85%',height:'30px', marginLeft:'8px',outline:'none'}}></input>
                    </div>
                    <div className="col-md-7" style={{borderLeft:'1px dashed #000',paddingTop:'20px'}}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                            <p>Đơn vị vận chuyển:
                            <span style={{color:'#000',fontSize:'18px',marginLeft:'8px'}}> Vận chuyển nhanh</span></p>
                            <p>10.000Đ</p>
                        </div>
                    </div>
                </div>
                <div style={{textAlign:'right',marginTop:'12px'}}>
                    <p>Tổng số tiền :
                        <span style={{color:'red',marginLeft:'8px'}}>{carts_total}</span>
                    </p>
                </div>
            </div>
            
            {/* voucher */}
            <div className="voucher" style={{padding:'20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{display:'flex'}}>
                    <img style={{width:'30px',height:'30px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIX6EDRHQ50N9bS7vXmD7tze7adcyO_bhsTg&s"></img>
                    <h5 style={{marginLeft:'8px',fontWeight:'400',marginRight:'20px'}}>EightStore Voucher</h5>
                    <p style={{position:'relative'}}>giảm 10%
                    <button style={{border:'none',color:'red',position:'absolute',top:'-10px',background:'#fff'}}>X</button></p>
                </div>
                <button style={{border:'none', color:'blue'}}> Chọn voucher</button>
                {/* {isFormVisible1 && (
                            <>
                                <div className="overlay"></div> 
                                <VoucherForm onClose={closeForm1}  />
                             </>
              
                            )} */}
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
                            <div className="col-md-6">20000</div>
                        </div>
                        <div className="row pb-2">
                            <div className="col-md-6">Phí vận chuyển</div>
                            <div className="col-md-6">20000</div>
                        </div>
                        <div className="row pb-2">
                            <div className="col-md-6">Tổng thanh toán</div>
                            <div className="col-md-6" style={{color:'red', fontSize:'18px'}}>20000</div>
                        </div>
                    </div>

                </div>
                <div className="row" style={{padding:'12px 0',borderBottom:'1px dashed #000'}}>
                    <div className="col-md-9">Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản EightStore</div>
                    <div className="col-md-3 " style={{textAlign:'right'}}>
                        <button style={{border:'none', background:'red',width:'90%',height:'50px',color:'#fff'}}>Đặt hàng</button>
                    </div>

                </div>
            </div>
        </div>
     );
}

export default Pay;