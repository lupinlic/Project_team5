import './style.css';
import React, { useState, useEffect, useRef  } from 'react';
import { Helmet } from 'react-helmet';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faSignOutAlt, faShoppingCart , faPhone ,faHome, faCog,faLock} from '@fortawesome/free-solid-svg-icons';
// import logo from '../../../../assets/img/logo8.png';

function Header() {
    const [cartCount, setCartCount] = useState(0);
    const [userId, setUserId] = useState(null);
    const userData = localStorage.getItem('user');

    
    const handleLogout = () => {
        axios.get('http://localhost:8000/api/user/logout')
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setCartCount(0)
        
        
        // Chuyển hướng về trang đăng nhập
        // window.location.href = '/Login';
    };
    useEffect(() => {
        
        const parsedUser = JSON.parse(userData);
        if(parsedUser!==null && parsedUser!== undefined){
            setUserId(parsedUser.user_id);
        }
      }, []);

    useEffect(()=>{
        if(userId!== null && userId!==undefined){
        axios.get(`http://localhost:8000/api/users/${userId}/carts`)
                .then(response => {
                    setCartCount(response.data.count_cart);
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                });
            }

    },[userId]);

    


    // const Addcart=()=>{
    //     setCartCount(prevCount => prevCount + 1); 
    // }

    
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const settingsRef = useRef(null);
    const toggleSettings = () => {
        setIsSettingsOpen(prev => !prev);
      };
      const handleClickOutside = (event) => {
        if (settingsRef.current && !settingsRef.current.contains(event.target)) {
          setIsSettingsOpen(false);
        }
      };


    // document.addEventListener('click', (e) => {
    //     if(isclick_Profile == true){
    //         handleClickOutside();
    //     }
    // });
    
      // Thêm và gỡ bỏ sự kiện click ngoài khi component mount/unmount
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    return (
        <div>
            <Helmet>
                <link href="https://fonts.googleapis.com/css2?family=Style+Script&display=swap" rel="stylesheet" />
                <link  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
            </Helmet>
        <header> 
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-3 ">
                        <img className='' style={{width: 70, borderRadius: '50%',}} src=''  alt />
                        <span style={{fontFamily: '"Style Script"', fontSize: 30,marginLeft:8}}>Eight Store</span>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Nhập từ khóa tìm kiếm" id="find" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <span className="input-group-text" id="basic-addon2"> <FontAwesomeIcon icon={faSearch}/></span>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-md">
                                <div className="row">
                                    <div className="col-3">
                                        <div className="fs-3 text-danger"><FontAwesomeIcon icon={faPhone} /></div>
                                    </div>
                                    <div className="col-9">Tư vấn hỗ trợ <br />
                                        <strong className="text-danger">0328443736</strong></div>
                                    </div>
                            </div>
                            <div className="col-md" onClick={toggleSettings} ref={settingsRef} style={{position:'relative',cursor:'pointer'}}>
                                <div className="row">
                                    <div className="col-3">
                                        <div className="fs-3 text-danger"> <FontAwesomeIcon icon={faUser} /> </div>
                                    </div>
                                    <div className="col-9">Xin chào!<br />
                                        <strong className="text-danger">Hế lô</strong>
                                    </div>
                                </div>
                                {isSettingsOpen && (
                                    <div className='account_child' style={{zIndex:'1',position:'absolute' ,backdropFilter: 'blur(18px)', padding:'20px',width:'250px'}}
                                    
                                    >
                                        <h6>Welcome!</h6>
                                        <ul>
                                            <li><Link to='' style={{color:'black'}}><FontAwesomeIcon style={{paddingRight:'8px'}} icon={faUser}/>Thông tin cá nhân</Link></li>
                                            <li><Link to='' style={{color:'black'}}><FontAwesomeIcon style={{paddingRight:'8px'}} icon={faCog}/>Đổi mật khẩu</Link></li>
                                            <li><Link to='/Shipping' style={{color:'black'}}><FontAwesomeIcon style={{paddingRight:'8px'}} icon={faLock}/>Địa chỉ giao hàng</Link></li>
                                            <li className='pt-2' ><Link to='/Login' style={{color:'black'}} 
                                                onClick={(e) => { 
                                                    handleLogout();
                                                    }}>
                                                <FontAwesomeIcon style={{paddingRight:'8px'}} icon={faSignOutAlt}/>Đăng xuất</Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-md">
                            </div>
                            <div className="col-md">
                                <Link to="/cart" className="  position-relative">
                                <span className="fs-3 text-dark cart-icon"><FontAwesomeIcon icon={faShoppingCart} />
                                </span>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartCount}
                                </span>
                                </Link>
                            </div>
                            {/* <div className="col-md">
                                <Link className="fs-3 text-dark" to="/Login "><FontAwesomeIcon icon={faSignOutAlt} /></Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </header>
        {/* end  */}
        <section className="menu">
            <div className="mymenu container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <ul className="menu nav">
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/"><FontAwesomeIcon icon={faHome} /> Trang chủ</Link>
                                </li>
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/Product">Sản phẩm</Link>
                                </li>
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/Introduce"> Giới thiệu</Link>
                                </li>
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/Contact">Liên hệ</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6">
                            <ul className="menu menu-2  nav">
                                <li className="nav-item dropdown">
                                    <Link className="nav-link" to="/Order">Tra cứu đơn hàng</Link>
                                </li>
                                <li className="nav-item ">
                                    <Link className="nav-link dropdown-toggle" to="./" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Tải ứng dụng</Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="#"><img style={{width: 300}} src="" alt /></Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>



        </div>
    );
}

export default Header;