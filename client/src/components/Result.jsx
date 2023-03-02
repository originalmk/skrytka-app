import React from 'react';
import { endScore } from './QuizGame';
import { SecondSeconds } from './Timer';
import { SecondMinutes } from './Timer';

import { useNavigate } from 'react-router-dom';
import Conffetti from './Conffetti';

import { link } from './QuizGame';
import { InformationTrackFromDB } from './Truck';
const UpdateTrackScore = () => {
    InformationTrackFromDB.forEach(track => {
      if(link ===  track.img.split(/\.(?=[^\.]+$)/)[0].slice(18)){ 
        track.progress = endScore * 10
      }
      
    })
}


const Result = () => {

  const navigate = useNavigate();
  UpdateTrackScore();
  return (
    <>
      <div className="container">
     
     <h1 className='congratulationh2'>Koniec</h1>
     <h2>W quizie uzyskałeś/aś: </h2>

    <h3>{{endScore}/10 < 9 ? "Jesteś szybki.. ale pożar jest szybszy" : "Brawo udało ci się ugasić pożar"}</h3>
     <button id = "resultButton" className='NextQuestionButton' onClick = {() => navigate(-1)}>Zagraj jeszcze raz</button>
     <button id = "resultButton1" className='NextQuestionButton'onClick={() => navigate('/')}>Wróć do strony głównej</button>

     <h2>Twój czas wyniósł: {SecondMinutes}:{SecondSeconds} </h2>
     <h2>Łącznie udało ci się zdobyć: {endScore}/10</h2>
     <h2>Roznieć zapał, rozwiązuj quizy, i podziel się wynikiem ze znajomymi</h2>
   
     <Conffetti/>
     
   </div>


 

    </>
 
  )
}
export default Result;