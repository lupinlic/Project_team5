import {Link } from 'react-router-dom';
import './style.css'
function Register() {
    return ( <div>

        <div className="register-container">
            <div className="register-header">
                <h1>Đăng ký</h1>
                <p>Tạo tài khoản mới tại Eightstore</p>
            </div>
            <form>
                <div className="mb-3">
                <label htmlFor="name" className="form-label">Tên đăng nhập</label>
                <input type="text" className="form-control" id="name" placeholder="Nhập họ và tên của bạn" />
                </div>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Nhập email của bạn" />
                </div>
                <div className="mb-3">
                <label htmlFor="password" className="form-label">Mật khẩu</label>
                <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" />
                </div>
                <div className="mb-3">
                <label htmlFor="confirm-password" className="form-label">Xác nhận mật khẩu</label>
                <input type="password" className="form-control" id="confirm-password" placeholder="Nhập lại mật khẩu" />
                </div>
                <button type="submit" className="btn btn-pink mt-3" style={{backgroundColor:'#e83e8c', color:'#fff'}}>Đăng ký</button>
            </form>
            <div className="divider">hoặc</div>
            <div className="social-register">
                <button className="btn btn-google mb-2" style={{backgroundColor:'#db4437', color:'#fff'}}>Đăng ký bằng Google</button>
                <button className="btn btn-facebook" style={{backgroundColor:'#4267B2', color:'#fff'}}>Đăng ký bằng Facebook</button>
            </div>
            <div className="text-center mt-3">
                <p>Bạn đã có tài khoản? <Link to="/Login">Đăng nhập</Link></p>
            </div>
        </div>

    </div> );
}

export default Register;