

const VoucherForm =({onClose}) =>{
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
                    <h6>Vui lòng chọn 1 voucher</h6> 
                    <div className='row' style={{border:'1px solid',alignItems:'center',marginBottom:'12px'}}>
                        <div className='col-md-4'>
                            <img style={{width:'100%',height:'100%'}} src='https://storage.googleapis.com/ops-shopee-files-live/live/shopee-blog/2024/03/96c7b0ba-1140x800-1.jpg'></img>
                        </div>
                        <div className='col-md-7'>
                            <p>Giảm tối đa 30k</p>
                            <p>Đơn tối thiểu 0Đ</p>
                        </div>
                        <div className='col-md-1'>
                            <input type='checkbox'></input>
                        </div>
                    </div>
                    <div className='row' style={{border:'1px solid',alignItems:'center',marginBottom:'12px'}}>
                        <div className='col-md-4'>
                            <img style={{width:'100%',height:'100%'}} src='https://storage.googleapis.com/ops-shopee-files-live/live/shopee-blog/2024/03/96c7b0ba-1140x800-1.jpg'></img>
                        </div>
                        <div className='col-md-7'>
                            <p>Giảm tối đa 30k</p>
                            <p>Đơn tối thiểu 0Đ</p>
                        </div>
                        <div className='col-md-1'>
                            <input type='checkbox'></input>
                        </div>
                    </div>
                    <div className='row' style={{border:'1px solid',alignItems:'center',marginBottom:'12px'}}>
                        <div className='col-md-4'>
                            <img style={{width:'100%',height:'100%'}} src='https://storage.googleapis.com/ops-shopee-files-live/live/shopee-blog/2024/03/96c7b0ba-1140x800-1.jpg'></img>
                        </div>
                        <div className='col-md-7'>
                            <p>Giảm tối đa 30k</p>
                            <p>Đơn tối thiểu 0Đ</p>
                        </div>
                        <div className='col-md-1'>
                            <input type='checkbox'></input>
                        </div>
                    </div>
                    <div className='row' style={{border:'1px solid',alignItems:'center',marginBottom:'12px'}}>
                        <div className='col-md-4'>
                            <img style={{width:'100%',height:'100%'}} src='https://storage.googleapis.com/ops-shopee-files-live/live/shopee-blog/2024/03/96c7b0ba-1140x800-1.jpg'></img>
                        </div>
                        <div className='col-md-7'>
                            <p>Giảm tối đa 30k</p>
                            <p>Đơn tối thiểu 0Đ</p>
                        </div>
                        <div className='col-md-1'>
                            <input type='checkbox'></input>
                        </div>
                    </div>
                   
                </div>



                <div style={{position:'absolute',bottom:'4%',right:'4%'}}>
                    <button type="submit" className="btn btn-primary">Lưu</button>
                    <button type="button" className="btn btn-secondary"  onClick={onClose}>Đóng</button>
                </div>
             </div>
        </div>
     );
}

export default VoucherForm;