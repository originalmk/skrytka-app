import React, { useEffect } from 'react';
import { endScore } from './QuizGame';
import { SecondSeconds } from './Timer';
import { SecondMinutes } from './Timer';
import { TruckId } from './Truck';
import { useNavigate } from 'react-router-dom';
import Conffetti from './Conffetti';

import  {  CircularProgressbar ,  buildStyles  }  from  'react-circular-progressbar' ;
import 'react-circular-progressbar/dist/styles.css';
export let points = endScore;
const Result = () => {
  console.log(TruckId, SecondSeconds, endScore)
  
    fetch('/quiz-results', {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({fireTruck: TruckId, seconds: SecondSeconds, points: endScore})
});

  const navigate = useNavigate();
  // UpdateTrackScore();


  return (
    <>
      <div className="container">
     


     <h1 className='endH1'>Koniec</h1>
     <h2 className='scoreYouWin'>W quizie uzyskałeś/aś: </h2>
     <div style = {{width: 180, height: 180}}>
     <CircularProgressbar 
     value={endScore * 10} 
     text={`${endScore * 10}%`} 
     styles = { buildStyles ( { 
     
      pathColor : `#d42436` , 
      textColor : 'black' , 
      trailColor : '#c6c4c4' , 
      backgroundColor : '#d42436' , 
    } ) }  />;
     </div>
  
    <h3 className='textDependsEndScore'>{{endScore}/10 < 9 ? "Jesteś szybki.. ale pożar jest szybszy" : "Brawo udało ci się ugasić pożar !!!"}</h3>


     <button id = "resultButton" className='NextQuestionButton' onClick = {() => {
        endScore = 0;
        navigate(-1)
     }}>Zagraj jeszcze raz</button>
     <button id = "resultButton1" className='NextQuestionButton'onClick={() => {
        endScore = 0;
        navigate('/');
     }}>Wróć do strony głównej</button>

     <h2 id='h2TimeResultPage'>Twój czas wyniósł:  
     <i id = 'hourglass' className="fa-regular fa-hourglass"></i> 
     {SecondMinutes}:{SecondSeconds < 10 ? `0${SecondSeconds}` : SecondSeconds} </h2>


     <h2 id='h2ScoreResult'>Łącznie udało ci się zdobyć: {endScore}/10 pkt</h2>


     <h4 className='textEndScreenShare'>Roznieć zapał, rozwiązuj quizy, i podziel się wynikiem ze znajomymi</h4>

     <div id = 'resultMedia'>

     <i className="fa-brands fa-facebook"></i>
     <i className="fa-brands fa-instagram"></i>
     <i className="fa-brands fa-youtube"></i>
   </div>
   
     <Conffetti/>
     
   </div>


 

    </>
 
  )

}
export default Result;