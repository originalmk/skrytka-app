import {useNavigate} from 'react-router-dom';
import React, {useState, useContext} from 'react';
import {QuizGetQuestion } from './GetQuestion';
import { QuizGetImage } from './GetImageAndQuestion';
import AppProvider, { AppContext } from './AppContext';
import { EndCacheId } from './GetQuestion';
import Timer from './Timer';
import FooterQuiz from './FooterQuiz';



export let link = "";
export let endScore = 0;

const NavigationQuiz = ({score,buttonState}) => {
  
  console.log(endScore)

 
  link = /[^/]*$/.exec(`${window.location.href}`)[0];
  const navigate = useNavigate();
  if(buttonState) {
    return (
      <div id = 'navigationQuiz' className='navigation'>
      <img onClick = {() => navigate(-1)} id = 'imgArrow' className='imgArrow' src="/img/arrow-turn.png" alt="arrow" />
      <div className="timer">
      <i className="fa-regular fa-hourglass"></i>
      <AppContext.Provider>
      <Timer/>
      </AppContext.Provider>
     
      </div>
        <h1 className = 'score'>{score}/10</h1>
       </div>
    )
  }
 
  
}








const QuizGame = () => {
  const navigate = useNavigate();
  const [score,setScore] = useState(0);
  const [isClick, setIsClick] = useState(true);
  const [buttonState, setButtonState] = useState(false);

  const ButtonNextQuestionClick = (e) => {
    setScore(score + 1);
    console.log(Number(e.target.name), EndCacheId)
    if(score === 9) 
      navigate("/result");
     else if (Number(e.target.name) === EndCacheId)
        endScore++;
  }
  

  return (
    <>
  

      <NavigationQuiz score = {score} buttonState = {buttonState} />
   
        <div className="question">
   
          <AppProvider>
          <QuizGetQuestion 
          isClick = {isClick} 
          setIsClick = {setIsClick} 
          score = {score}
          setScore = {setScore}
          navigate = {navigate}
           />  
         

          </AppProvider>
         
        </div>


      <div className="trackImgBox">
      <QuizGetImage 
      isClick = {isClick}  
      onPress={(e) => ButtonNextQuestionClick(e)}
      setButtonState = {setButtonState}/>
      </div>
      
     
      <FooterQuiz/>

    </>
   
  )
}


export default QuizGame;