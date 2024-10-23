import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VoucherFormAd from './VoucherFormAd';
import FormUpdateVoucher from './UpdateVoucher';
import FormaddVoucherCategory from './VoucherCategory';
import FormaddVoucherProduct from './VoucherProduct';
import { apiUrl } from '../../../config';


function Voucher() {
    const [voucherGroup, setVoucherGroup] = useState([]);
    const [selectedVoucherGroup_id, setselectedVoucherGroup_id] = useState('');
    const [vouchers, setVouchers] = useState([]);
    const [isFormUpdateVoucher, setisFormUpdateVoucher] = useState(false);
    const [isFormaddVoucherProduct, setisFormaddVoucherProduct] = useState(false);
    const [isFormaddVoucherCategory, setisFormaddVoucherCategory] = useState(false);


    useEffect(() => {
        axios.get(`${apiUrl}/api/voucherGroups`)
          .then(response => setVoucherGroup(response.data.data))
          .catch(error => console.error('Error fetching categories:', error));
    },[]);

    useEffect(() => {
        if(selectedVoucherGroup_id > 0){
            GetAllVoucherByGroup();
        }
    },[selectedVoucherGroup_id]);

    const GetAllVoucherByGroup = () => {
        axios.get(`${apiUrl}/api/voucherGroup/${selectedVoucherGroup_id}/vouchers`)
        .then(response => setVouchers(response.data.data))
        .catch(error => console.error('Error fetching categories:', error));
    }

    const handleChange = (e) => {
        let parse = parseInt(e.target.value)
        setselectedVoucherGroup_id(parse);
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

        const openFormUpdate = () => {
            //   setSelectedSupplierId(supplierId);
            setisFormUpdateVoucher(true);
        };
          
            // Đóng form
        const closeFormUpdate = () => {
          setisFormUpdateVoucher(false);
        };

        const openFormaddVoucherCategory = () => {
            //   setSelectedSupplierId(supplierId);
            setisFormaddVoucherCategory(true);
        };
          
            // Đóng form
        const closeFormaddVoucherCategory = () => {
            setisFormaddVoucherCategory(false);
        };

        const openFormaddVoucherProduct = () => {
            //   setSelectedSupplierId(supplierId);
            console.log('sửa')
            setisFormaddVoucherProduct(true);
        };
          
            // Đóng form
        const closeFormaddVoucherProduct = () => {
            setisFormaddVoucherProduct(false);
        };

        const HandleDeleteVoucher = (voucher_id) => {
            axios.delete(`${apiUrl}/api/vouchers/${voucher_id}`)
            .then(response => GetAllVoucherByGroup())
            .catch(error => console.error('có lỗi trong quá trình xóa voucher:', error));
        }

    return ( 
        <>
           <div className="row">
            <div className="col-md-9">
                <button type="button" class="btn btn-success ">Thêm</button>
            </div>
            <div className="col-md-3" style={{width:'220px'}}>
                <select name="voucherSelect" value={selectedVoucherGroup_id}  className="form-select" onChange={handleChange} id="exampleSelect" aria-label="Default select example">
                    <option value='0'>-- Chọn một nhóm --</option>
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
                        
                       {vouchers?.length > 0 ? 
                       vouchers.map(voucher=>(
                        <>
                        <tr key={voucher.voucher_id}>
                            <td>{voucher.voucher_code}</td>
                            <td>{voucher.voucher_group.voucherGroup_name}</td>
                            <td>{voucher.voucher_quantity}</td>
                            <td>{voucher.voucher_discount}</td>
                            <td>{voucher.voucher_minOrder}</td>
                            <td>{voucher.voucher_maxDiscount}</td>
                            <td>{voucher.start_date}</td>
                            <td>{voucher.end_date}</td>
                            <td>
                            <button className="btn btn-warning btn-sm mr-2" 
                            onClick={() => openFormUpdate()}
                            >
                                Sửa
                            </button>
                            {isFormUpdateVoucher && (
                                <>
                                <div className="overlay"></div> {/* Lớp overlay */}
                                {isFormUpdateVoucher && (
                                <FormUpdateVoucher 
                                // supplierId={selectedSupplierId} 
                                // onUpdate={updateSuppliers} 
                                GetAllVoucherByGroup = {GetAllVoucherByGroup}
                                sendvoucherGroup_id={selectedVoucherGroup_id}
                                sendvoucher_id={voucher.voucher_id}
                                onClose={closeFormUpdate} 
                                />
                                )}
                                </>
                            )}
                            <button className="btn btn-danger btn-sm" 
                            onClick={()=>HandleDeleteVoucher(voucher.voucher_id)}
                            >
                                Xóa
                            </button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>đối tượng áp dụng voucher:</td>
                            {selectedVoucherGroup_id ==1 || selectedVoucherGroup_id==2 ? 
                            <td colSpan={5}>Áp dụng cho toàn bộ sản phẩm</td>
                            :
                            <><td colSpan={2}><button
                                onClick={() => openFormaddVoucherProduct()}

                            >Sản phẩm</button>
                            {isFormaddVoucherProduct && (
                                <>
                                <div className="overlay"></div> {/* Lớp overlay */}
                                {isFormaddVoucherProduct && (
                                <FormaddVoucherProduct 
                                sendVoucher_id = {voucher.voucher_id}
                                onClose={closeFormaddVoucherProduct} 
                                />
                                )}
                                </>
                            )}
                            </td>
                            <td colSpan={3}><button
                                onClick={() => openFormaddVoucherCategory()}
                            >Nhóm sản phẩm</button>
                            {isFormaddVoucherCategory && (
                                <>
                                <div className="overlay"></div> {/* Lớp overlay */}
                                {isFormaddVoucherCategory && (
                                <FormaddVoucherCategory 
                                sendVoucher_id = {voucher.voucher_id}
                                onClose={closeFormaddVoucherCategory} 
                                />
                                )}
                                </>
                            )}
                            </td></>
                            
                            }
                        </tr> 
                        </>
                       ))
                       :
                       <p>hiện tại chưa có voucher nào thuộc nhóm này vui lòng thêm voucher</p>
                       }
                        
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
                    GetAllVoucherByGroup = {GetAllVoucherByGroup}
                    sendvoucherGroup_id={selectedVoucherGroup_id}
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