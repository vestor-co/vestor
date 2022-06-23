import React from 'react'
import { useState } from 'react'
import './vestcont.css'
import { useContractWrite } from 'wagmi'

export default function Vestcont() {

    const [serviceList, setServiceList] = useState([{service: ""},])

    const handleServiceAdd =() => {
        setServiceList([...serviceList ,{service: ""}])
    }

    const handleServiceRemove =(index) => {
        const list = [...serviceList];
        list.splice(index,1);
        setServiceList(list)
    }
    const handleServiceChange =(e , index ) =>{
        const {name , value } = e.target
        const list = [...serviceList];
        list[index][name] = value;
        setServiceList(list);
    }
    const [start, setStart] = useState('');
    const [period, setPeriod] = useState('');
    const [cliff, setCliff] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = e =>{
        e.preventDefault();
        const info={ start , period, cliff, amount, serviceList};
    
        console.log(info);
      }
    
        
        
  return (
    <>
    <div className="vestcontent">
       
        
        
        <div className="vstforms">
            <form onSubmit={handleSubmit} className='forms' >
            <div className="vesthead">
            <div className="vst-txt">
            <p>Enter Vesting Details</p>

            </div>
            <div className="vstinp">
                
                <label >Start Time</label>
                <input type="date" 
                required
                value={start}
                onChange={(e) => setStart(e.target.value)}
                />
                 
                 <label > Vesting period</label>
                 <input type="number" 
                 required
                 value={period}
                 onChange={(e) => setPeriod(e.target.value)}
                 />
                
                <label> Cliff period</label>
                <input type="number" 
                required
                value={cliff}
                onChange={(e)=> setCliff(e.target.value)}
                />
                
                
            </div>
        </div>
                <div className="form-field">
                    {/* <label htmlFor="service">Adress</label> */}

                    {serviceList.map((singleService,index)=>(

                    <div key={index}className="services">
                        <div className="first-division">
                            <label >Adress</label>
                            <input className='Vestinput' type="text" name='service' id='service' required 
                            value={singleService.service}
                            onChange={(e) => handleServiceChange (e, index , e.target.value)}
                            />
                            
                            <label >Amount</label>
                            <input type="number" name="amount" id="amount" 
                            required
                            value={amount}
                            onChange={(e)=> setAmount(e.target.value)}
                            
                            />
                            
                           
                            <hr  className='inpthr'/>
                            {serviceList.length -1 === index &&  (
                            <button 
                            type='button' 
                            className='add-btn'
                            onClick={handleServiceAdd}
                            >
                                <span>+</span>
                            </button>
                            )}
                            </div>
                            
                        <div className="second-division">
                            {serviceList.length >1 &&(
                            <button type='button' 
                            className="remove-btn"
                            onClick={ () => handleServiceRemove (index)}
                            
                            >
                                <span>-</span>
                            </button>)}
                            
                            
                        </div>
                    </div>
                    
                    ))}
                    
                </div>

                <button>Upload</button>
            </form>
        </div>
    </div>
    </>
  )
}
