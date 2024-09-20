import './style.css'
function Pay() {
    return ( 
        <div className='mt-4 mb-4'>
            <div className="row">
            <div className="col-6">
                <p style={{fontSize: 20, marginLeft: 8}}>Thông tin nhận hàng</p>
                <div className="checkout d-flex" style={{flex: '1',flexDirection: 'column'}}>
                <input name="fullname" required type="text" placeholder="Nhập họ tên" className="oder_name" />
                <input name="email" required type="email" placeholder="Nhập email" className="oder_email" />
                <input name="phone" required type="text" placeholder="Nhập số điện thoại" className="oder_telephone" />
                <input name="address" type="text" placeholder="Nhập địa chỉ" className="oder_address" />
                <label htmlFor>Nội dung <span style={{color: 'red'}}>*</span></label>
                <textarea required name="note" id cols={30} rows={10} className="oder_content" defaultValue={""} />
                </div>
            </div>
            <div className="col-6">
                <p style={{fontSize: 20, marginLeft: 8}}>Hóa đơn</p>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Sản phẩm</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>a</td>
                        <td>2</td>
                        <td>1</td>
                    </tr><tr>
                        <th scope="row">Tổng</th>
                        <td colSpan={3}>Tổng tiền</td>
                    </tr>
                </tbody>
                </table>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <button style={{backgroundColor: '#fa7551', width: 200, height: 50, border: 'none', borderRadius: 5, color: '#fff'}}>Xác nhận đặt hàng</button>
                </div>
            </div>
            </div>

        </div>
  );
}

export default Pay;