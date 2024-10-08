import React, { useState ,useEffect } from 'react';
import axios from 'axios';

const VoucherForm =({onClose,getProduct_id,getCategory_id}) =>{
    const [Category,setcategory] = useState(null);
    const [Product,setProduct] = useState(null);
    const [Vouchers,setVouchers] = useState([]);
    const [isVoucherFreeShip,setisVoucherFreeShip] = useState(false);

    //                          phần set các giá trị mặc định 
        // category ,product
    useEffect(()=>{
        if(getCategory_id!==undefined && getCategory_id !== null){
            setcategory(getCategory_id);  
        }
    },[getCategory_id])

    useEffect(()=>{
        if(getProduct_id!==undefined && getProduct_id !== null){
            setProduct(getProduct_id);  
        }
    },[getProduct_id])



    //                          Hàm gọi api theo từng giá trị
        //1. category
    useEffect(()=>{
        if(Product !== null && Product !== undefined){
            console.log('api_product');
            // đoạn này sẽ pai nối 
            //  1. nhóm category này đc các voucher nào áp dụng
            //  2.các voucher này pai thuộc user duy nhất và ở tr thái 0 (tức chưa sd)

            axios.get(`http://localhost:8000/api/product/${Product}/productVouchers`)
              .then(response => {
                  // Truy cập vào phần "data" của API trả về và đặt vào state
                  setProduct(response.data.data);
              })
              .catch(error => {
                  console.error('Error fetching data: ', error);
              });
        }
    },[Product])

    useEffect(()=>{
        
        console.log(Category);

        if(Category !== null && Category !== undefined){
            setisVoucherFreeShip(!isVoucherFreeShip);
            console.log('api_shop');

            // đoạn này sẽ pai nối 
            //  1. nhóm category này đc các voucher nào áp dụng
            //  2.các voucher này pai thuộc user duy nhất và ở tr thái 0 (tức chưa sd)

            axios.get(`http://localhost:8000/api/category/${Category}/categoryVouchers`)
              .then(response => {
                  // Truy cập vào phần "data" của API trả về và đặt vào state
                  setVouchers(response.data.data);
                  console.log(response.data.data)
              })
              .catch(error => {
                  console.error('Error fetching data: ', error);
              });
        }
    },[Category])


    //  nếu xây dựng thêm phân chia nếu là voucher của shop thì sẽ có free ship ở trên và các nhóm voucher khác dưới

    return ( 
        <div>
             <div className="form-popup" style={{padding:'20px'}}>
                <h5>Chọn EightStore Voucher</h5>
                <div className='row mt-4'>
                    <div className='col-md-3'>Mã Voucher </div>
                    <div className='col-md-6'>
                        <input type='text' placeholder='Mã EightStore Voucher' style={{marginLeft:'8px',border:'1px solid'}}></input>
                    </div>
                    <div className='col-md-3'>
                        <button >Áp dụng</button>
                    </div>
                </div>
                <div style={{overflowY: 'auto',overflowX: 'hidden',marginTop:'20px',height:'350px',marginBottom:'80px'}}>
                    <h6>Các voucher được áp dụng</h6> 
                    {isVoucherFreeShip ?
                    <div>
                        <p>Các voucher free ship</p>
                    </div>
                    
                    : <div></div>}
                    {Vouchers && Vouchers.length > 0 ? (
                        Vouchers.map(item => (
                            <div className='row' style={{ border: '1px solid', alignItems: 'center', marginBottom: '12px' }} key={item.voucher_id}>
                                <div className='col-md-4'>
                                    <img style={{ width: '100%', height: '100%' }} src='https://storage.googleapis.com/ops-shopee-files-live/live/shopee-blog/2024/03/96c7b0ba-1140x800-1.jpg' alt={`Voucher ${item.voucher_id}`} />
                                </div>
                                <div className='col-md-7'>
                                    <p>Giảm tối đa {item.voucher_maxDiscount}</p>
                                    <p>Đơn tối thiểu 0Đ</p>
                                </div>
                                <div className='col-md-1'>
                                    <input 
                                        type='checkbox' 
                                        //onChange={() => handleCheckboxChange(item.voucher_id)} // Hàm xử lý sự kiện khi checkbox thay đổi
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Không có voucher nào để hiển thị.</p> // Thông báo nếu không có vouchers
                    )}
                    
                </div>



                <div style={{position:'absolute',bottom:'4%',right:'4%'}}>
                    <button type="submit" className="btn btn-primary">Lưu</button>
                    <button type="button" className="btn btn-secondary"  onClick={()=>onClose(Product)}>Đóng</button>
                </div>
             </div>
        </div>
     );
}

export default VoucherForm;