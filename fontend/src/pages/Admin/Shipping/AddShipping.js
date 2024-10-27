import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config';


const AddShipping = ({ onUpdate, onClose  }) => {
  
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState(null);

  const [shipping, setshipping] = useState(null);
  const [shipping_name, setshipping_name] = useState('');
  const [shipping_price, setshipping_price] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
      axios.post(`${apiUrl}/api/shippings`, {
        ...shipping,
        shipping_name:shipping_name,
        shipping_price:shipping_price,
      })
        .then(response => {
          onUpdate();
          onClose();
        })
        .catch(error => console.error('Error adding product:', error));
  };
  


  // Lấy danh sách tỉnh thành
  useEffect(() => {
    axios.get('https://api.mysupership.vn/v1/partner/areas/province')
      .then(response => {
        setProvinces(response.data.results);
        
      })
      .catch(error => {
        console.error('Error fetching provinces:', error);
      });
  }, []);

  // Lấy danh sách quận/huyện khi chọn tỉnh
  const handleProvinceChange = (provinceCode) => {
    let parsprovinceCode = JSON.parse(provinceCode);
    axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${parsprovinceCode.code}`)
      .then(response => {
        setDistricts(response.data.results);
        setSelectedProvince(parsprovinceCode.name);
      })
      .catch(error => {
        console.error('Error fetching districts:', error);
      });
  };

  // Lấy danh sách xã/phường khi chọn huyện
  const handleDistrictChange = (districtCode) => {
    let parsdistrictCode = JSON.parse(districtCode);

    axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${parsdistrictCode.code}`)
      .then(response => {
        setWards(response.data.results);
        setSelectedDistrict(parsdistrictCode.name);
      })
      .catch(error => {
        console.error('Error fetching wards:', error);
      });
  };

  const handleWardChange = (commune_name) => {
    let parsprovinceCode = JSON.parse(commune_name);

    setSelectedWard(parsprovinceCode.name);
  };


  useEffect(()=>{
    if(selectedWard!==null){
      setshipping({
        shipping_cityName:selectedProvince,
        shipping_districtName:selectedDistrict,
        shipping_communeName:selectedWard,
      })
    }
  },[selectedWard])

  return (
    <>
<div className="form-popup">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <h4>Điền thông tin vận chuyển</h4>
            <div className="mt-3 form-popup2" >
                <select id="city" name="shipping_city" class="form-control" onChange={(e)=>handleProvinceChange(e.target.value)}>
                <option value={''} hidden>Chọn thành phố</option>
                {provinces?.map(province => (
                    <option key={province.code} value={JSON.stringify({code:province.code,name:province.name})}>{province.name}</option>
                ))}
                </select>
                <select id="city" name="shipping_district" class="form-control" onChange={(e)=>handleDistrictChange(e.target.value)}>
                <option value={null} hidden>Chọn Quận/Huyện</option>
                {districts?.map(district => (
                    <option key={district.code} value={JSON.stringify({code:district.code,name:district.name})}>{district.name}</option>
                ))}
                </select>
                <select id="city" name="shipping_commune" class="form-control" onChange={(e)=>handleWardChange(e.target.value)}>
                <option value={''} hidden>Chọn Phường/Xã</option>
                {wards?.map(commune => (
                    <option key={commune.code} value={JSON.stringify({code:commune.code,name:commune.name})}>{commune.name}</option>
                ))}
                </select>
            </div>
            <div className=" mt-3 form-popup3" >
                <input type="text" placeholder="Tên đơn vị vận chuyển" name='shipping_name' value={shipping_name} onChange={(e)=>setshipping_name(e.target.value)} required></input>
            </div>

            <div className=" mt-3 form-popup4" >
                <input type="text" placeholder="Giá đơn vị vận chuyển" name='shipping_price' value={shipping_price} onChange={(e)=>setshipping_price(e.target.value)} required></input>
            </div>

        <button type="submit" className="btn btn-primary">Lưu</button>
        <button type="button" className="btn btn-secondary"  onClick={onClose}>Đóng</button>
        </form>
        </div>
</>

  );
}
export default AddShipping;