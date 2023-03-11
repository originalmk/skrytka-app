import { TruckId } from "./Truck";
import { AppContext } from './AppContext';
import React, {useContext, useEffect, useState} from 'react';
import { ButtonShowCorrectAnswer } from "./GetImageAndQuestion";
export let EndCacheId = "";
export let EndCorrectAnswer = "";

 
const FetchData = ({isClick,score,setIsClick,setScore,navigate}) => {


    useEffect(() => {
      fetch(`/random-question?fire-truck=${TruckId}`)
      .then(res => res.json())
      .then(dataQuestion => {
        if(isClick === true) {
        const propertValuesObjectFromDb = Object.values(dataQuestion);
          EndCorrectAnswer = propertValuesObjectFromDb[1];

          EndCacheId = propertValuesObjectFromDb[0];
        }
        
      })
    })
  
  
   

    
  
  
    return (
      <>
     
      <div className="questionDiv">
      <h1 className='questionText1'>{EndCorrectAnswer}</h1>  
      <button onClick={() => ButtonShowCorrectAnswer(isClick, setIsClick , score , setScore, navigate)} className='NextQuestionButton'>{isClick ? "Pokaż odpowiedź" : "Następne pytanie"}</button>
        </div>
      </>
     
    )
}


export const QuizGetQuestion = ({score,isClick,setScore,setIsClick,navigate}) => {
  return (
    <FetchData score = {score} isClick = {isClick} setScore = {setScore} setIsClick = {setIsClick} navigate = {navigate}/>
  )

}

