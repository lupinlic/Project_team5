import { Line, Pie } from 'react-chartjs-2';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config';


import { Chart as ChartJS, ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);
function AdHome() {
    const [orderstatistical , setorderstatistical] = useState(null);
    const [userstatistical , setuserstatistical] = useState(null);
    const [products , setproducts] = useState(null);
    const [lablepie , setlablepie] = useState();
    const [datapie , setdatapie] = useState();

    const [orders , setorders] = useState(null);
    const [labllinechart , setlablelinechart] = useState(null);
    const [datalinechart , setdatalinechart] = useState(null);
    const [start_date , setstart_date] = useState(null);
    const [end_date , setend_date] = useState(null);
    const [option_time , setoption_time] = useState(0);
    const [year , setyear] = useState(new Date().getFullYear());


    useEffect(()=>{
      GetStatistical();
      HandleLineChart();
    },[])

    useEffect(()=>{
      if(products!==null){
        let lable = [];
        let datapie = [];
        products.forEach(product => {
          lable = [...lable,product.product_name];
          datapie = [...datapie,product.quantity];
        });
        setlablepie(lable);
        setdatapie(datapie);
      }
    },[products])

    const GetStatistical = (e) => {
      axios.get(`${apiUrl}/api/order/statistical`)
      .then(response => {
          // Truy cập vào phần "data" của API trả về và đặt vào state
          setorderstatistical(response.data.data);
      })
      .catch(error => {
          console.error('Error fetching data: ', error);
      });

      axios.get(`${apiUrl}/api/user/statistical`)
        .then(response => {
            // Truy cập vào phần "data" của API trả về và đặt vào state
            setuserstatistical(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
        
      axios.get(`${apiUrl}/api/product/statistical`)
      .then(response => {
          // Truy cập vào phần "data" của API trả về và đặt vào state
          setproducts(response.data.data);
      })
      .catch(error => {
          console.error('Error fetching data: ', error);
      });
    }

    // hàm khi nhập thời gian
    const HandleStatistical = (e) => {
      e.preventDefault();

      axios.post(`${apiUrl}/api/order/statisticalByDate`,{
        start_date:start_date,
        end_date:end_date
      })
      .then(response => {
          // Truy cập vào phần "data" của API trả về và đặt vào state
          setorderstatistical(response.data.data);
      })
      .catch(error => {
          console.error('Error fetching data: ', error);
      });
        
      axios.post(`${apiUrl}/api/product/statisticalByDate`,{
        start_date:start_date,
        end_date:end_date
      })
      .then(response => {
          // Truy cập vào phần "data" của API trả về và đặt vào state
          setproducts(response.data.data);
      })
      .catch(error => {
          console.error('Error fetching data: ', error);
      });
    }

    const HandleLineChart = () => {
      axios.post(`${apiUrl}/api/order/statisticalByLinechart`,{
        option_time:option_time,
        year:year,
      })
      .then(response => {
          // Truy cập vào phần "data" của API trả về và đặt vào state
          setorders(response.data.data);
      })
      .catch(error => {
          console.error('Error fetching data: ', error);
      });
    }

    useEffect(()=>{
      if(orders!==null){
        let lable = [];
        let data = [];
        orders.forEach(order => {
          lable = [...lable,order.month?order.month:order.quarter];
          data = [...data,order.sum];
        });
        setlablelinechart(lable);
        setdatalinechart(data);
      }
    },[orders])


// Dữ liệu cho biểu đồ đường (Line chart)
    const lineData = {
    labels: labllinechart,
    datasets: [
      {
        label: 'Orders',
        data: datalinechart,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Biểu đồ doanh thu`,
      },
    },
  };
  // Dữ liệu cho biểu đồ tròn (Pie chart)
  const pieData = {
    labels: lablepie,
    datasets: [
      {
        label: '# of Votes',
        data: datapie,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          generateLabels: function(chart) {
            let data = chart.data;
            return data.labels.map((label, i) => {
              return {
                text: label.length > 20 ? label.substring(0, 20) + '...' : label, // Cắt ngắn nhãn nếu dài hơn 20 ký tự
                fillStyle: data.datasets[0].backgroundColor[i],
              };
            });
          }
        },
        position: 'right',
      },
      title: {
        display: true,
        text: 'Số sản phẩm bán ra',
      },
    },
  };


    return ( 
        <div className="p-3" style={{background:'#fff' , minHeight:'100vh'}} >
            <div className="border-bottom">
                <i  style={{color:'#62677399'}}>Welcome!</i>
            </div>

            <div className="row  mt-2 p-2">
                <div className="col-md-4  p-2" style={{height:'100px'}}>
                    <div style={{boxShadow:'0 -4px 10px 4px rgba(0, 0, 0, 0.1)',width:'100%',height:'100%',textAlign:'center'}}>
                        <h6 className="pt-3">Tổng tiền</h6>
                        <p>{orderstatistical?.order_sum}</p>
                    </div>
                </div>
                <div className="col-md-4  p-2" style={{height:'100px'}}>
                    <div style={{boxShadow:'0 -4px 10px 4px rgba(0, 0, 0, 0.1)',width:'100%',height:'100%',textAlign:'center'}}>
                     <h6 className="pt-3">Số đơn hàng</h6>
                     <p>{orderstatistical?.order_count}</p>
                    </div>
                    
                </div>
                <div className="col-md-4  p-2" style={{height:'100px'}}>
                    <div style={{boxShadow:'0 -4px 10px 4px rgba(0, 0, 0, 0.1)',width:'100%',height:'100%',textAlign:'center'}}>
                     <h6 className="pt-3">Số tài khoản</h6>
                     <p>{userstatistical?.user_count}</p>
                    </div>     
                </div>

            </div>


                <form>
                    <div className="row mt-4">
                        <div className="col-md-3">
                            <label style={{marginRight:'8px'}} >Từ ngày : </label>
                            <input type="date" id="from_date" name="from_date" onChange={(e)=>setstart_date(e.target.value)} />
                        </div>
                        <div className="col-md-3">
                            <label style={{marginRight:'8px'}}>Đến ngày : </label>
                            <input type="date" id="to_date" name="to_date" className="ml-2" onChange={(e)=>setend_date(e.target.value)}/>
                        </div>
                        <div className="col-md-2">
                            <button style={{borderColor:'#62677399'}} onClick={(e)=>{HandleStatistical(e)}}>Thống kê</button>
                            <button type='button' style={{borderColor:'#62677399',marginLeft:'10px'}} onClick={(e)=>GetStatistical(e)}>Tất cả</button>
                        </div>
                    </div>
                </form>

                <h5  style={{color:'#62677399',marginTop:'16px'}}>Biểu đồ thống kê</h5>

                <div className="chart row">
                    <div className="col-md-7">
                      {products?.length > 0 ? 
                      <Pie data={pieData} options={pieOptions} />
                      :
                      <p>Không có sản phẩm nào</p>
                      }
                    </div>
                </div>
                <div className="chart row">
                      <div className="col-md-2">
                              <input type='text' style={{borderColor:'#62677399',width:'70%'}}
                              placeholder='Nhập năm'
                              value={year}
                              onChange={(e)=>setyear(parseInt(e.target.value))}
                              ></input>
                          </div>
                          <div className="col-md-2">
                              <select className="w-100" value={option_time} onChange={(e)=>setoption_time(parseInt(e.target.value))}>                                  
                                    <option hidden>{option_time?'Theo quý':'Theo tháng'}</option>
                                  
                                  {option_time?
                                    <option value={0}>Theo tháng</option>
                                  :
                                    <option value={1}>Theo quý</option>                                  
                                  }
                              </select>
                          </div>
                          <div className="col-md-2">
                          <button style={{borderColor:'#62677399'}} onClick={(e)=>{HandleLineChart()}}>Chọn</button>

                          </div>
                </div>

                <div className="chart row" style={{marginBottom:'100px'}}>
                      {orders?.length>0?
                      <Line data={lineData} options={lineOptions} 
                      
                      />
                      :
                      <div>
                        <div style={{padding:'200px'}}>
                          Không có đơn hàng nào vui lòng chọn lại thông tin
                        </div>
                      </div>
                      }
                </div>
            </div>
     );
}

export default AdHome;