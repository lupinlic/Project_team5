import './style.css';
import React, { useState, useEffect, useRef,useContext   } from 'react';
import { Helmet } from 'react-helmet';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartContext } from '../../../../context/cartContext';  // Import CartContext

import { faSearch, faUser, faSignOutAlt, faShoppingCart , faPhone ,faHome, faCog,faLock, faMapMarkedAlt, faGift} from '@fortawesome/free-solid-svg-icons';
// import logo from '../../../../assets/img/logo8.png';

function Header() {
    const { cartCount, setCartCount } = useContext(CartContext); 
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

    //   menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = () => {
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div>
            <Helmet>
                <link href="https://fonts.googleapis.com/css2?family=Style+Script&display=swap" rel="stylesheet" />
                <link  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
            </Helmet>
        <header> 
            <div className="container py-3">
                <div className="row align-items-center">
                    <div className="col-3 col-md-3 ">
                        <img className='' style={{width: 70, borderRadius: '50%',}} src=''  alt />
                        <span className="eightstore-text" style={{fontFamily: '"Style Script"',marginLeft:8}}>Eight Store</span>
                    </div>
                    <div className="col-6 col-md-4 ">
                        <div className="input-group search mb-3">
                            <input type="text" className="form-control" placeholder="Nhập từ khóa tìm kiếm" id="find" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <span className="input-group-text" id="basic-addon2"> <FontAwesomeIcon icon={faSearch}/></span>
                        </div>
                    </div>

{/* user */}
                    <div className="col-1 d-block d-md-none">
                        <div className="fs-3 text-dark" onClick={toggleSettings} ref={settingsRef}> <FontAwesomeIcon icon={faUser} /> </div>
                        {isSettingsOpen && (
                                    <div className='account_child' style={{zIndex:'1',position:'absolute' ,backdropFilter: 'blur(18px)', padding:'20px',width:'250px',left:'20%'}}
                                    
                                    >
                                        {userId ? (
                                        <strong className="text-danger">Lupin</strong>
                                        ) : (
                                            // Nếu chưa đăng nhập
                                            <Link to="/Login" style={{textDecoration:'none', color:'red', fontWeight:'500'}}>Đăng nhập</Link>
                                        )}
                                        <h6>Welcome!</h6>
                                        <ul>
                                            <li><Link to='/VoucherList' style={{color:'black'}}><FontAwesomeIcon style={{paddingRight:'8px'}} icon={faGift}/>Voucher của tôi</Link></li>
                                            <li><Link to='/Order' style={{color:'black'}}><FontAwesomeIcon style={{paddingRight:'8px'}} icon={faLock}/>Đơn hàng</Link></li>
                                            <li><Link to='/Shipping' style={{color:'black'}}><FontAwesomeIcon style={{paddingRight:'8px'}} icon={faMapMarkedAlt}/>Địa chỉ giao hàng</Link></li>
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
{/* end */}

                    <div className="col-6 col-md-3 d-none d-md-block">
                        <div className="row">
                            <div className="col-md ">
                                <div className="row ">
                                    <div className="col-3">
                                        <div className="fs-3 text-danger"><FontAwesomeIcon icon={faPhone} /></div>
                                    </div>
                                    <div className="col-9">Tư vấn hỗ trợ <br />
                                        <strong className="text-danger">0328443736</strong></div>
                                    </div>
                            </div>
                            <div className="col-md " onClick={toggleSettings} ref={settingsRef} style={{position:'relative',cursor:'pointer'}}>
                                <div className="row col-12 ">
                                    <div className="col-3 col-md-3">
                                        <div className="fs-3 text-danger"> <FontAwesomeIcon icon={faUser} /> </div>
                                    </div>
                                    <div className="col-9 col-md-9">Xin chào!<br />
                                        {userId ? (
                                        <strong className="text-danger">Lupin</strong>
                                        ) : (
                                            // Nếu chưa đăng nhập
                                            <Link to="/Login" style={{textDecoration:'none', color:'red', fontWeight:'500'}}>Đăng nhập</Link>
                                        )}
                                    </div>
                                </div>
                                {isSettingsOpen && (
                                    <div className='account_child' style={{zIndex:'1',position:'absolute' ,backdropFilter: 'blur(18px)', padding:'20px',width:'250px'}}
                                    
                                    >
                                        <h6>Welcome!</h6>
                                        <ul>
                                            <li><Link to='/VoucherList' style={{color:'black'}}><FontAwesomeIcon style={{paddingRight:'8px'}} icon={faGift}/>Voucher của tôi</Link></li>
                                            <li><Link to='/Order' style={{color:'black'}}><FontAwesomeIcon style={{paddingRight:'8px'}} icon={faLock}/>Đơn hàng</Link></li>
                                            <li><Link to='/Shipping' style={{color:'black'}}><FontAwesomeIcon style={{paddingRight:'8px'}} icon={faMapMarkedAlt}/>Địa chỉ giao hàng</Link></li>
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
                    <div className="col-2 col-md-2">
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
                        <div className="col-12 col-md-6">
                            <ul className="menu nav ">
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/"><FontAwesomeIcon icon={faHome} /> Trang chủ</Link>
                                </li>
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/Product">Sản phẩm</Link>
                                </li>
                                <li className="nav-item d-none d-md-block">
                                    <Link className="nav-link" to="/Introduce"> Giới thiệu</Link>
                                </li>
                                <li className="nav-item d-block d-md-none">
                                    <Link className="nav-link" to="" onClick={openMenu}> Danh mục</Link>

                                     {/* menu */}
                                    <div id="overlay" onClick={closeMenu} style={{
                                        opacity: isMenuOpen ? '1' : '0',
                                        visibility: isMenuOpen ? 'visible' : 'hidden',
                                        transition: 'opacity 0.3s, visibility 0.3s',
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        zIndex: '10'
                                        }}>
                                    </div>
                                    <div id="menuContainer" 
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: isMenuOpen ? '0' : '-300px',
                                        width: '300px',
                                        height: '100%',
                                        backgroundColor: '#fff',
                                        transition: 'left 0.3s',
                                        zIndex: '20'
                                    }}>
                                            <span id="closeButton" onClick={closeMenu}>×</span>

                                            <ul className="list-group">
                                                <li className="list-group-item active" style={{backgroundColor: '#e5677d', border: 'none'}}>DANH MỤC SẢN PHẨM</li>
                                                <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/icon11.png" alt='' /><Link to="/Product/2">Sữa rửa mặt</Link></li>
                                                <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/trang-diem-2.png" alt='' /><Link to="/Product/1">Tẩy trang</Link></li>
                                                <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/salon-toc.png" alt='' /><Link to="/Product/3">Mặt nạ</Link></li>
                                                <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/duong-the.png" alt='' /><Link to="/Product/4">Nước hoa hồng</Link></li>
                                                <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/nuoc-hoa-1.png" alt='' /><Link to="/Product/5">Dưỡng ẩm</Link></li>
                                                <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/dac-tri.png" alt='' /><Link to="/Product/8">Chăm sóc tóc</Link></li>
                                                <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/icon11.png" alt='' /><Link to="/Product/7">Trang điểm</Link></li>
                                                <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/trang-diem-2.png" alt='' /><Link to="/Product/6">Dưỡng thể</Link> </li>
                                            </ul>

                                            
                                    </div>
                                </li>
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/Introduce">Giới thiệu</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-6">
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>

        


        </div>
    );
}

export default Header;