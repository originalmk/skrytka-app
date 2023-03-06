import React, {useContext} from 'react';

import { AppContext } from './AppContext';

import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import FooterQuiz from './FooterQuiz';



const BottomFPage = () => {


  const {unitOsp} = useContext(AppContext);


  

  const buttonShow = unitOsp ? <div className='imgArrow'>
  <Link to = {`/${unitOsp}`}>
 <i id ='fa-solid' className="fa-solid fa-arrow-right"></i>
 </Link>
 </div> 
   : "";

 return (
  <>
      {buttonShow}

      
    
   
   
     
     
 
  </>
 ) 
}

export default BottomFPage;
