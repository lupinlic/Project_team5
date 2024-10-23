import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList,faSearch,faBell,faChevronDown,faCog,faUser,faLock,faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { apiUrl } from '../../../config';


const VoucherProduct = ({ sendVoucher_id, onClose }) => {
    const [voucher_id, setVoucherId] = useState(null); // voucher ID state
    const [products, setProducts] = useState([]); // products state
    const [lsSelectproducts, setlsSelectproducts] = useState([]); // products state
    const [productVoucher_dsc, setproductVoucher_dsc] = useState(''); // voucher code state

    // Set voucher_id when sendVoucher_id prop changes
    useEffect(() => {
        setVoucherId(sendVoucher_id);
    }, [sendVoucher_id]);

    // Fetch products when component mounts
    useEffect(() => {
        axios.get(`${apiUrl}/api/products`)
            .then(response => {
                setProducts(response.data.data); // assume response data has a 'data' field
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []); // Empty dependency array to run once on mount

    useEffect(() => {
        if(voucher_id!== null){
            axios.get(`${apiUrl}/api/productVouchers/${voucher_id}/product`)
            .then(response => {
                setlsSelectproducts(response.data.data); // assume response data has a 'data' field
            })
            .catch(error => console.error('có lỗi trong việc lấy các product đã đc áp dụng voucher:', error));
        }
        
    }, [voucher_id]); // Empty dependency array to run once on mount

    const handleSaveVoucherProduct = (e) => {
        e.preventDefault();
        lsSelectproducts.map(product=>(
            axios.post(`${apiUrl}/api/productVouchers`, {
                voucher_id:voucher_id,
                product_id: product.product_id,
                productVoucher_dsc:productVoucher_dsc,
            })
            .then(response => {
                onClose();
            })
            .catch(error => console.error('Error creating voucher:', error))
        ))
        
    }

    const HandleonChange = (product) => {
        let getproduct = lsSelectproducts.some(item=>item?.product_id==product.product_id);
        console.log(getproduct)
        if(getproduct){
            let product_coppy = lsSelectproducts.filter(item=>item.product_id!==product.product_id);
            setlsSelectproducts(product_coppy);
        }else{
            let product_coppy = [...lsSelectproducts];
            setlsSelectproducts([...product_coppy,product])
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
                {products!==null?
                products.map(item=>(
                <div className='row align-items-center'>
                    <div className='col-md-2'>
                        <input
                            type="checkbox"
                            checked={lsSelectproducts.some(product=>product.product_id==item.product_id)}
                            onChange={(e) => HandleonChange(item)}
                        />
                    </div>
                    <div className='col-md-6'>
                        <label className="name"><b>{item.product_name}</b></label>
                    </div>
                    <div className='col-md-4'>
                        <image style={{width :'50px', height:'50px'}} className="name"><b>{item.product_img}</b></image>
                    </div>
                    
                </div>
                ))
                :
                ''
                }
                <div className='col-md-2'>
                        <input
                            type="text"
                            value={productVoucher_dsc}
                            onChange={(e) => setproductVoucher_dsc(e.target.value)}
                            required
                        />
                    </div>
                <button type="submit" className="btn btn-primary">Lưu</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
            </form>
        </div>
    );

}


export default VoucherProduct;
