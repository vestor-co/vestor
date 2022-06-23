import Topbar from "./topbar/Topbar"
import "./home.css"
import Homecontent from "./content/Homecontent"
import Footer from "./footer/Footer"


function Home() {
  return (
    <>
    <div className="home">

    <div className="components">

    <Topbar/>
    <Homecontent/>
    <Footer/>
    </div>
    </div>
    </>
  )
}

export default Home