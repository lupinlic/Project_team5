import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddVoucherGroup from './AddVoucherGroup';
import UpdateVoucherGroup from './UpdateVoucherGroup';

function VoucherGroup() {
    const [voucherGroup, setVoucherGroup] = useState([]);
    const [selectedVoucherGroup_id, setselectedVoucherGroup_id] = useState('');
    const [vouchers, setVouchers] = useState([]);
    const [isFormUpdateVoucher, setisFormUpdateVoucher] = useState(false);
    const [isFormaddVoucherProduct, setisFormaddVoucherProduct] = useState(false);
    const [isFormaddVoucherCategory, setisFormaddVoucherCategory] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [isVoucherSelected, setisVoucherSelected] = useState(null);


    useEffect(() => {
        GetallVoucherGroup();
    },[]);

    const GetallVoucherGroup = () =>{
        axios.get('http://localhost:8000/api/voucherGroups')
          .then(response => setVoucherGroup(response.data.data))
          .catch(error => console.error('Error fetching categories:', error));
    }

      const openForm = () => {
        //   setSelectedSupplierId(supplierId);
          setIsFormVisible(true);
        };
      
        // Đóng form
        const closeForm = () => {
          setIsFormVisible(false);
        };

        const openFormUpdate = (voucherGroup_id) => {
            setisVoucherSelected(voucherGroup_id);
        };
          
            // Đóng form
        const closeFormUpdate = () => {
            setisVoucherSelected(null);
        };
          
        const HandleDeleteVoucherGroup = (voucherGroup_id) => {
            axios.delete(`http://localhost:8000/api/voucherGroups/${voucherGroup_id}`)
            .then(response => GetallVoucherGroup())
            .catch(error => console.error('có lỗi trong quá trình xóa voucher:', error));
        }

    return ( 
        <>
           <div className="row">
            <div className="col-md-9">
                <button type="button" class="btn btn-success "onClick={() => openForm()}>Thêm</button>
                {isFormVisible && (
                    <>
                    <div className="overlay"></div> {/* Lớp overlay */}
                    {isFormVisible && (
                    <AddVoucherGroup 
                    GetAllVoucherGroup = {GetallVoucherGroup}
                    onClose={closeForm} 
                    />
                    )}
                    </>
                )}
            </div>

           </div>
           <div style={{overflowY: 'auto',overflowX: 'hidden',marginTop:'20px',height:'500px'}}>
                <table className="table table-striped" >
                    <thead>
                        <tr>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}> Ảnh nhóm voucher</th>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Tên nhóm voucher</th>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Mô tả nhóm voucher</th>
                        <th style={{position: 'sticky', top: '0',zIndex: '1'}}>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody >
                        
                       {voucherGroup?.length > 0 ? 
                       voucherGroup.map(item=>(
                        <>
                        <tr key={item.voucherGroup_id}>
                            <td>
                                <img style={{width:'15%', height:'15%'}} src={`http://localhost:8000/uploads/VoucherGroup/${item.voucherGroup_img}`}></img>
                            </td>
                            <td>{item.voucherGroup_name}</td>
                            <td>{item.voucherGroup_dsc}</td>
                            <td>
                            <button className="btn btn-warning btn-sm mr-2" 
                            onClick={() => openFormUpdate(item.voucherGroup_id)}
                            >
                                Sửa
                            </button>
                            {isVoucherSelected==item.voucherGroup_id && (
                                <>
                                <div className="overlay"></div> {/* Lớp overlay */}
                                {isVoucherSelected==item.voucherGroup_id && (
                                <UpdateVoucherGroup 
                                GetAllVoucherGroup = {GetallVoucherGroup}
                                onClose={closeFormUpdate} 
                                voucherGroup_id = {item.voucherGroup_id}
                                />
                                )}
                                </>
                            )}
                            <button className="btn btn-danger btn-sm" 
                            onClick={()=>HandleDeleteVoucherGroup(item.voucherGroup_id)}
                            >
                                Xóa
                            </button>
                            </td>
                        </tr>
                        </>
                       ))
                       :
                       <p>hiện tại chưa có voucher nào thuộc nhóm này vui lòng thêm voucher</p>
                       }
                        
                    </tbody>
                </table>
           </div>
        </>
     );
}

export default VoucherGroup;