function Footer() {
    return (
        <footer style={{backgroundColor: 'rgb(240, 61, 207)'}} className=" text-light pt-4">
            <div className="container-fluid ">

                <div className="container footer">
                <div className="row border-bottom">
                    <div className="col-md-3">
                        <p>HỖ TRỢ KHÁCH HÀNG </p>
                        <ul>
                            <li><a style={{color: 'orange'}} href>Hotline: 0406 2003</a></li>
                            <li><a href>Giới thiệu</a></li>
                            <li><a href>Sản phẩm</a></li>
                            <li><a href>Tin mới nhất</a></li>
                            <li><a href>Câu hỏi thường gặp</a></li>
                            <li><a href>Tuyển dụng</a></li>
                            <li><a href>Liên hệ</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <p>VỀ EIGHTSTORE.VN</p>
                        <ul>
                            <li><a href>Giới thiệu</a></li>
                            <li><a href>Sản phẩm</a></li>
                            <li><a href>Tin mới nhất</a></li>
                            <li><a href>Câu hỏi thường gặp</a></li>
                            <li><a href>Tuyển dụng</a></li>
                            <li><a href>Liên hệ</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <p>CHÍNH SÁCH BÁN HÀNG</p>
                        <ul>
                            <li><a href>Trang chủ</a></li>
                            <li><a href>Giới thiệu</a></li>
                            <li><a href>Sản phẩm</a></li>
                            <li><a href>Tin mới nhất</a></li>
                            <li><a href>Câu hỏi thường gặp</a></li>
                            <li><a href>Tuyển dụng</a></li>
                            <li><a href>Liên hệ</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <p>THEO DÕI CHÚNG THÔI</p>
                        <ul>
                            <li><a href>Trang chủ</a></li>
                            <li><a href>Giới thiệu</a></li>
                            <li><a href>Sản phẩm</a></li>
                            <li><a href>Tin mới nhất</a></li>
                            <li><a href>Câu hỏi thường gặp</a></li>
                            <li><a href>Tuyển dụng</a></li>
                            <li><a href>Liên hệ</a></li>
                        </ul>
                    </div>
                </div>
                {/* dưới */}
                <div className="row pt-3">
                    <div className="col-md-6">
                        <p>THẾ GIỚI SKINCARE</p>
                        <ul>
                            <li>Copyright@ 2023 Công ty cổ phần thương mại Eight Store</li>
                            <li>Chứng nhận ĐKKD: do sở KH &amp; ĐT TP.Hà Nội cấp</li>
                            <li>Địa chỉ: 54 Triều Khúc, Hà Nội</li>
                            <li>Điện thoại: 0328443736 - Email: huatunglam1205@gmail.com</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <p>NHẬN TIN KHUYẾN MÃI</p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control"  placeholder="Nhập email của bạn" />
                            <button className="btn m-0" style={{backgroundColor:'red'}} type="submit">Đăng kí</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </footer>

    );
}

export default Footer ;