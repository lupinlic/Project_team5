import Order_detail from "./Order_detail";
import React, { useState,useEffect } from 'react';

function Order() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const openForm = () => {
        setIsFormVisible(true);
      };
    
      // Đóng form
      const closeForm = () => {
        setIsFormVisible(false);
      };
    return ( 
        <div className="p-2">
            <h6>Danh sách đơn hàng</h6>
            <table className="table table-striped pt-3 mt-3">
                    <thead>
                        <tr>
                        <th>Mã đơn hàng</th>
                        <th>Ngày đặt</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td>DK01</td>
                            <td>10/10/2024</td>
                            <td>100000000</td>
                            <td>
                                <button  className="btn btn-warning btn-sm mr-2" >Xác nhận</button>
                                <button  className="btn btn-danger btn-sm" > Hủy đơn</button>
                            </td>
                            <td>
                                <button  className="btn btn-warning btn-sm mr-2"  onClick={() => openForm()}>Xem chi tiết </button>
                                {isFormVisible && (
                                    <>
                                    <div className="overlay"></div> {/* Lớp overlay */}
                                    <Order_detail 
                                    onClose={closeForm} 
                                    />
                                    </>
                                )}
                            </td>
                        </tr>
                    
                        
                        {/* ))} */}
                    </tbody>
                </table>
        </div>
     );
}

export default Order;