import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Tên nhà cung cấp</th>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Địa chỉ</th>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Email</th>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}>SĐT</th>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody >
                        
                       
                        <tr>
                            <td >a</td>
                            <td>a</td>
                            <td>a</td>
                            <td>a</td>
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
                <button type="button" class="btn btn-success ">Thêm Voucher</button>
            </div>
            
           </div>
        </>
     );
}

export default Voucher;