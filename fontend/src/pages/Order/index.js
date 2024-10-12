import './style.css'
import {Link  } from 'react-router-dom';
function Order() {
    return (  
        <div className="mt-3">
            <h6>Đơn hàng của bạn</h6>
            <div className='' style={{height:'30px', backgroundColor:'rgb(254, 223, 249)'}}>
                <h6 style={{color:'red', padding:'4px 0 0 8px',marginTop:'12px'}}>CHỜ THANH TOÁN</h6>
            </div>
            <Link to='/Order_details' style={{textDecoration:'none'}}>
            <div className='border-bottom mt-4' style={{height:'250px',boxShadow:'0 -4px 10px 4px rgba(0, 0, 0, 0.1)'}}>
                <div className='row m-0 border-bottom p-3 align-items-center' >
                    <div className='col-md-1 col-4'>
                        <img src='https://down-vn.img.susercontent.com/file/f825aedc54e76790a12ba99c5c72cc0b_tn' style={{width:'80px'}}/>
                    </div>
                    <div className='col-md-5 col-8'>
                        <p>Tên sản phẩm</p>
                        <p>Số lượng</p>
                    </div>
                    <div className='col-md-5'></div>
                    <div className='col-md-1 text-danger' >100000đ</div>
                </div>
                <div  className='row container'>
                    <div className='col-md-10'></div>
                    <div className='col-md-2 pt-2'>
                        <p>
                            <span style={{color:'black'}}>Số tiền phải trả : </span>
                            <span style={{color:'red'}}>100.000đ</span>
                        </p>
                        <button style={{height:'50px', width:'170px', border:'none',backgroundColor:'rgb(254, 223, 249)' }}>Hủy đơn hàng</button>
                    </div>
                </div>
            </div>
            </Link>
            <div className="order_none">
                <img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/orderlist/5fafbb923393b712b964.png'/>
                <p>Chưa có đơn hàng </p>
            </div>
        </div>
    );
}

export default Order;