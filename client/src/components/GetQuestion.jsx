import { TruckId } from "./Truck";
import { AppContext } from './AppContext';
import React, {useContext, useEffect, useState, useReducer} from 'react';
import { ButtonShowCorrectAnswer } from "./GetImageAndQuestion";
export let EndCacheId = "";
export let EndCorrectAnswer = "";
let clickcounter = 0;

const FetchData = ({isClick,score,setIsClick,setScore,navigate}) => {
  if(clickcounter < 3)
    clickcounter++;


    useEffect(() => {
      fetch(`/random-question?fire-truck=${TruckId}`)
      .then(res => res.json())
      .then(dataQuestion => {
        const propertValuesObjectFromDb = Object.values(dataQuestion);

        if(clickcounter === 1)
          EndCorrectAnswer = propertValuesObjectFromDb[1];
          EndCacheId = propertValuesObjectFromDb[0];

        if(!isClick){
            EndCorrectAnswer = propertValuesObjectFromDb[1];
            EndCacheId = propertValuesObjectFromDb[0];
        }
   
        
      })
    },[isClick])
    return (
      <>
     
      <div className="questionDiv">
      <h1 className='questionText1'>{EndCorrectAnswer}</h1>  
      <button onClick={() => ButtonShowCorrectAnswer(isClick, setIsClick , score , setScore, navigate)} className='NextQuestionButton'>{isClick ? "Pokaż odpowiedź"  : "Następne pytanie"}</button>
        </div>
      </>
     
    )
}
export const QuizGetQuestion = ({score,isClick,setScore,setIsClick,navigate}) => {
  return (
    <FetchData score = {score} isClick = {isClick} setScore = {setScore} setIsClick = {setIsClick} navigate = {navigate}/>
  )

}

