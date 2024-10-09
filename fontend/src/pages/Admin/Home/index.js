import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);
function AdHome() {
// Dữ liệu cho biểu đồ đường (Line chart)
    const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
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
        text: 'Biểu đồ doanh thu',
      },
    },
  };
  // Dữ liệu cho biểu đồ tròn (Pie chart)
  const pieData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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
        position: 'top',
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
                        <p>100000</p>
                    </div>
                </div>
                <div className="col-md-4  p-2" style={{height:'100px'}}>
                    <div style={{boxShadow:'0 -4px 10px 4px rgba(0, 0, 0, 0.1)',width:'100%',height:'100%',textAlign:'center'}}>
                     <h6 className="pt-3">Số đơn hàng</h6>
                     <p>10</p>
                    </div>
                    
                </div>
                <div className="col-md-4  p-2" style={{height:'100px'}}>
                    <div style={{boxShadow:'0 -4px 10px 4px rgba(0, 0, 0, 0.1)',width:'100%',height:'100%',textAlign:'center'}}>
                     <h6 className="pt-3">Số tài khoản</h6>
                     <p>5</p>
                    </div>     
                </div>

            </div>


                <form>
                    <div className="row mt-4">
                        <div className="col-md-3">
                            <label style={{marginRight:'8px'}} >Từ ngày : </label>
                            <input type="date" id="from_date" name="from_date"  />
                        </div>
                        <div className="col-md-3">
                            <label style={{marginRight:'8px'}}>Đến ngày : </label>
                            <input type="date" id="to_date" name="to_date" className="ml-2" />
                        </div>
                        <div className="col-md-4">
                            <button style={{borderColor:'#62677399'}}>Thống kê</button>
                        </div>
                        <div className="col-md-2">
                            <select className="w-100">
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                    </div>
                </form>

                <h5  style={{color:'#62677399',marginTop:'16px'}}>Biểu đồ thống kê</h5>

                <div className="chart row">
                    <div className="col-md-4">
                        <Pie data={pieData} options={pieOptions} />
                    </div>
                    <div className="col-md-8">
                        <Line data={lineData} options={lineOptions} />
                    </div>
                </div>
            </div>

     );
}

export default AdHome;