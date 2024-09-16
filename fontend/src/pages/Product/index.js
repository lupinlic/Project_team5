import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faList,faShoppingCart} from '@fortawesome/free-solid-svg-icons';

import './style.css'
import React, { useState } from 'react';

function Product() {
        const [isMenuOpen, setIsMenuOpen] = useState(false);

        const openMenu = () => {
            setIsMenuOpen(true);
        };

        const closeMenu = () => {
            setIsMenuOpen(false);
        };
    return (
        <div style={{margin:'30px 0'}}>
            <h5>TRANG CHỦ/SẢN PHẨM</h5>
            <h6 id="menuButton" className=''><FontAwesomeIcon icon={faList} onClick={openMenu}/>Danh mục</h6>
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
                            <li className="list-group-item active" style={{backgroundColor: '#34ba22', border: 'none'}}>DANH MỤC SẢN PHẨM</li>
                            <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/icon11.png" alt /><a href=''>Sữa rửa mặt trị mụn</a></li>
                            <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/trang-diem-2.png" alt /><a href=''>Sữa tắm trắng da</a></li>
                            <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/salon-toc.png" alt /><a href=''>Sản phẩm làm đẹp</a></li>
                            <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/duong-the.png" alt /><a href=''>Sản phẩm giảm cân</a></li>
                            <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/nuoc-hoa-1.png" alt /><a href=''>Kem chống nắng</a></li>
                            <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/dac-tri.png" alt /><a href=''>Chăm sóc tóc</a></li>
                            <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/icon11.png" alt /><a href=''>Thực phẩm chức năng</a></li>
                            <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/trang-diem-2.png" alt /><a href=''>Mĩ phẩm đặc trị</a> </li>
                        </ul>
                </div>
            {/* main */}
            <div className='row mt-4' id='main'>
                <div className='col-md-2 main-left border-end'>
                    <h6>MỨC GIÁ</h6>
                    <form>
                        <div className="form-check m-2">
                            <input className="form-check-input custom-checkbox" type="checkbox" defaultValue id="checkbox1" />
                            <label className="form-check-label" htmlFor="checkbox1">
                            Giá dưới 100.000đ
                            </label>
                        </div>
                        <div className="form-check m-2">
                            <input className="form-check-input custom-checkbox" type="checkbox" defaultValue id="checkbox2" />
                            <label className="form-check-label" htmlFor="checkbox2">
                            100.000-200.000đ
                            </label>
                        </div>
                        <div className="form-check m-2">
                            <input className="form-check-input custom-checkbox" type="checkbox" defaultValue id="checkbox3" />
                            <label className="form-check-label" htmlFor="checkbox3">
                            200.000-300.000đ
                            </label>
                        </div>
                        <div className="form-check m-2">
                            <input className="form-check-input custom-checkbox" type="checkbox" defaultValue id="checkbox4" />
                            <label className="form-check-label" htmlFor="checkbox4">
                            300.000-500.000đ
                            </label>
                        </div>
                        <div className="form-check m-2">
                            <input className="form-check-input custom-checkbox" type="checkbox" defaultValue id="checkbox5" />
                            <label className="form-check-label" htmlFor="checkbox5">
                            500.000-1.000.000đ
                            </label>
                        </div>
                        <div className="form-check m-2">
                            <input className="form-check-input custom-checkbox" type="checkbox" defaultValue id="checkbox6" />
                            <label className="form-check-label" htmlFor="checkbox6">
                            Giá trên 1.000.000đ
                            </label>
                        </div>
                    </form>

                </div>
                <div className='col-md-10 main-right'>
                    <div className='row'>
                        <div className='col-md-3 p-2 p-2'>
                            <img src='https://product.hstatic.net/200000551679/product/untitled-4-04_cd0abe03cdd1493db1c7724980fa3ef2_large.jpg' style={{width:'100%'}}/>
                            <a href='./Product_detail' className='pro-name' style={{marginLeft:'16px'}}>Kem lót....</a>
                            <div className='d-flex justify-content-between' style={{marginLeft:'16px'}}>
                                <p style={{color:'red'}}>175,000đ</p>
                                <a href='./Product_detail'><FontAwesomeIcon icon={faShoppingCart}  style={{color:'red'}}/></a>
                            </div>
                        </div>
                        <div className='col-md-3 p-2'>
                            <img src='https://product.hstatic.net/200000551679/product/untitled-4-04_cd0abe03cdd1493db1c7724980fa3ef2_large.jpg' style={{width:'100%'}}/>
                            <a href='' className='pro-name' style={{marginLeft:'16px'}}>Kem lót....</a>
                            <div className='d-flex justify-content-between ' style={{marginLeft:'16px'}}>
                                <p style={{color:'red'}}>175,000đ</p>
                                <a href=''><FontAwesomeIcon icon={faShoppingCart}  style={{color:'red'}}/></a>
                            </div>
                        </div>
                        <div className='col-md-3 p-2'>
                            <img src='https://product.hstatic.net/200000551679/product/untitled-4-04_cd0abe03cdd1493db1c7724980fa3ef2_large.jpg' style={{width:'100%'}}/>
                            <a href='' className='pro-name' style={{marginLeft:'16px'}}>Kem lót....</a>
                            <div className='d-flex justify-content-between ' style={{marginLeft:'16px'}}>
                                <p style={{color:'red'}}>175,000đ</p>
                                <a href=''><FontAwesomeIcon icon={faShoppingCart}  style={{color:'red'}}/></a>
                            </div>
                        </div>
                        <div className='col-md-3 p-2'>
                            <img src='https://product.hstatic.net/200000551679/product/untitled-4-04_cd0abe03cdd1493db1c7724980fa3ef2_large.jpg' style={{width:'100%'}}/>
                            <a href='' className='pro-name' style={{marginLeft:'16px'}}>Kem lót....</a>
                            <div className='d-flex justify-content-between ' style={{marginLeft:'16px'}}>
                                <p style={{color:'red'}}>175,000đ</p>
                                <a href=''><FontAwesomeIcon icon={faShoppingCart}  style={{color:'red'}}/></a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Product;