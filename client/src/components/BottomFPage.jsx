import React, {useContext} from 'react';

import { AppContext } from './AppContext';

import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import FooterQuiz from './FooterQuiz';

const BottomFPage = () => {

  const [data, setData] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
  const url = '/osp-units?prefix=Gdańsk';
 useEffect(() => {
  fetch(url)
   .then((response) => {
      if(!response.ok){
        throw new Error(
          `PROBLEM ${response.status}`
        )
      }
      return response;
   })
   .then(data => console.log(data))
   .catch(err => console.log(err.message))
 }, []);

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

      
    
      <div className='FirstFooter'>Nie widzisz swojej jednostki? <li className='li-write-to-us'><a className='a-write-to-us' href = 'mailto:kontakt@janilowski.pl'> Napisz do nas!</a></li></div>   
     
     
 
  </>
 ) 
}

export default BottomFPage;
