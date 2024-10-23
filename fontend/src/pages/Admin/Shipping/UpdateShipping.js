import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config';


const UpdateShipping = ({ shipping_send,onUpdate, onClose}) => {
  
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedProvince_code, setSelectedProvince_code] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDistrict_code, setSelectedDistrict_code] = useState(null);

  const [selectedWard, setSelectedWard] = useState(null);

  const [shipping, setshipping] = useState(null);
  const [shipping_name, setshipping_name] = useState('');
  const [shipping_price, setshipping_price] = useState('');

  useEffect(()=>{
    setshipping(shipping_send);
    setshipping_name(shipping_send.shipping_name);
    setshipping_price(shipping_send.shipping_price);
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    let getshipping = {
      ...shipping,
      shipping_name:shipping_name,
      shipping_price:shipping_price,
    }
      axios.put(`${apiUrl}/api/shippings/${shipping_send.shipping_id}`,getshipping)
        .then(response => {
          onUpdate();
          onClose(shipping_send.shipping_id);
        })
        .catch(error => console.error('Error adding product:', error));
  };
  


  // Lấy danh sách tỉnh thành
  useEffect(() => {
    axios.get('https://api.mysupership.vn/v1/partner/areas/province')
      .then(response => {
        setProvinces(response.data.results);
        let code = response.data.results.filter(city=>(city.name==shipping_send.shipping_cityName))
        setSelectedProvince_code(code[0].code)
      })
      .catch(error => {
        console.error('Error fetching provinces:', error);
      });
  }, []);

  useEffect(()=>{
    if(selectedProvince_code!==null){
      handleProvinceChange(JSON.stringify({code:selectedProvince_code,name:shipping_send.shipping_cityName}))
    }
  },[selectedProvince_code])

  // Lấy danh sách quận/huyện khi chọn tỉnh
  const handleProvinceChange = (provinceCode) => {
    let parsprovinceCode = JSON.parse(provinceCode);
    axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${parsprovinceCode.code}`)
      .then(response => {
        setDistricts(response.data.results);
        setSelectedProvince(parsprovinceCode.name);

        let code = response.data.results.filter(city=>(city.name==shipping_send.shipping_districtName))
        setSelectedDistrict_code(code[0].code)
      })
      .catch(error => {
        console.error('Error fetching districts:', error);
      });
  };
  useEffect(()=>{
    if(selectedDistrict_code!==null){
      handleDistrictChange(JSON.stringify({code:selectedDistrict_code,name:shipping_send.shipping_districtName}))
      handleWardChange(JSON.stringify({name:shipping_send.shipping_communeName}))
    }
  },[selectedDistrict_code])

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
    if(wards!==null && wards!==undefined){
      console.log(wards)
      setshipping({
        shipping_cityName:selectedProvince,
        shipping_districtName:selectedDistrict,
        shipping_communeName:selectedWard,
      })
    }
  },[wards])

  return (
    <>
<div className="form-popup">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <h4>Thông tin vận chuyển</h4>
            <div className="mt-3 form-popup2" >
                <select id="city" name="shipping_city" class="form-control" onChange={(e)=>handleProvinceChange(e.target.value)}>
                <option value={shipping?.shipping_cityName} hidden>{shipping?.shipping_cityName}</option>
                {provinces?.map(province =>{
                  if(province.name!==shipping?.shipping_cityName){
                    return  (
                      <option key={province.code} value={JSON.stringify({code:province.code,name:province.name})}>{province.name}</option>
                  )
                  }
                })}
                </select>
                <select id="city" name="shipping_district" class="form-control" onChange={(e)=>handleDistrictChange(e.target.value)}>
                <option value={shipping?.shipping_districtName} hidden>{shipping?.shipping_districtName}</option>
                {districts?.map(district => {
                  if(district.name!==shipping?.shipping_districtName){
                    return  (
                      <option key={district.code} value={JSON.stringify({code:district.code,name:district.name})}>{district.name}</option>
                  )
                  }
                })}
                </select>
                <select id="city" name="shipping_commune" class="form-control" onChange={(e)=>handleWardChange(e.target.value)}>
                <option value={shipping?.shipping_communeName} hidden>{shipping?.shipping_communeName}</option>
                {wards?.map(commune => {
                  if(commune.name!==shipping?.shipping_communeName){
                    return  (
                      <option key={commune.code} value={JSON.stringify({code:commune.code,name:commune.name})}>{commune.name}</option>
                  )
                  }
                })}
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
export default UpdateShipping;