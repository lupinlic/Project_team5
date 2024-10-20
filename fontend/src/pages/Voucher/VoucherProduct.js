import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { json } from 'react-router-dom';

const VoucherProduct =({onClose,getProduct_id,HandleVoucher,getImagePath}) =>{
    // lấy nhóm category và product_id
    const [Product_id,setProduct_id] = useState(null);

    // các voucher cần lưu trữ khi gọi từ api về
    const [VouchersOfProduct,setVouchersOfProduct] = useState([]);
    
    const [VoucherProductSelected,setVoucherProductSelected] = useState([]);
    // voucher gộp chung đã chọn của shop và category
    const [voucher_code,setvoucher_code] = useState(null);
    const [messageVoucher_code,setmessageVoucher_code] = useState('');
    

    // trạng thái
    const [isProductFetched, setIsProductFetched] = useState(false);


    useEffect(()=>{
        if(getProduct_id !== undefined && getProduct_id !== null){
            setProduct_id(getProduct_id);  
        }
    },[getProduct_id])
    //                          Hàm gọi api theo từng giá trị
        //1. product api này sẽ áp dụng riêng cho từng sản phẩm
    useEffect(()=>{
        if(Product_id !== null && Product_id !== undefined){
            axios.get(`http://localhost:8000/api/product/${Product_id}/productVouchers`)
              .then(response => {
                  // Truy cập vào phần "data" của API trả về và đặt vào state
                  if(response.data.data?.length>0){
                    setVouchersOfProduct(response.data.data);
                    setIsProductFetched(!isProductFetched);
                  }
              })
              .catch(error => {
                  console.error('Error fetching data: ', error);
              });
        }
    },[Product_id])
        // -- end th1: voucher product

    //  khi mới vào voucher tiến hành tích chọn cho sp ưu tiên đầu tiên
    useEffect(()=>{
        if(isProductFetched){
            let pasrsSession_prduct = JSON.parse(sessionStorage.getItem('VoucherOfProduct'));
            if(pasrsSession_prduct !== null && pasrsSession_prduct!==undefined){
                setVoucherProductSelected([pasrsSession_prduct[0]]);
            }else{
            setVoucherProductSelected([VouchersOfProduct[0]])
            HandleVoucher(VouchersOfProduct[0],Product_id,true);
            HandleSaveSession([VouchersOfProduct[0]],true)
            }

        }
    },[isProductFetched])

    //  tiến hành set state khi mà tích chọn vào 1 voucher nào đó
    const handleSelectVoucher = (voucher,set,select) => {
        if(select[0]?.voucher_id == voucher.voucher_id ){
            HandleVoucher(voucher,Product_id,false);
            HandleSaveSession(voucher,false)
            return set([]);
        }else{
            HandleVoucher(voucher,Product_id,true);
            HandleSaveSession(voucher,true)

            return set([voucher]);
        }
    }

    const HandleSaveSession = (voucher,isaddSession) =>{
        if(isProductFetched){
            isaddSession ? 
            sessionStorage.setItem('VoucherOfProduct',JSON.stringify([voucher]))
            : sessionStorage.setItem('VoucherOfProduct',JSON.stringify([]))
        }
    }

    //  khi lưu: lưu voucher vào trang chính pay và đóng form
    const handleSaveVoucher = () => {
        onClose(Product_id);
    }

    const SerchVoucher = () => {
        axios.post(`http://localhost:8000/api/product/${Product_id}/productVoucherByName`,{
            voucher_code:voucher_code
        })
              .then(response => {
                if(response.data.data?.length>0){
                    setVouchersOfProduct(response.data.data);
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
                        <h6>Voucher shop áp dụng cho sản phẩm:</h6>
                    
                    {VouchersOfProduct && VouchersOfProduct?.length >0
                    ? 
                    (

                        VouchersOfProduct.map(item => (
                            <div className='row' 
                            style={{ border: '1px solid', alignItems: 'center', marginBottom: '12px',cursor:'pointer' }} 
                            key={item?.voucher_id}
                            onClick={() => handleSelectVoucher(item,setVoucherProductSelected,VoucherProductSelected
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
                                        checked={VoucherProductSelected.some(voucher => voucher?.voucher_id==item?.voucher_id)}
                                        
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
                    <button type="button" className="btn btn-secondary"  onClick={()=>onClose(Product_id)}>Đóng</button>
                </div>
             </div>
        </div>
     );
}

export default VoucherProduct;