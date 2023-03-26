import React, {useRef, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { TruckId } from './Truck';

import { EndCacheId } from './GetQuestion';

export let buttonQuiz = "";
export let ButtonShowCorrectAnswer = "";

let MAX_POINT = 9;

export const QuizGetImage = ({onPress, isClick,setButtonState}) => {

  const [buttonClick, setButtonClick] = useState(false);
  const [data, setData] = useState([]);
  const API_URL = `/quiz-pages?fire-truck=${TruckId}`;
  const navigate = useNavigate();


  setButtonState(buttonClick)
  buttonQuiz = useRef();
    


  ButtonShowCorrectAnswer = (isClick, setIsClick, score,setScore,navigate) => {
    let buttonsElement = document.querySelectorAll('.quiz_button');
    const buttonsElementArray = Array.from(buttonsElement)
    setIsClick(!isClick);
  
    if(score === MAX_POINT) {
      navigate('/result');
    }
  if(isClick) {
    buttonsElementArray.forEach(button => {
  
  
      if(EndCacheId == button.name){
      button.style.color = "yellow";
      button.style.pointerEvents = "none";
      button.style.display = "block";
  
      }else {
        button.style.pointerEvents = "none";
        button.style.display = "none";
  
      }
    })
  
  }
  else {
  
    buttonsElementArray.forEach(button => {
      button.style.color = "black";
      button.style.display = "block";
      button.style.pointerEvents = "auto";
      setScore(score + 1);
    })
  
  }
  } 
  <ButtonShowCorrectAnswer/>


  useEffect(() => {
    if(!TruckId) navigate('/')
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setData(data));
  }, [API_URL]);



  return (
    <>
    {buttonClick ? "" : <button onClick={() => setButtonClick(true)} className='popupButton'>Zacznij Quiz</button>}
    {!buttonClick && (
        <style>
          {`
            html {
              overflow: hidden;
            }
          `}
        </style>
      )}


    {Object.keys(data).map(key => (
    <div className="boxElement" key = {key}>
      <div className="quiz_container">
     
     <img key = {key}src= {`../${data[key].sideImagePath}`} alt="track"/> 

      {data[key].caches.map(({cacheID,cacheName, cacheRectangle}) => (
        <button ref = {buttonQuiz} name = {cacheID} onClick = {onPress} className="quiz_button"  style = {{
          "width": `${cacheRectangle.size.x* 100}%`,
          "height": `${cacheRectangle.size.y * 100}%`,
          "left": `${cacheRectangle.leftBottomPoint.x * 100}%`,
          "bottom": `${cacheRectangle.leftBottomPoint.y * 100}%`,
        }}>{cacheName}</button>
        ))}
      </div>
      </div> 
     
  ))}
    </>
     
  );
}