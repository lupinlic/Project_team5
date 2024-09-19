import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser, faHandHoldingUsd,faFileInvoiceDollar} from '@fortawesome/free-solid-svg-icons';
import React, { useState,useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './style.css'

// Đăng ký các thành phần cho Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  


function AdHome() {
    const [filterType, setFilterType] = useState('month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState(null); // State lưu trữ dữ liệu biểu đồ

  // Dữ liệu doanh thu mẫu
  const revenueData = {
    month: {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
      data: [10000, 12000, 8500, 15000, 11000, 9500,9000,10000,12000,6000,9800,6500],
    },
    quarter: {
      labels: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
      data: [30000, 40000, 35000, 45000],
    },
    year: {
      labels: ['2020', '2021', '2022', '2023'],
      data: [120000, 140000, 160000, 180000],
    },
  };

  // Cập nhật kiểu lọc
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // Xử lý khi nhấn nút "Thống kê"
  const handleGenerateStats = () => {
    setChartData({
      labels: revenueData[filterType].labels,
      datasets: [
        {
          label: 'Doanh thu',
          data: revenueData[filterType].data,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  };
  useEffect(() => {
    handleGenerateStats(); // Gọi hàm để thiết lập dữ liệu mặc định
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Biểu đồ doanh thu (${filterType === 'month' ? 'Tháng' : filterType === 'quarter' ? 'Quý' : 'Năm'})`,
      },
    },
  };




    return ( 
        <div style={{backgroundColor:'#fff',minHeight:'100vh',paddingLeft:'4px'}}>
            <div className="pt-3 container ">
                <h6 style={{color: 'rgb(83, 82, 82)',borderBottom:'1px solid #a9a8a8',paddingBottom:'8px',marginBottom:'16px'}}>Welcome!</h6>
                <div className="row w-100 m-0" style={{height:'150px',padding:'32px',border:'1px solid #a9a8a8'}}>
                    <div className="col-md-3 d-flex align-items-center justify-content-center " style={{borderRight:'1px solid #a9a8a8'}} >
                        <div className='text-center' style={{fontSize:'24px'}}><FontAwesomeIcon icon={faUser} style={{marginRight:'8px',color:'blue'}}/>10
                            <p style={{color: '#a9a8a8'}}>Total User</p>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex align-items-center justify-content-center" style={{borderRight:'1px solid #a9a8a8'}}>
                    <div className='text-center' style={{fontSize:'24px'}}><FontAwesomeIcon icon={faFileInvoiceDollar} style={{marginRight:'8px',color:'green'}}/>20
                            <p style={{color: '#a9a8a8'}}>Total Order</p>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex align-items-center justify-content-center" style={{borderRight:'1px solid #a9a8a8'}}>
                    <div className='text-center' style={{fontSize:'24px'}}><FontAwesomeIcon icon={faHandHoldingUsd} style={{marginRight:'8px',color:'yellow'}}/>10000000
                            <p style={{color: '#a9a8a8'}}>Total Money</p>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex align-items-center justify-content-center">
                    <div className='text-center' style={{fontSize:'24px'}}><FontAwesomeIcon icon={faUser} style={{marginRight:'8px',color:'blue'}}/>10
                            <p style={{color: '#a9a8a8'}}>Total ....</p>
                        </div>
                    </div>
                </div>


{/* biểu dồ */}
            <div className="filter-container" style={{color:'rgb(83, 82, 82)'}}>
                {/* Ô chọn kiểu lọc: tháng, năm, quý */}
                <label className="filterType">Chọn kiểu lọc: </label>
                <select id="filterType" value={filterType} onChange={handleFilterChange} style={{color:'#a9a8a8'}}>
                    <option value="month">Tháng</option>
                    <option value="quarter">Quý</option>
                    <option value="year">Năm</option>
                </select>

                {/* Ô nhập ngày bắt đầu */}
                <div className="date-range">
                    <label className="startDate">Ngày bắt đầu: </label>
                    <input style={{color:'#a9a8a8'}}
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={handleStartDateChange}
                    />

                    {/* Ô nhập ngày kết thúc */}
                    <label className="endDate">Ngày kết thúc: </label>
                    <input style={{color:'#a9a8a8'}}
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={handleEndDateChange}
                    />

                    {/* Nút "Thống kê" */}
                    <button onClick={handleGenerateStats}>Thống kê</button>
                </div>

                {/* Biểu đồ doanh thu */}
                
                </div>
                {chartData && (
                    <div className="chart-container">
                    <h4 style={{color:'rgb(83, 82, 82)'}}>Biểu đồ doanh thu</h4>
                    <Bar data={chartData} options={options} />
                    </div>
                )}

            </div>
        </div>
     );
}

export default AdHome;