import React, { useEffect } from 'react';
import {Link  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercent,faBoxOpen, faUser, faMapMarkerAlt,faShoppingCart, faUserTie , faTruckLoading ,faHome, faWarehouse,faChevronRight} from '@fortawesome/free-solid-svg-icons';
import './style.css'
function Slider() {
    useEffect(() => {
        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide) => {
          slide.addEventListener('click', () => {
            // Loại bỏ class active khỏi tất cả slide
            slides.forEach((s) => s.classList.remove('active'));
            // Thêm class active vào slide được chọn
            slide.classList.add('active');
          });
        });
      }, []);


    return ( 
        <div className="col-md-2 slider" style={{backgroundColor:'#fff',minHeight:'100vh'}}>
            <div className="pt-3">
                <img className='' style={{width: 50, borderRadius: '50%',}} src='https://e7.pngegg.com/pngimages/754/474/png-clipart-computer-icons-system-administrator-avatar-computer-network-heroes-thumbnail.png'  alt />
                <span style={{ fontSize: 16,marginLeft:8,color:'#62677399'}}>Admin</span>
            </div>
            <h6 className="mt-4" style={{color:'#62677399'}}>NAVIGATION</h6>
            <ul className='navigation m-0 p-0'>
            
                <li className='slide active' style={{padding:'8px 20px'}}>
                    <Link to='/Admin/Home'><FontAwesomeIcon icon={faHome} className='me-2'/> Dashboard </Link>
                </li>
                <li className='slide' style={{padding:'8px 20px'}}><Link to='/Admin/Account'><FontAwesomeIcon icon={faUser} className='me-2'/> Tài khoản</Link> </li>
                <li className='slide' style={{padding:'8px 20px'}}><Link to='/Admin/Category'><FontAwesomeIcon icon={faUserTie} className='me-2'/> Danh mục</Link> </li>
                <li className='slide' style={{padding:'8px 20px'}}><Link to='/Admin/Supplier'> <FontAwesomeIcon icon={faTruckLoading} className='me-2'/>Nhà cung cấp</Link></li>
                <li className='slide' style={{padding:'8px 20px'}}><Link to='/Admin/Product'> <FontAwesomeIcon icon={faBoxOpen} className='me-2'/>Sản phẩm</Link> </li>
                <li className='slide' style={{padding:'8px 20px'}}><Link to='/Admin/VoucherGroup'> <FontAwesomeIcon icon={faPercent} className='me-2'/>Nhóm giảm giá</Link> </li>
                <li className='slide' style={{padding:'8px 20px'}}><Link to='/Admin/Voucher'> <FontAwesomeIcon icon={faPercent} className='me-2'/>Mã giảm giá</Link> </li>
                <li className='slide' style={{padding:'8px 20px'}}><Link to='/Admin/Shipping'> <FontAwesomeIcon icon={faMapMarkerAlt} className='me-2'/>Địa chỉ vận chuyển</Link> </li>
                <li className='slide' style={{padding:'8px 20px'}}><Link to='/Admin/Order'> <FontAwesomeIcon icon={faShoppingCart} className='me-2'/>Đơn hàng</Link></li>
            
            </ul>
            <div>

            </div>
        </div>
        
     );
}

export default Slider;