import './style.css';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faSignOutAlt, faShoppingCart , faPhone ,faHome, faBox} from '@fortawesome/free-solid-svg-icons';
const header = ()=>{
    const headerStyle = {
        
      };
}

function Header() {
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
                        <img className='' style={{width: 70, borderRadius: '50%',}} src={require('../../../../assets/img/logo8.png')}  alt />
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
                            <div className="col-md">
                                <div className="row">
                                    <div className="col-3">
                                        <div className="fs-3 text-danger"> <FontAwesomeIcon icon={faUser} /> </div>
                                    </div>
                                    <div className="col-9">Xin chào!<br />
                                        <strong className="text-danger">Tùng Lâm</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-md">
                            </div>
                            <div className="col-md">
                                <a href="./cart.php" className="  position-relative">
                                <span className="fs-3 text-dark"><FontAwesomeIcon icon={faShoppingCart} /></span>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                </span>
                                </a>
                            </div>
                            <div className="col-md">
                                <a className="fs-3 text-dark" href="./Signin "><FontAwesomeIcon icon={faSignOutAlt} /></a>
                            </div>
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
                                    <a className="nav-link" href="./"><FontAwesomeIcon icon={faHome} /> Trang chủ</a>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link" href="./Product">Sản phẩm</a>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link" href="./Introduce"> Giới thiệu</a>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link" href="./Contact">Liên hệ</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6">
                            <ul className="menu menu-2  nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link" href="./Order">Tra cứu đơn hàng</a>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link dropdown-toggle" href="./" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Tải ứng dụng</a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#"><img style={{width: 300}} src="../../css/img/qr.png" alt /></a></li>
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