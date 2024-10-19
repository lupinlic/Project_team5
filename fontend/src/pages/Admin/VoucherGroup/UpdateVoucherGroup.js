import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateVoucherGroup({GetAllVoucherGroup,onClose,voucherGroup_id}) {
    const [imageSrc, setImageSrc] = useState('https://png.pngtree.com/png-vector/20190820/ourlarge/pngtree-no-avatar-vector-isolated-on-white-background-png-image_1694546.jpg'); // Ảnh mặc định
    const [voucherGroup_name, setvoucherGroup_name] = useState('');
    const [voucherGroup_dsc, setvoucherGroup_dsc] = useState('');
    const [voucherGroup_img, setvoucherGroup_img] = useState(null);
    const [voucherGroup, setvoucherGroup] = useState(null);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/voucherGroups/${voucherGroup_id}`)
          .then(response =>{
            setvoucherGroup(response.data.data);
            setvoucherGroup_name(response.data.data.voucherGroup_name)
            setvoucherGroup_dsc(response.data.data.voucherGroup_dsc)
            setImageSrc(`http://localhost:8000/uploads/VoucherGroup/${response.data.data.voucherGroup_img}`)
        })
          .catch(error => console.error('Error fetching categories:', error));
    },[])

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          setImageSrc(URL.createObjectURL(file)); // Hiển thị ảnh tạm thời
          setvoucherGroup_img(file);
        }
      };

      const handleSubmit = (e) =>{
        e.preventDefault();
        //thực hiện 2 việc 1 là gửi ảnh uploads lên server của đối tượng voucherGroup
        let formdata = new FormData();
        formdata.append('_method','PUT');

        if(voucherGroup_img!==null){
            formdata.append('img',voucherGroup_img);
        }
        formdata.append('voucherGroup_name',voucherGroup_name);
        formdata.append('voucherGroup_dsc',voucherGroup_dsc);
        console.log(formdata.get('voucherGroup_name'))

        axios.post(`http://localhost:8000/api/voucherGroups/${voucherGroup_id}`,formdata)
          .then(response =>{
            GetAllVoucherGroup();
            onClose();
        })
          .catch(error => console.error('Error fetching voucherGroup:', error));
    
    }

  return (
    <div className="form-popup " style={{width:'800px'}}>
        <form onSubmit={handleSubmit} className="form-container" encType='multipart/form-data'>
            <h5>Thông tin nhóm voucher</h5>
            <div className='container mb-3'>
                <div className='row'>
                    <div className='col-md-8'>
                        <label className="name mt-1 mb-0">Tên nhóm voucher</label>
                        <input
                            type="text"
                            placeholder="Nhập tên nhóm voucher"
                            name="product_name"
                            value={voucherGroup_name}
                            onChange={(e)=>setvoucherGroup_name(e.target.value)}
                            required
                        />

                        <label className="name mt-1 mb-0">Mô tả nhóm voucher</label>
                        <input
                            type="text"
                            placeholder="Nhập mô tả"
                            name="product_price"
                            value={voucherGroup_dsc}
                            onChange={(e)=>setvoucherGroup_dsc(e.target.value)}
                            required
                        />
                    </div>
                    <div className='col-md-4'>
                        <div style={{width:'250px',height:'250px'}}>
                            <img className='w-100' src={imageSrc} alt="Ảnh sản phẩm" />
                        </div>
                        <input type="file" onChange={handleImageUpload} />
                        
                    </div>
                </div>

            </div>


            <div>
                <button type="submit" className="btn btn-primary">Lưu</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateVoucherGroup
