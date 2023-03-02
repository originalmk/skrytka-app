import React, {useContext, useState ,useRef, useEffect} from 'react';
import { AppContext } from './AppContext';
const SearchBox = () => {

 
  const {unitOsp, isContainerActive, setunitOsp,setIsContainerActive,localization} = useContext(AppContext);
  const [value, setValue] = useState("");
  const inputSearchRef = useRef(true);

 

  const handleChangeInput = (e) => {
    if(e.target.value === "") return
      fetch(`/osp-units?locality=${e.target.value}`)
        .then(data => data.json())
        .then(data1=> {
          console.log(data1)
          data1.map(locality => {
              console.log(locality.locality);
              let localityArray = [];
              localityArray.push(locality.locality);
              let tasks = localityArray.filter(localization => localization.toLowerCase().includes(e.target.value.toLowerCase()));
              console.log(tasks);
              setIsContainerActive(true);
              setValue(tasks); 
          })
        })
   

      
  }

  const OptionJSXTag = () => {
    let showListFromArray;
    if(value.length > 0){
     showListFromArray = value.map((item, index) => {
      

        return (
          <div onClick={handleLabelClick} name={item} key={index} className="option">
            <input type="radio" className="radio" name="localization" />
           {item}
  
          </div>
        )
  
      })
        
    }
   


    return (
      showListFromArray
    )
  }
    
    


  const handleLabelClick = (e) => {
    const nameOfUnit = e.target.getAttribute('name');
    setunitOsp(nameOfUnit);
    setIsContainerActive(!isContainerActive);
    inputSearchRef.value = "";
  }
  
  


  const unitOspActive = unitOsp ? `Wybrana jednostka OSP: ${unitOsp}` : "Wyszukaj jednostkę OSP aby kontynuować";


  return (
    <div className="select-box">

              <h3 className='OspUnitText'>{unitOspActive}</h3>

       
             
                <input onChange={handleChangeInput} className='inputSearch' ref = {inputSearchRef} type="text" placeholder='Search' />
             
           
         

            
          <div className={`options-container${isContainerActive ? " active" : ""}`}>
            <ul className='ulInputSearch'>
              
            </ul>

            <OptionJSXTag/>
          </div>


        
        </div>
  )
}

export default SearchBox;