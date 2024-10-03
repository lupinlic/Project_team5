import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ShippingForm = ({receiverId, onUpdate, onClose}) => {
  // console.log(receiverId)
    const [userId, setUserId] = useState(null);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedCommune, setSelectedCommune] = useState('');
   const type= 0;
    // const [receiver_name, setreceiver_name] = useState('');
    // const [receiver_phone, setreceiver_phone] = useState('');
    // const [receiver_dsc, setreceiver_dsc] = useState('');
    const userData = localStorage.getItem('user');
    useEffect(() => {
          
      const parsedUser = JSON.parse(userData);
      setUserId(parsedUser.user_id);

    }, []);
    
    const [receiver, setReceiver] = useState({
      user_id : userId,
      receiver_name: '',
      receiver_phone: '',
      receiver_city: '',
      receiver_district: '',
      receiver_commune: '',
      receiver_dsc: '',
      receiver_type:type,
    });
    

// đổ địa chỉ theo id
useEffect(() => {
  if (receiverId) {
    axios.get(`http://localhost:8000/api/receivers/${receiverId}`)
      .then(response => {
        setReceiver(response.data.data);
      })
  }else {
    // Reset form khi không có supplierId (thêm mới)
    setReceiver({
      user_id : userId,
      receiver_name: '',
      receiver_phone: '',
      receiver_city: '',
      receiver_district: '',
      receiver_commune: '',
      receiver_dsc: '',
      receiver_type: type,
    });
  }
}, [receiverId]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setReceiver({
    ...receiver,
    [name]: value
  });
};



    // Lấy danh sách Tỉnh khi component được load
  useEffect(() => {
    axios.get('https://api.mysupership.vn/v1/partner/areas/province')
      .then(response => {
        setProvinces(response.data.results);
        
      })
      .catch(error => {
        console.error('Error fetching provinces:', error);
      });
  }, []);

  // Lấy danh sách Huyện khi chọn Tỉnh
  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    const provinceName=provinces.find(province => province.code === e.target.value);
    console.log(provinceName.name)
    setSelectedProvince(provinceName.name);


    setSelectedDistrict(''); // Reset huyện
    setCommunes([]); // Reset xã
    
  setReceiver({
    ...receiver,
    receiver_city:provinceName.name
    
  });

    if (provinceId) {
      axios.get('https://api.mysupership.vn/v1/partner/areas/district', {
        params: { province: provinceId }
      })
      .then(response => {
        setDistricts(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching districts:', error);
      });
    } else {
      setDistricts([]);
    }
  };

  // Lấy danh sách Xã khi chọn Huyện
  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    const districtName=districts.find(district => district.code === e.target.value);
    setSelectedDistrict(districtName.name);
    setReceiver({
      ...receiver,
      receiver_district:districtName.name
      
    });
    

    if (districtId) {
      axios.get('https://api.mysupership.vn/v1/partner/areas/commune', {
        params: { district: districtId }
      })
      .then(response => {
        setCommunes(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching communes:', error);
      });
    } else {
      setCommunes([]);
    }
  };
  const handleCommuneChange = (e) => {
    const communeId = e.target.value;
    const communeName=communes.find(commune => commune.code === e.target.value);
    setSelectedCommune(communeName.name); 
    setReceiver({
      ...receiver,
      receiver_commune:communeName.name
      
    });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
   
    
    if (receiverId) {
      // Gọi API sửa nhà cung cấp
      setTimeout(() => {
        console.log(receiver)
        axios.put(`http://localhost:8000/api/receivers/${receiverId}`, receiver)
        .then(response => {
          onUpdate(); 
          onClose(); // Cập nhật danh sách sau khi sửa
        })
      },3000);
     
        
    } else {
      // Gọi API thêm nhà cung cấp mới
      setTimeout(() => {
        console.log(userId)
        console.log(receiver)
  
      axios.post('http://localhost:8000/api/receivers', receiver)
        .then(response => {
        
          setReceiver({
            user_id : userId,
            receiver_name: '',
            receiver_phone: '',
            receiver_city: '',
            receiver_district: '',
            receiver_commune: '',
            receiver_dsc: '',
            receiver_type: type,
          });
          onUpdate(); 
          onClose(); // Cập nhật danh sách sau khi thêm
        })
      }, 3000); 
    }
  
    
  };
 

    return ( 
        <>
        <div className="form-popup">
        <form onSubmit={handleSubmit}>
            <h5>Địa chỉ mới</h5>
            <div className="d-flex mt-3 form-popup1" style={{justifyContent:'space-between'}}>
                <input type="text" placeholder="Họ tên" name='receiver_name' value={receiver.receiver_name} onChange={handleChange}></input>
                <input type="text" placeholder="Số điện thoại" name='receiver_phone' value={receiver.receiver_phone} onChange={handleChange}></input>
            </div>
            <div className="mt-3 form-popup2" >
                <select id="city" name="receiver_city" class="form-control" value={selectedProvince} onChange={handleProvinceChange}>
                <option value={receiver.receiver_city} disabled selected >{receiver.receiver_city}</option>
                {provinces.map(province => (
                    <option key={province.code} value={province.code}>{province.name}</option>
                ))}
                </select>
                <select id="city" name="receiver_district" class="form-control" value={selectedDistrict} onChange={handleDistrictChange}>
                <option value={receiver.receiver_district} disabled selected>{receiver.receiver_district}</option>
                {districts.map(district => (
                    <option key={district.code} value={district.code}>{district.name}</option>
                ))}
                </select>
                <select id="city" name="receiver_commune" class="form-control" value={selectedCommune} onChange={handleCommuneChange}>
                <option value={receiver.receiver_commune} disabled selected >{receiver.receiver_commune}</option>
                {communes.map(commune => (
                    <option key={commune.code} value={commune.code}>{commune.name}</option>
                ))}
                </select>
            </div>
            <div className=" mt-3 form-popup3" >
                <input type="text" placeholder="Địa chỉ cụ thể" name='receiver_dsc' value={receiver.receiver_dsc} onChange={handleChange}></input>
                
            </div>

            <div className="bt-them"><button>+ Thêm vị trí</button></div>

            <div className="d-flex">
                <input className="form-check-input me-2" type="checkbox" defaultValue id="squareCheckbox" />
                <p>Đặt làm địa chỉ mặc định</p>
            </div>



        <button type="submit" className="btn btn-primary">Lưu</button>
        <button type="button" className="btn btn-secondary"  onClick={onClose}>Đóng</button>
        </form>
        </div>
        </>
     );
};

export default ShippingForm;