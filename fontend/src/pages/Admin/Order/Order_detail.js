const Order_detail=({onClose})=> {
    return ( 
        <div>
             <div className="form-popup " style={{width:'800px'}}>
                <h5>Đơn hàng : DK01</h5>
                <div className="m-2 border-bottom p-2">
                    <p style={{fontWeight:'500'}}>Địa chỉ nhận hàng</p>
                    <p className="m-0">Tên</p>
                    <p className="m-0">Số điện thoại</p>
                    <p className="m-0">Địa chỉ</p>
                </div>
                <div style={{overflowY: 'auto',overflowX: 'hidden',marginTop:'20px',height:'300px'}}>
                    <table className="table table-striped pt-3">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Sản phẩm</th>
                                <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Số lượng</th>
                                <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Đơn giá</th>
                                <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr >
                            <td>1</td>
                            <td>Caaaaaa</td>
                            <td>1</td>
                            <td>1111</td>
                            <td>1111</td>
                            
                        </tr>
                        </tbody>
                    </table>
                </div>

                <button type="button" className="btn btn-secondary" style={{position:'absolute', bottom:'5%',right:'5%'}} onClick={onClose}>Đóng</button>
             </div>
        </div>
     );
}

export default Order_detail;