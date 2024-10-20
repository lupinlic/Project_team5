import './style.css';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import {Link } from 'react-router-dom';

function Home (){
        const [currentIndex, setCurrentIndex] = useState(0);
        const slidesRef = useRef(null);
        const slidesToShow = 4;
        const slideCount = 20;
        const maxIndex = Math.ceil(slideCount / slidesToShow) - 1;
      
        useEffect(() => {
          const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (maxIndex + 1));
          }, 2000); // 5 giây
      
          return () => clearInterval(interval);
        }, [maxIndex]);
      
        useEffect(() => {
          if (slidesRef.current) {
            slidesRef.current.style.transform = `translateX(${-currentIndex * (100 / slidesToShow)}%)`;
          }
        }, [currentIndex, slidesToShow]);
      
        const handleNext = () => {
          if (currentIndex < maxIndex) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
          }
        };
      
        const handlePrev = () => {
          if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
          }
        };

        // gọi api đỏ sản phẩm
        const [data, setData] = useState([]);
        const [categorys, setCategory] = useState([]);
        useEffect(() => {
            // Gọi hai API để lấy dữ liệu sản phẩm và danh mục, nhà cung cấp
            axios.get('http://localhost:8000/api/products')
               
            
                .then(response => {
                    // Truy cập vào phần "data" của API trả về và đặt vào state
                    setData(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                });

                axios.get('http://localhost:8000/api/categorys')
            .then(response => {
                // Truy cập vào phần "data" của API trả về và đặt vào state
                setCategory(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    
        }, []);

        const getCategoryName = (categoryId) => {
            let categoryName = 'Không xác định';
            categorys.forEach(category => {
              if (category.category_id == categoryId) {
                categoryName = category.category_name;
              }
            });
            return categoryName;
          };
          const getImagePath = (categoryId, productImg) => {
            const categoryName = getCategoryName(categoryId);
            console.log(`/assets/img/${categoryName}/${productImg}`)
            try {
              return `http://localhost:8000/uploads/Categories/${categoryName}/${productImg}`;
              
            } catch (error) {
              console.error('Error loading image:', error);
              return null; // Hoặc có thể trả về một hình ảnh mặc định
            }
          };

        const shortenText = (text, maxLength) => {
            return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
          };
          

    return ( 
    <div>

    {/* start */}
        <div className="category row" >
            <div className="col-md-3 d-none d-md-block">
                <ul className="list-group">
                    <li className="list-group-item active" style={{backgroundColor: 'rgb(240, 61, 207)', border: 'none',color:'#fff'}}>DANH MỤC SẢN PHẨM</li>
                    <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/icon11.png" alt ='' /><Link to="/Product/2">Sữa rửa mặt</Link></li>
                    <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/trang-diem-2.png" alt ='' /><Link to="/Product/1">Tẩy trang</Link></li>
                    <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/salon-toc.png" alt ='' /><Link to="/Product/3">Mặt nạ</Link></li>
                    <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/duong-the.png" alt ='' /><Link to="/Product/4">Nước hoa hồng</Link></li>
                    <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/nuoc-hoa-1.png" alt ='' /><Link to="/Product/5">Dưỡng ẩm</Link></li>
                    <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/dac-tri.png" alt ='' /><Link to="/Product/8">Chăm sóc tóc</Link></li>
                    <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/icon11.png" alt ='' /><Link to="/Product/7">Trang điểm</Link></li>
                    <li className="list-group-item"><img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/trang-diem-2.png" alt ='' /><Link to="/Product/6">Dưỡng thể</Link> </li>
                </ul>
            </div>
            <div className="col-md-9 col-12 banner1" style={{margin:'30px 0'}}>
                <div id="demo" className="carousel slide" data-bs-ride="carousel">
                
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#demo" data-bs-slide-to={0} className="active" />
                        <button type="button" data-bs-target="#demo" data-bs-slide-to={1} />
                    </div>
                    
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img  src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/sls4.jpg" alt="Los Angeles" className="d-block w-100" />
                        </div>
                        <div className="carousel-item">
                            <img  src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/bannerdd.jpg" alt="Chicago" className="d-block w-100" />
                        </div>
                    </div>
                    
                    <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" />
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                        <span className="carousel-control-next-icon" />
                    </button>
                </div>
            </div>
        </div>
       {/* end  */}
        {/* sp gợi ý  */}
        <div className="sellings ">
            <p>GỢI Ý CHO BẠN</p>
            <div className="sel">
                <div className="sell " ref={slidesRef}>

                {data.map(item =>(
                <div className="sell-child" key={item.id}>
                    <Link to={`/Product_detail/${item.product_id}`} style={{textDecoration:'none'}}>
                    <img style={{height: 250, width: '100%'}} src={getImagePath(item.category_id, item.product_img)} alt />
                    <h6 style={{textAlign:'center',marginTop:'8px'}}>{shortenText(item.product_name, 45)}</h6>
                    <p>{shortenText(item.product_dsc, 40)}</p>
                    <p className="price">
                        <span>{item.product_price}</span>
                        <span>Đ</span>
                    </p>
                    </Link>
                </div>
                ))}
                </div>
                <button className="run" id="prev" onClick={handlePrev}>‹</button>
                <button className="run" id="next" onClick={handleNext}>›</button>
   
            </div>
            <div className='d-block d-md-none row align-items-center d-flex'>
                <div className='col-4'></div>
                <div className='col-4'>
                    <button  style={{border:'none', backgroundColor:'rgb(254, 223, 249)'}}>Xem thêm</button>
                </div>
                <div className='col-4'></div>
                
            </div>
        </div>
        {/* thương hiệu*/}
        <div>
            <img className='banner' src='https://theme.hstatic.net/200000536477/1000906546/14/section_hot_banner.png?v=454' alt='' style={{width:"100%",margin:'16px 0'}}/>
            <h4>Thương hiệu nổi bật</h4>
            <div className='row'>
                <img src='https://theme.hstatic.net/200000551679/1001154878/14/brand_23.jpg?v=2470' alt='' className='col-2'/>
                <img src='https://theme.hstatic.net/200000551679/1001154878/14/brand_9.jpg?v=2470' alt='' className='col-2'/>
                <img src='https://theme.hstatic.net/200000551679/1001154878/14/brand_14.jpg?v=2470' alt='' className='col-2'/>
                <img src='https://theme.hstatic.net/200000551679/1001154878/14/brand_26.jpg?v=2470' alt='' className='col-2'/>
                <img src='https://theme.hstatic.net/200000551679/1001154878/14/brand_21.jpg?v=2470' alt='' className='col-2'/>
                <img src='https://theme.hstatic.net/200000551679/1001154878/14/brand_22.jpg?v=2470' alt='' className='col-2'/>

            </div>
        </div>
        {/* tip */}
        <div style={{margin:'20px 0'}}>
            <h4>Beauty Tip</h4>
            <div className='row'>
                <div className='col-md-3 tip mb-4' >
                    <img src='https://file.hstatic.net/200000551679/article/20h30-15.09-480x320_37693a78e5d04998ad5b621caff9b081_large.png' alt='' style={{width:'100%'}}/>
                    <a  href=''><h5 style={{margin:'4px 0'}}>Tưới nước cho da căng mọng cùng top tonner ẩm sâu</h5></a>
                    <p>Bí kíp giữ làn da không tuổi tràn đầy sức sống....</p>
                    <Link to='' style={{color:'#f067bc'}} >Đọc tiếp</Link>
                </div>
                <div className='col-md-3 tip mb-4'>
                    <img src='https://file.hstatic.net/200000551679/article/480x320_390c2498e2f34b1abc9c1761b5e8aadb_large.png' alt='' style={{width:'100%'}}/>
                    <a href=''><h5 style={{margin:'4px 0'}}>Chăm da dịu lành từ 4 dược liệu trứ danh xứ hàn</h5></a>
                    <p>Thiên nhiên hàn quốc đa dạng và xanh tươi....</p>
                    <Link to='' style={{color:'#f067bc'}} >Đọc tiếp</Link>
                </div>
                <div className='col-md-3 tip mb-4'>
                    <img src='https://file.hstatic.net/200000551679/article/20h30-12.09-480x320_4f6d4a444c8548df8d4f0307e9a21f15_large.png' alt='' style={{width:'100%'}}/>
                    <a href=''><h5 style={{margin:'4px 0'}}>Bạn biết gì về Directo Pi ??</h5></a>
                    <p>Chưa biết đến directo pi là sự thiếu sót vô cùng lớn...</p>
                    <Link to='' style={{color:'#f067bc'}} >Đọc tiếp</Link>
                </div>
                <div className='col-md-3 tip mb-4'>
                    <img src='https://file.hstatic.net/200000551679/article/topic-kem-duong-da-kho-480x320_7961f07cc4924196a58004b61a3864ab_large.png' alt='' style={{width:'100%'}}/>
                    <a href=''><h5 style={{margin:'4px 0'}}>Tạm biệt da khô bong chóc với top kem dưỡng tại eightstore</h5></a>
                    <p>Cứ thay đổi thời tiết một tí là da liền cầu cứu khắp mọi nơi...</p>
                    <Link to='' style={{color:'#f067bc'}} >Đọc tiếp</Link>
                </div>
            </div>
        </div>
        {/* feedback */}
        <div id="feedback " className='d-none d-md-block' style={{height: 100, backgroundColor: 'rgb(240, 61, 207)', margin: '30px 0',borderRadius:'20px'}}>
            <div className="row">
                <div className="col-md-9 fb9" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12}}>
                <h3>ĐĂNG KÍ TƯ VẤN</h3>
                <p>Gửi email cho chúng tôi để nhận thông tin về sản phẩm phù hợp dành cho bạn</p>
                </div>
                <div className="col-md-3 daki" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30}}>
                <a href><button className="daki" style={{width: 130, height: 35, border: 'none', borderRadius: 10}}>ĐĂNG KÍ NGAY</button></a>
                </div>
            </div>
        </div>



        <div id="in4 " className="d-none d-md-block" style={{height:"100px",}}>
            <div className='row' >
                <div className='col-md-3 d-flex' style={{alignItems:'center',justifyContent:'center'}}>
                    <img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/icon1.jpg" alt />
                    <p>
                        <span style={{fontSize: '100%'}}>
                            <strong>
                            Vận chyển miễn phí <br />
                            </strong>
                        </span>
                        <span style={{fontSize: '90%', fontWeight: 300}}>
                            <strong>
                            với đơn hàng &gt;600000đ
                            </strong>
                        </span>
                    </p>
                </div>
                <div className='col-md-3 d-flex' style={{alignItems:'center',justifyContent:'center'}}>
                        <img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/icon2.jpg" alt />
                        <p>
                            <span style={{fontSize: '100%'}}>
                                <strong>
                                Chất lượng đảm bảo <br />
                                </strong>
                            </span>
                            <span style={{fontSize: '90%', fontWeight: 300}}>
                                <strong>
                                hàng chính hãng
                                </strong>
                            </span>
                        </p>
                </div>
                <div className='col-md-3 d-flex' style={{alignItems:'center',justifyContent:'center'}}>
                        <img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/icon3.jpg" alt />
                        <p>
                            <span style={{fontSize: '100%'}}>
                                <strong>
                                Đổi trả miễn phí<br />
                                </strong>
                            </span>
                            <span style={{fontSize: '90%', fontWeight: 300}}>
                                <strong>
                                trong vòng 15 ngày
                                </strong>
                            </span>
                        </p>

                </div>
                <div className='col-md-3 d-flex' style={{alignItems:'center',justifyContent:'center'}}>
                        <img src="https://duocpham1.haiphongweb.com/wp-content/uploads/2017/09/icon4.jpg" alt />
                        <p>
                            <span style={{fontSize: '100%'}}>
                                <strong>
                                Hỗ trợ miễn phí <br />
                                </strong>
                            </span>
                            <span style={{fontSize: '90%', fontWeight: 300}}>
                                <strong>
                                từ 6:30-23:00
                                </strong>
                            </span>
                        </p>

                </div>

            </div>
            
        </div>


    {/*end  */}
    </div>
    );
    
 
}

export default Home ;