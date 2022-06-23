import Footer from "../../home/footer/Footer";
import Topbar from "../../home/topbar/Topbar";
import Inputbox from "./inputbox/Inputbox";
import'./main.css';


function Main() {
  return (
    <div className="inp-table">
        <Topbar/>
        <Inputbox/>
        <Footer/>
    </div>
  )
}

export default Main
