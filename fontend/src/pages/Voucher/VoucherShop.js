import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { json } from 'react-router-dom';

const VoucherShop =({onClose,getCategory_id,HandleVoucher,getImagePath}) =>{
    // lấy nhóm category và product_id
    const [Category,setcategory] = useState(null);

    // các voucher cần lưu trữ khi gọi từ api về
    const [VouchersOfCategory,setVouchersOfCategory] = useState([]);
    const [VouchersOfShop,setVouchersOfShop] = useState([]);
    const [VouchersOfShip,setVouchersOfShip] = useState([]);
    
    //  voucher tổng hợp từ các voucher được gọi từ api
    const [Vouchers_Finish,setVouchers_Finish] = useState([]);
    //voucher đc chọn ra từ người dùng
    const [VoucherShipSelected,setVoucherShipSelected] = useState([]);
    const [VoucherShopSelected,setVoucherShopSelected] = useState([]);
    // voucher gộp chung đã chọn của shop và category
    const [VoucherFinishSelected,setVoucherFinishSelected] = useState([]);
    const [voucher_code,setvoucher_code] = useState(null);
    const [messageVoucher_code,setmessageVoucher_code] = useState(null);
    

    // trạng thái
    const [isCategoryFetched, setIsCategoryFetched] = useState(false);
    const [isVouchersOfShopFetched, setIsVouchersOfShopFetched] = useState(false);
    const [isVouchersOfShipFetched, setIsVouchersOfShipFetched] = useState(false);

    //                          phần set các giá trị mặc định 
        // category ,product
    useEffect(()=>{
        if(getCategory_id!==undefined && getCategory_id !== null){
            setcategory(getCategory_id);  
        }
    },[getCategory_id])

        //2.thuộc th của shop lấy các voucher : ship,shop,category

            //voucher category
    useEffect(()=>{
        if(Category !== null && Category !== undefined){
            axios.get(`http://localhost:8000/api/category/${Category}/categoryVouchers`)
              .then(response => {
                  // Truy cập vào phần "data" của API trả về và đặt vào state
                  if(response.data.data?.length>0){
                      setVouchersOfCategory(response.data.data);
                  }
                  setIsCategoryFetched(!isCategoryFetched);
              })
              .catch(error => {
                  console.error('Error fetching data: ', error);
              });
        }
    },[Category])

            //voucher shop
        useEffect(()=>{
            if(Category !== null && Category !== undefined){
                axios.get(`http://localhost:8000/api/voucherGroup/vouchersOfGroupShop`)
                  .then(response => {
                    if(response.data.data.length>0){
                        setVouchersOfShop(response.data.data);
                    }
                    setIsVouchersOfShopFetched(!isVouchersOfShopFetched);
                  })
                  .catch(error => {
                      console.error('Error fetching data: ', error);
                  });
            }
        },[Category])

            //voucher ship
    useEffect(()=>{
        if(Category !== null && Category !== undefined){
            axios.get(`http://localhost:8000/api/voucherGroup/vouchersOfShip`)
              .then(response => {
                if(response.data.data.length>0){
                    setVouchersOfShip(response.data.data);
                }
                  setIsVouchersOfShipFetched(!isVouchersOfShipFetched);

              })
              .catch(error => {
                  console.error('Error fetching data: ', error);
              });
        }
    },[Category])
        
        // finish kết thúc voucher của shop 

    // tiến hành tổng hợp các voucher nếu thuộc nhóm voucher shop
    useEffect(()=>{
        if(isVouchersOfShopFetched && isCategoryFetched){
            let vouchers = [...VouchersOfShop,...VouchersOfCategory];

            setVouchers_Finish(vouchers);
        }
    },[isVouchersOfShopFetched,isCategoryFetched])
    //  finish gom voucher

    useEffect(()=>{
        if(isVouchersOfShipFetched){
            let pasrsSession_ship = JSON.parse(sessionStorage.getItem('VoucherOfShip'));
            if(pasrsSession_ship !== null && pasrsSession_ship!==undefined){
                setVoucherShipSelected([pasrsSession_ship[0]]);
            }else{
            setVoucherShipSelected([VouchersOfShip[0]]);
            HandleVoucher(VouchersOfShip[0],null,true);
            HandleSaveSession(VouchersOfShip[0],true)
            }
        }
    },[isVouchersOfShipFetched])

    useEffect(()=>{
        if(Vouchers_Finish.length>0){
            let pasrsSession_shop = JSON.parse(sessionStorage.getItem('VoucherOfShop'));
            if(pasrsSession_shop !== null && pasrsSession_shop!==undefined){
                setVoucherFinishSelected([pasrsSession_shop[0]]);
            }else{
                setVoucherFinishSelected([Vouchers_Finish[0]]);
                HandleVoucher(Vouchers_Finish[0],null,true);
                HandleSaveSession(Vouchers_Finish[0],true);
            }
            
        }
    },[Vouchers_Finish])

    //  tiến hành set state khi mà tích chọn vào 1 voucher nào đó
    const handleSelectVoucher = (voucher,set,select) => {
        if(select[0]?.voucher_id == voucher.voucher_id ){
            HandleVoucher(voucher,null,false);
            HandleSaveSession(voucher,false)
            return set([]);
        }else{
            HandleVoucher(voucher,null,true);
            HandleSaveSession(voucher,true)

            return set([voucher]);
        }
    }

    const HandleSaveSession = (voucher,isaddSession) =>{
            if(isaddSession){
                voucher.voucherGroup_id == 1 ?
                sessionStorage.setItem('VoucherOfShip',JSON.stringify([voucher]))
                :
                sessionStorage.setItem('VoucherOfShop',JSON.stringify([voucher]))
            }else{
                voucher.voucherGroup_id == 1 ?
                sessionStorage.setItem('VoucherOfShip',JSON.stringify([]))
                :
                sessionStorage.setItem('VoucherOfShop',JSON.stringify([]))
            }
    }

    //  khi lưu: lưu voucher vào trang chính pay và đóng form
    const handleSaveVoucher = () => {
        onClose();
    }

    const SerchVoucher = () => {
        axios.post(`http://localhost:8000/api/voucherGroup/vouchersOfGroupShopByName`,{
            voucher_code:voucher_code
        })
              .then(response => {
                if(response.data.data?.length>0){
                    setVouchers_Finish(response.data.data);
                    console.log(response.data.data)
                    setmessageVoucher_code('');
                }else{
                    setmessageVoucher_code('không có mã voucher này');
                }
              })
              .catch(error => {
                  console.error('Error fetching data: ', error);
              });
    }

    return ( 
        <div>
             <div className="form-popup" style={{padding:'20px'}}>
                <h5>Chọn EightStore Voucher</h5>
                <div className='row mt-4'>
                    <div className='col-md-3 col-4'>Mã Voucher </div>
                    <div className='col-md-6 col-8'>
                        <input type='text' placeholder='Mã EightStore Voucher' style={{marginLeft:'8px',border:'1px solid'}}
                        value={voucher_code}
                        onChange={(e)=>setvoucher_code(e.target.value)}
                        ></input>
                    </div>
                    <div className='col-md-3 col-12'>
                        <button 
                        onClick={()=>SerchVoucher()}
                        >Áp dụng</button>
                    </div>
                </div>
                <p>{messageVoucher_code}</p>
                <div style={{overflowY: 'auto',overflowX: 'hidden',marginTop:'20px',height:'350px',marginBottom:'80px'}}>
                    <h6>Các voucher được áp dụng</h6> 
                    {/*     voucher thuộc nhóm free ship  */}
                    <>
                    <h6>Voucher Free Ship:</h6> 
                    <div>
                        {VouchersOfShip && VouchersOfShip.length > 0 ? 
                    (
                        VouchersOfShip.map(item => (
                            <div className='row' 
                            style={{ border: '1px solid', alignItems: 'center', marginBottom: '12px',cursor:'pointer' }} 
                            key={item?.voucher_id}
                            onClick={() => handleSelectVoucher(item,setVoucherShipSelected,VoucherShipSelected)}
                            >
                                <div className='col-md-4 col-4'>
                                    <img style={{ width: '80%', height: '80%' }} src={`http://localhost:8000/uploads/VoucherGroup/${item.voucherGroup_img}`} alt={`Voucher ${item.voucher_id}`} />
                                </div>
                                <div className='col-md-7 col-7'>
                                    <p>Giảm {item.voucher_discount} VNĐ</p>
                                    <p>Đơn tối thiểu 0Đ</p>
                                    <p>Giảm tối đa: {item.voucher_maxDiscount}</p>
                                </div>
                                <div className='col-md-1 col-1'>
                                    <input 
                                        type='radio' name='selectVoucherShip'
                                        checked={VoucherShipSelected.some(voucher => voucher?.voucher_id==item?.voucher_id)}
                                         // Hàm xử lý sự kiện khi checkbox thay đổi
                                    />
                                </div>
                            </div>
                        ))
                    ) 
                    : (
                        <p>Không có voucher nào để hiển thị.</p> // Thông báo nếu không có vouchers
                    )}
                    </div>
                    </>
                        <h6>Voucher shop:</h6>
                    
                    {Vouchers_Finish && Vouchers_Finish.length > 0 ? 
                    (

                        Vouchers_Finish.map(item => (
                            <div className='row' 
                            style={{ border: '1px solid', alignItems: 'center', marginBottom: '12px',cursor:'pointer' }} 
                            key={item?.voucher_id}
                            onClick={() => handleSelectVoucher(item,setVoucherFinishSelected,VoucherFinishSelected
                            )}
                            >
                                <div className='col-md-4'>
                                    <img style={{ width: '80%', height: '80%' }} src={`http://localhost:8000/uploads/VoucherGroup/${item.voucherGroup_img}`} alt={`Voucher ${item.voucher_id}`} />
                                </div>
                                <div className='col-md-7'>
                                    <p>Giảm {item.voucher_discount} VNĐ</p>
                                    <p>Đơn tối thiểu 0Đ</p>
                                    <p>Giảm tối đa: {item.voucher_maxDiscount}</p>
                                </div>
                                <div className='col-md-1'>
                                    <input 
                                        type='radio' name='selectVoucher'
                                        checked={VoucherFinishSelected.some(voucher => voucher?.voucher_id==item?.voucher_id)}
                                        
                                    />
                                </div>
                            </div>
                        ))
                    ) 
                    : (
                        <p>Không có voucher nào để hiển thị.</p> // Thông báo nếu không có vouchers
                    )}
                    
                </div>



                <div style={{position:'absolute',bottom:'4%',right:'4%'}}>
                    <button type="submit" className="btn btn-primary" onClick={() => handleSaveVoucher()}>Lưu</button>
                    <button type="button" className="btn btn-secondary"  onClick={()=>onClose()}>Đóng</button>
                </div>
             </div>
        </div>
     );
}

export default VoucherShop;