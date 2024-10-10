import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VoucherFormAd from './VoucherFormAd';
function Voucher() {
    const [voucherGroup, setVoucherGroup] = useState([]);
    const [selectedVoucherGroup, setSelectedVoucherGroup] = useState('');
    const [voucher, setVoucher] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/voucherGroups')
          .then(response => setVoucherGroup(response.data.data))
          .catch(error => console.error('Error fetching categories:', error));
    });
    const handleChange = (e) => {
        setSelectedVoucherGroup(e.target.value);
      };

      const [isFormVisible, setIsFormVisible] = useState(false);

      const openForm = () => {
        //   setSelectedSupplierId(supplierId);
          setIsFormVisible(true);
        };
      
        // Đóng form
        const closeForm = () => {
          setIsFormVisible(false);
        };

    return ( 
        <>
           <div className="row">
            <div className="col-md-9">
                <button type="button" class="btn btn-success ">Thêm</button>
            </div>
            <div className="col-md-3" style={{width:'220px'}}>
                <select name="voucherSelect" value={selectedVoucherGroup}  className="form-select" onChange={handleChange} id="exampleSelect" aria-label="Default select example">
                    <option value="">-- Chọn một nhóm --</option>
                {voucherGroup.map(voucherGroup => (
                    <option key={voucherGroup.id} value={voucherGroup.voucherGroup_id}>{voucherGroup.voucherGroup_name}</option>
                    ))}
                </select>
            </div>

           </div>
           <div style={{overflowY: 'auto',overflowX: 'hidden',marginTop:'20px',height:'500px'}}>
                <table className="table table-striped" >
                    <thead>
                        <tr>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}> Mã voucher</th>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Loại voucher</th>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Số lượng voucher</th>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Tiền giảm</th>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Giá trị tối thiểu</th>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Áp dụng tối đa</th>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Ngày bắt đầu</th>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Ngày kết thúc</th>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody >
                        
                       
                        <tr>
                            <td>DK001</td>
                            <td>Free Ship</td>
                            <td>100</td>
                            <td>30k</td>
                            <td>0đ</td>
                            <td>30k</td>
                            <td>10/10/2024</td>
                            <td>20/10/2024</td>
                            <td>
                            <button className="btn btn-warning btn-sm mr-2" >
                                Sửa
                            </button>
                            <button className="btn btn-danger btn-sm" >
                                Xóa
                            </button>
                            </td>
                        </tr> 
                    </tbody>
                </table>
           </div>
           <div className="row">
            <div className="col-md-10"></div>
            <div className="col-md-2">
                <button type="button" class="btn btn-success " onClick={() => openForm()}>Thêm Voucher</button>
                {isFormVisible && (
                    <>
                    <div className="overlay"></div> {/* Lớp overlay */}
                    {isFormVisible && (
                    <VoucherFormAd 
                    // supplierId={selectedSupplierId} 
                    // onUpdate={updateSuppliers} 
                    onClose={closeForm} 
                    />
                    )}
                    </>
                )}
            </div>
            
           </div>
        </>
     );
}

export default Voucher;