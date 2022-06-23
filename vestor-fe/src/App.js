import './App.css';
import Home from './my pages/home/Home';
import {
 Routes , // instead of "Switch"
  Route,
} from "react-router-dom"
import Main from './my pages/getstarted/maincontent/Main';
import Vest from './my pages/vesting page/Vest';
import Claim from './my pages/claim/Claim';


function App() {
  return (
    <>
 
 
 <Routes>
<Route path='/' element={<Home />}/> 
<Route path='/Main' element={<Main />}/> 
<Route path='/Vest' element={<Vest />}/> 
<Route path='/Claim' element={<Claim />}/> 

</Routes>
</>
  );
}

export default App;
