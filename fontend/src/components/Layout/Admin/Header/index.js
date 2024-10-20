import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link } from 'react-router-dom';
import { faList,faSearch,faBell,faChevronDown,faCog,faUser,faLock,faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import './style.css'
import axios from 'axios';
import React, { useState, useEffect, useRef  } from 'react';
// import logo from '../../../../assets/img/logo8.png';

function Header() {

    // đăng xuất
    const handleLogout = () => {
        axios.get('http://localhost:8000/api/user/logout')
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        
        
        // Chuyển hướng về trang đăng nhập
        // window.location.href = '/Login';
    };

    // account
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const settingsRef = useRef(null);
    const toggleSettings = () => {
        setIsSettingsOpen(prev => !prev);
        
      };
      const handleClickOutside = (event) => {
        if (settingsRef.current && !settingsRef.current.contains(event.target)) {
          setIsSettingsOpen(false);
        }
      };
    
      // Thêm và gỡ bỏ sự kiện click ngoài khi component mount/unmount
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);


    //   setting
    const [isMenuOpen, setIsMenuOpen] = useState(false);

        const openMenu = () => {
            setIsMenuOpen(true);
        };

        const closeMenu = () => {
            setIsMenuOpen(false);
        };

        // toggle
        const [isToggled, setIsToggled] = useState(false);

        // Hàm xử lý khi người dùng nhấn vào toggle
        const handleToggle = () => {
            setIsToggled(prevState => !prevState);
        };
        const [isToggled2, setIsToggled2] = useState(false);

        // Hàm xử lý khi người dùng nhấn vào toggle
        const handleToggle2 = () => {
            setIsToggled2(prevState => !prevState);
        };
        document.body.className = isToggled2 ? 'dark-mode' : 'light-mode';
        
    return ( 
        <div>
            <Helmet>
                <link href="https://fonts.googleapis.com/css2?family=Style+Script&display=swap" rel="stylesheet" />
                <link  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
            </Helmet>
            <div className="container">
                <div className="header row" style={{height:'70px',alignItems:'center'}}>
                    <div className="col-md-2">
                        <img className='' style={{width: 50, borderRadius: '50%',}} src=''  alt />
                        <span style={{fontFamily: '"Style Script"', fontSize: 24,marginLeft:8}}>Eight Store</span>
                    </div>
                    <div className="col-md-6 d-flex " style={{alignItems:'center'}}>
                        <FontAwesomeIcon icon={faList}  style={{color:'#62677399'}}/>
                        <div className='search' style={{marginLeft:'12px'}}>
                            <input type="text" placeholder="Search" style={{outline:'none',border:'none',position:'relative'}}></input>
                            <span style={{color:'#62677399',position:'absolute',left:'520px'}}><FontAwesomeIcon icon={faSearch}/></span>
                        </div>
                    </div>
                    <div className="col-md-1 text-end">
                        <FontAwesomeIcon icon={faBell} style={{color:'#62677399'}}/>
                    </div>
                    <div className="col-md-2 account " onClick={toggleSettings} ref={settingsRef} style={{position:'relative',cursor:'pointer'}}>
                        <img className='' style={{width: 50, borderRadius: '50%',}} src='https://e7.pngegg.com/pngimages/754/474/png-clipart-computer-icons-system-administrator-avatar-computer-network-heroes-thumbnail.png'  alt />
                        <span style={{ fontSize: 16,color:'#62677399',marginLeft:'4px'}}>Admin</span>
                        <span style={{ fontSize: 16,color:'#62677399',marginLeft:'4px'}}><FontAwesomeIcon icon={faChevronDown}/></span>
                        {isSettingsOpen && (
                            <div className='account_child' style={{position:'absolute',marginTop:'12px',padding:'8px',background:'#dedede'}}>
                                <h6>Welcome!</h6>
                                <ul >
                                    <li><Link to=''><FontAwesomeIcon style={{paddingRight:'8px' ,color:'#62677399',textDecoration:'none'}} icon={faUser}/>Profile</Link></li>
                                    <li><Link to=''><FontAwesomeIcon style={{paddingRight:'8px' ,color:'#62677399',textDecoration:'none'}} icon={faCog}/>Settings</Link></li>
                                    <li><Link to=''><FontAwesomeIcon style={{paddingRight:'8px' ,color:'#62677399',textDecoration:'none'}} icon={faLock}/>Lock Screen</Link></li>
                                    <li className='pt-2'><Link to='/Login'><FontAwesomeIcon style={{paddingRight:'8px' ,color:'#62677399',textDecoration:'none'}} icon={faSignOutAlt}
                                        onClick={(e) => { 
                                        handleLogout();
                                        }}
                                    />Logout</Link></li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="col-md-1">
                        <span><FontAwesomeIcon icon={faCog} style={{color:'#62677399'}} onClick={openMenu}/></span>
                    </div>

                    {/* setting */}
                    <div id="overlay" onClick={closeMenu} style={{
                        opacity: isMenuOpen ? '1' : '0',
                        visibility: isMenuOpen ? 'visible' : 'hidden',
                        transition: 'opacity 0.3s, visibility 0.3s',
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: '10'
                        }}>
                    </div>
                    <div id="menuContainer" 
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: isMenuOpen ? '0' : '-300px',
                            width: '300px',
                            height: '100%',
                            backgroundColor: '#fff',
                            transition: 'right 0.3s',
                            zIndex: '20'
                        }}>
                        <span id="closeButton" onClick={closeMenu}>×</span>
                        <div className='mt-4'>
                            <img src='https://coderthemes.com/simple/layouts/vertical/assets/images/layouts/light.png' className='w-100 p-2'/>
                            <div style={{display:'flex'}}>
                                <div onClick={handleToggle}
                                    style={{
                                    width: '60px',
                                    height: '30px',
                                    backgroundColor: isToggled ? '#4CAF50' : '#ccc',
                                    borderRadius: '30px',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    transition: 'background-color 0.3s ease'
                                    }}>
                                    <div 
                                    style={{
                                        width: '26px',
                                        height: '26px',
                                        backgroundColor: 'white',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '2px',
                                        left: isToggled ? '32px' : '2px',
                                        transition: 'left 0.3s ease'
                                    }}>
                                    
                                    </div>
                                    
                                </div>
                                <p>Light Mode</p>
                            </div>
                            
                        </div>
                        <div className='mt-4'>
                            <img src='https://coderthemes.com/simple/layouts/vertical/assets/images/layouts/dark.png' className='w-100 p-2'/>
                            <div style={{display:'flex'}}>
                                <div onClick={handleToggle2}
                                    style={{
                                    width: '60px',
                                    height: '30px',
                                    backgroundColor: isToggled2 ? '#4CAF50' : '#ccc',
                                    borderRadius: '30px',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    transition: 'background-color 0.3s ease'
                                    }}>
                                    <div 
                                    style={{
                                        width: '26px',
                                        height: '26px',
                                        backgroundColor: 'white',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '2px',
                                        left: isToggled2 ? '32px' : '2px',
                                        transition: 'left 0.3s ease'
                                    }}>
                                    
                                    </div>
                                    
                                </div>
                                <p>Dark Mode</p>
                            </div>
                            
                        </div>

                    </div>
                    {/* end setting */}
                    

                </div>

            </div>
        </div>
     );
}

export default Header;