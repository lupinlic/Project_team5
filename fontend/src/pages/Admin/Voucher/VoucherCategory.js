import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList,faSearch,faBell,faChevronDown,faCog,faUser,faLock,faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { apiUrl } from '../../../config';


const VoucherCategory = ({ sendVoucher_id, onClose }) => {
    const [voucher_id, setVoucherId] = useState(null); // voucher ID state
    const [categorys, setcategorys] = useState([]); // products state
    const [lsSelectcategorys, setlsSelectcategorys] = useState([]); // products state
    const [categoryVoucher_dsc, setcategoryVoucher_dsc] = useState(''); // voucher code state

    // Set voucher_id when sendVoucher_id prop changes
    useEffect(() => {
        setVoucherId(sendVoucher_id);
    }, [sendVoucher_id]);

    // Fetch products when component mounts
    useEffect(() => {
        axios.get(`${apiUrl}/api/categorys`)
            .then(response => {
                setcategorys(response.data.data); // assume response data has a 'data' field
            })
            .catch(error => console.error('Error fetching category:', error));
    }, []); // Empty dependency array to run once on mount

    useEffect(() => {
        if(voucher_id!== null){
            axios.get(`${apiUrl}/api/categoryVouchers/${voucher_id}/category`)
            .then(response => {
                setlsSelectcategorys(response.data.data); // assume response data has a 'data' field
            })
            .catch(error => console.error('có lỗi trong việc lấy các category đã đc áp dụng voucher:', error));
        }
        
    }, [voucher_id]); // Empty dependency array to run once on mount

    const handleSaveVoucherProduct = (e) => {
        e.preventDefault();
        lsSelectcategorys.map(category=>(
            axios.post(`${apiUrl}/api/categoryVouchers`, {
                voucher_id:voucher_id,
                category_id: category.category_id,
                categoryVoucher_dsc:categoryVoucher_dsc,
            })
            .then(response => {
                onClose();
            })
            .catch(error => console.error('Error creating voucher:', error))
        ))
        
    }

    const HandleonChange = (category) => {
        let getcategory = lsSelectcategorys.some(item=>item?.category_id==category.category_id);
        console.log(getcategory)
        if(getcategory){
            let category_coppy = lsSelectcategorys.filter(item=>item.category_id!==category.category_id);
            setlsSelectcategorys(category_coppy);
        }else{
            let category_coppy = [...lsSelectcategorys];
            setlsSelectcategorys([...category_coppy,category])
        }
    }

    return (
        <div className="form-popup">
            <form onSubmit={handleSaveVoucherProduct} className="form-container">
                
                <div className='row align-items-center'>
                <div className="col-md-12 d-flex " style={{alignItems:'center'}}>
                        <FontAwesomeIcon icon={faList}  style={{color:'#62677399'}}/>
                        <div className='search' style={{marginLeft:'12px'}}>
                            <input type="text" placeholder="Search" style={{outline:'none',position:'relative',width:'135%'}}></input>
                            <span style={{color: '#000',position: 'absolute',left: '334px',top: '40px'}}><FontAwesomeIcon icon={faSearch}/></span>
                        </div>
                    </div>
                </div>
                {categorys!==null?
                categorys.map(item=>(
                <div className='row align-items-center'>
                    <div className='col-md-3'>
                        <input
                            type="checkbox"
                            checked={lsSelectcategorys.some(category=>category.category_id==item.category_id)}
                            onChange={(e) => HandleonChange(item)}
                        />
                    </div>
                    <div className='col-md-9'>
                        <label className="name"><b>{item.category_name}</b></label>
                    </div>
                </div>
                ))
                :
                ''
                }
                <div className='col-md-2'>
                        <input
                            type="text"
                            value={categoryVoucher_dsc}
                            onChange={(e) => setcategoryVoucher_dsc(e.target.value)}
                            required
                        />
                    </div>
                <button type="submit" className="btn btn-primary">Lưu</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
            </form>
        </div>
    );

}


export default VoucherCategory;
