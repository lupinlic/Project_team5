import './style.css'

function Order_detail() {
    return ( 
        <div className='mt-4 mb-4'>
            <div className='row pb-4 mb-4' style={{borderBottom:'1px dashed'}}>
                <div className='col-md-10'></div>
                <div className='col-md-2'>
                    <button style={{height:'40px', width:'150px', border:'none',backgroundColor:'rgb(254, 223, 249)' }}>Hủy đơn hàng</button>
                </div>
            </div>
            <h6>Địa Chỉ Nhận Hàng</h6>
            <p>Họ và tên</p>
            <p>Sđt</p>
            <p>Địa chỉ</p>


           <div className='border-bottom mt-4' style={{height:'350px',boxShadow:'0 -4px 10px 4px rgba(0, 0, 0, 0.1)'}}>
                <div className='border-bottom row m-0 '>
                    <div className='col-md-10'></div>
                    <div className='col-md-2'>Mã đơn hàng: 1tgwydg</div>
                </div>
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
                <div className='row pt-2 pt-md-3 container'>
                    <div className='col-md-8'></div>
                    <div className='col-md-2 col-5'>Tổng tiền</div>
                    <div className='col-md-2 col-7' style={{fontWeight:'500',color:'red'}}>100</div>
                </div>
                <div className='row pt-2 pt-md-3 container'>
                    <div className='col-md-8'></div>
                    <div className='col-md-2 col-5'>Phí vận chuyển</div>
                    <div className='col-md-2 col-7' style={{fontWeight:'500'}}>100</div>
                </div>
                <div className='row pt-2 pt-md-3 container'>
                    <div className='col-md-8'></div>
                    <div className='col-md-2 col-5'>Thành tiền</div>
                    <div className='col-md-2 col-7' style={{fontWeight:'500',color:'red',fontSize:'20px'}}>100</div>
                </div>
                <div className='row pt-2 pt-md-3 container'>
                    <div className='col-md-8'></div>
                    <div className='col-md-2 col-5'>Phương thức thanh toán</div>
                    <div className='col-md-2 col-7' style={{fontWeight:'500'}}>Thanh toán khi nhận hàng</div>
                </div>
            </div>
        </div>
     );
}

export default Order_detail;