import {Link } from 'react-router-dom';
import './style.css'
import axios from 'axios';
import React, { useState,useEffect } from 'react';
function Login() {

  

    const [user_email, setEmail] = useState('');
    const [user_password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
    
        axios.post('http://localhost:8000/api/user/login', {
          user_email: user_email,
          user_password: user_password
        })
        // ,{
        //     withCredentials: true
        // }

        .then(response => {
            // Lưu token vào localStorage
            let token = response.data.token;
            localStorage.setItem('authToken', token);
            
            // Lưu thông tin người dùng trong state (hoặc context)
            setUser(response.data.user);

            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            // console.log('Đăng nhập thành công!', response.data);

        })
        .catch(error => {
            console.error('Lỗi khi đăng nhập:', error);
        });
    }; 
    useEffect(()=>{
        if (user) {
            if (user.user_role == 1) {
              window.location.href = '/Admin/Home';
            } else {
              window.location.href = '/';
            }
        }
    },[user])
     
    return ( 
        <div>
            <div className="login-container">
                <div className="login-header">
                    <h1>Đăng nhập</h1>
                    <p>Chào mừng bạn đến với Eightstore</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" value={user_email} name='user_email'
                    onChange={(e) => setEmail(e.target.value)}  className="form-control" id="email" placeholder="Nhập email của bạn" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                    <input type="password" value={user_password} name='user_password'
                    onChange={(e) => setPassword(e.target.value)}  className="form-control" id="password" placeholder="Nhập mật khẩu của bạn" />
                    </div>
                    <div className="d-flex justify-content-between">
                    <Link to="" className="forgot-password">Quên mật khẩu?</Link>
                    </div>
                    <button type="submit" className="btn btn-pink mt-3" style={{backgroundColor:'#e83e8c', color:'#fff'}} onClick={handleLogin}>Đăng nhập</button>
                </form>
                <div className="divider">hoặc</div>
                <div className="social-login">
                    <button className="btn btn-google mb-2" style={{backgroundColor:'#db4437', color:'#fff'}}>Đăng nhập bằng Google</button>
                    <button className="btn btn-facebook" style={{backgroundColor:'#4267B2', color:'#fff'}}>Đăng nhập bằng Facebook</button>
                </div>
                <div className="text-center mt-3">
                    <p>Bạn chưa có tài khoản? <Link to="/Register">Đăng ký</Link></p>
                </div>
            </div>

        </div>
     );
}

export default Login;