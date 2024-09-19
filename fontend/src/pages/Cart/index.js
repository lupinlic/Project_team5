import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
function Cart() {
    return ( 
        <div className='mt-4 mb-4'>
           <p style={{color: 'darkgrey'}}>Trang chủ / Giỏ hàng</p>
           <div className="row">
                <div className="left col-9">
                    
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td><input className="form-check-input" type="checkbox" defaultValue id="checkbox1" /></td>
                                <td>Sản phẩm 1</td>
                                <td>100,000 VND</td>
                                <td>5</td>
                                <td><button type="button" class="btn btn-danger">Xóa</button></td>
                            </tr>
                            
                        </tbody>
                    </table>
                    <div className="py-3">
                        <a href="./" className="tieptuc" style={{color: 'red',textDecoration:'none'}}><FontAwesomeIcon icon={faArrowLeft }/>Tiếp tục mua hàng</a>
                    </div>
                </div>
            {/* right */}
                <div className="right col-3">
                    <div className="py-1" style={{borderBottom: '1px solid darkgrey'}}><p style={{fontSize: 18, marginLeft: 8, fontWeight: 500}}>Hóa đơn của bạn</p></div>
                    <div className="py-1" style={{borderBottom: '1px solid darkgrey'}}>
                        <div className="row">
                            <div className="col">
                                <p style={{}}>Số sản phẩm:</p>
                            </div>
                            <div className="col">
                                <p style={{float: 'right', fontWeight: 500}} className="cart_sosp">0</p>
                            </div>
                        </div>
                        <div className="row">
                                <div className="col">
                                <p>Giảm giá:</p>
                            </div>
                            <div className="col">
                                <p style={{float: 'right', fontWeight: 500}}>0</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="row py-1">
                            <div className="col">
                                <p>Tổng cộng:</p>
                            </div>
                            <div className="col">
                                <p style={{color: '#fa7551', float: 'right'}} className="cart_tongcong">0</p>
                            </div>
                        </div>
                    </div>
                    <a href='./Pay'><button style={{backgroundColor: '#fa7551', width: '100%', border: 'none', borderRadius: 5}} className="py-2 " onclick="ProceedToOder()">Tiến hành đặt hàng</button></a>
                </div>
            </div>

        </div>
     );
}

export default Cart;