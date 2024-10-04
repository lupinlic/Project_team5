import Header from "./Header";
import Slider from "./Slider";
import './Header/style.css'
function Admin({children}) {
    return ( 
        <div style={{backgroundColor:'#efeff099'}}>
            <Header/>
            <div className="container">
                <div className="row">
                    <Slider/>
                    <div className="col-md-10 ad-main" >{children}</div>
                </div>
            </div>
           
        </div>
     );
}
export default Admin;