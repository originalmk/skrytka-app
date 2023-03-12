
import React, {useRef, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { TruckId } from './Truck';

import { EndCacheId } from './GetQuestion';

export let buttonQuiz = "";
export let ButtonShowCorrectAnswer = "";



export const QuizDataImageFromDb = [
  {
    img: '',
    boxStyle: {
        name: "",
        top: "",
        left: "",
        height: "",
        width: "",
    },
    boxStyle1: {
      name1: "",
      top1: "",
      left1: "",
      height1: "",
      width1: "",
    },
      boxStyle2: {
        name2: "",
        top2: "",
        left2: "",
        height2: "",
        width2: "",
    },
    boxStyle3: {
      name3: "",
      top3: "",
      left3: "",
      height3: "",
      width3: "",
    }
  },
  {
    img: '',
    boxStyle: {
      name: "",
      top: "",
      left: "",
      height: "",
      width: "",
  },boxStyle1: {
    name1: "",
    top1: "",
    left1: "",
    height1: "",
    width1: "",
  },
    boxStyle2: {   
      name2: "",
      top2: "",
      left2: "",
      height2: "",
      width2: "",
    },
    boxStyle3: {   
      name3: "",
      top3: "",
      left3: "",
      height3: "",
      width3: "",
    },
  },
  {
    img: '../qweqweqsadqw',
    boxStyle: {
      name: "",
      top: "50%",
      left: "15%",
      height: "39%",
      width: "15.5%",
  },
  boxStyle1: {
    name1: "Dowódca 2",
    top1: "42%",
    left1: "32%",
    height1: "24%",
    width1: "18%",
  },
  boxStyle2: {
    name2: "Dowódca 1",
    top2: "52%",
    left2: "49%",
    height2: "39%",
    width2: "14%",
  },
  boxStyle3: {
    top2: "50%",
    left2: "49%",
    height2: "0",
    width2: "0",
  },

  },

  {
    img: '',
    boxStyle: {
      name: "",
      top: "42%",
      left: "50.5%",
      height: "41%",
      width: "18%",
  },
  boxStyle1: {},
  boxStyle2: {},
  boxStyle3: {},
  }
];




  

export const QuizGetImage = ({onPress, isClick,setButtonState}) => {
  buttonQuiz = useRef();
  const [buttonClick, setButtonClick] = useState(false);
  let imageArrayFromDB = [];
    setButtonState(buttonClick)
    //Nazwy 
   

////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
////////////////////////////
//          TEN CAŁY KOD JEST DO REFACTORU !!!
   

  let name0ArrayFromDB = [];
  let name1ArrayFromDB = [];
  let name2ArrayFromDB = [];
  let name3ArrayFromDB = [];

  const [name0Array] = useState([name0ArrayFromDB]);
  const [name1Array] = useState([name1ArrayFromDB]);
  const [name2Array] = useState([name2ArrayFromDB]);
  const [name3Array] = useState([name3ArrayFromDB]);


  // CACHE ID



  let cacheID0ArrayFromDB = [];
  let cacheID1ArrayFromDB = [];
  let cacheID2ArrayFromDB = [];
  let cacheID3ArrayFromDB = [];

  const [cacheID0Array] = useState([cacheID0ArrayFromDB]);
  const [cacheID1Array] = useState([cacheID1ArrayFromDB]);
  const [cacheID2Array] = useState([cacheID2ArrayFromDB]);
  const [cacheID3Array] = useState([cacheID3ArrayFromDB]);

 // LEFt position

 let left0ArrayFromDB = [];
 let left1ArrayFromDB = [];
 let left2ArrayFromDB = [];
 let left3ArrayFromDB = [];

 const [left0Array] = useState([left0ArrayFromDB]);
 const [left1Array] = useState([left1ArrayFromDB]);
 const [left2Array] = useState([left2ArrayFromDB]);
 const [left3Array] = useState([left3ArrayFromDB]);


 // TOp Postion

 let top0ArrayFromDB = [];
 let top1ArrayFromDB = [];
 let top2ArrayFromDB = [];
 let top3ArrayFromDB = [];

 const [top0Array] = useState([top0ArrayFromDB]);
 const [top1Array] = useState([top1ArrayFromDB]);
 const [top2Array] = useState([top2ArrayFromDB]);
 const [top3Array] = useState([top3ArrayFromDB]);


 // Size x
  let sizeX0ArrayFromDB = [];
  let sizeX1ArrayFromDB = [];
  let sizeX2ArrayFromDB = [];
  let sizeX3ArrayFromDB = [];

  const [sizeX0Array] = useState([sizeX0ArrayFromDB]);
  const [sizeX1Array] = useState([sizeX1ArrayFromDB]);
  const [sizeX2Array] = useState([sizeX2ArrayFromDB]);
  const [sizeX3Array] = useState([sizeX3ArrayFromDB]);


  // SIZe y

  let sizeY0ArrayFromDB = [];
  let sizeY1ArrayFromDB = [];
  let sizeY2ArrayFromDB = [];
  let sizeY3ArrayFromDB = [];

  const [sizeY0Array] = useState([sizeY0ArrayFromDB]);
  const [sizeY1Array] = useState([sizeY1ArrayFromDB]);
  const [sizeY2Array] = useState([sizeY2ArrayFromDB]);
  const [sizeY3Array] = useState([sizeY3ArrayFromDB]);


  const [myArray] = useState([imageArrayFromDB]);
  const navigate = useNavigate();
    
useEffect(() => {
  
    if(!TruckId) navigate('/')

    
  fetch(`/quiz-pages?fire-truck=${TruckId}`)
    .then(res => res.json())
    .then(data => {
      const propertValuesObjectFromDb = Object.values(data);



      propertValuesObjectFromDb.forEach((singleProperty,index) => {
        


        const {caches, sideImagePath} =singleProperty;
        imageArrayFromDB.push(sideImagePath);

        switch(caches.length){
          case 1: 
              name0ArrayFromDB.push(caches[0].cacheName);
              cacheID0ArrayFromDB.push(caches[0].cacheID);


              left0ArrayFromDB.push(caches[0].cacheRectangle.leftBottomPoint.x)
              top0ArrayFromDB.push(caches[0].cacheRectangle.leftBottomPoint.y);

              cacheID0ArrayFromDB.push(caches[0].cacheID);



              sizeX0ArrayFromDB.push(caches[0].cacheRectangle.size.x)
              sizeY0ArrayFromDB.push(caches[0].cacheRectangle.size.y)
            
          break;
          case 2: 
            name0ArrayFromDB.push(caches[0].cacheName);
            name1ArrayFromDB.push(caches[1].cacheName);


          cacheID0ArrayFromDB.push(caches[0].cacheID);
          cacheID1ArrayFromDB.push(caches[1].cacheID);
        

            left0ArrayFromDB.push(caches[0].cacheRectangle.leftBottomPoint.x)
            left1ArrayFromDB.push(caches[1].cacheRectangle.leftBottomPoint.x)

            top0ArrayFromDB.push(caches[0].cacheRectangle.leftBottomPoint.y);
            top1ArrayFromDB.push(caches[1].cacheRectangle.leftBottomPoint.y);

            sizeX0ArrayFromDB.push(caches[0].cacheRectangle.size.x);
            sizeX1ArrayFromDB.push(caches[1].cacheRectangle.size.x);

            sizeY0ArrayFromDB.push(caches[0].cacheRectangle.size.y)
            sizeY1ArrayFromDB.push(caches[1].cacheRectangle.size.y)
           
          break;
          case 3: 
            name0ArrayFromDB.push(caches[0].cacheName);
            name1ArrayFromDB.push(caches[1].cacheName);
            name2ArrayFromDB.push(caches[2].cacheName);


            cacheID0ArrayFromDB.push(caches[0].cacheID);
            cacheID1ArrayFromDB.push(caches[1].cacheID);
            cacheID2ArrayFromDB.push(caches[2].cacheID);

            left0ArrayFromDB.push(caches[0].cacheRectangle.leftBottomPoint.x);
            left1ArrayFromDB.push(caches[1].cacheRectangle.leftBottomPoint.x);
            left2ArrayFromDB.push(caches[2].cacheRectangle.leftBottomPoint.x);

            top0ArrayFromDB.push(caches[0].cacheRectangle.leftBottomPoint.y);
            top1ArrayFromDB.push(caches[1].cacheRectangle.leftBottomPoint.y);
            top2ArrayFromDB.push(caches[2].cacheRectangle.leftBottomPoint.y);


            sizeX0ArrayFromDB.push(caches[0].cacheRectangle.size.x);
            sizeX1ArrayFromDB.push(caches[1].cacheRectangle.size.x);
            sizeX2ArrayFromDB.push(caches[2].cacheRectangle.size.x);

            sizeY0ArrayFromDB.push(caches[0].cacheRectangle.size.y)
            sizeY1ArrayFromDB.push(caches[1].cacheRectangle.size.y)
            sizeY2ArrayFromDB.push(caches[2].cacheRectangle.size.y)
        break;
        case 4: 
            name0ArrayFromDB.push(caches[0].cacheName);
            name1ArrayFromDB.push(caches[1].cacheName);
            name2ArrayFromDB.push(caches[2].cacheName);
            name3ArrayFromDB.push(caches[3].cacheName);

            cacheID0ArrayFromDB.push(caches[0].cacheID);
            cacheID1ArrayFromDB.push(caches[1].cacheID);
            cacheID2ArrayFromDB.push(caches[2].cacheID);
            cacheID3ArrayFromDB.push(caches[3].cacheID);

            left0ArrayFromDB.push(caches[0].cacheRectangle.leftBottomPoint.x);
            left1ArrayFromDB.push(caches[1].cacheRectangle.leftBottomPoint.x);
            left2ArrayFromDB.push(caches[2].cacheRectangle.leftBottomPoint.x);
            left3ArrayFromDB.push(caches[3].cacheRectangle.leftBottomPoint.x);

            top0ArrayFromDB.push(caches[0].cacheRectangle.leftBottomPoint.y);
            top1ArrayFromDB.push(caches[1].cacheRectangle.leftBottomPoint.y);
            top2ArrayFromDB.push(caches[2].cacheRectangle.leftBottomPoint.y);
            top3ArrayFromDB.push(caches[3].cacheRectangle.leftBottomPoint.y);


            sizeX0ArrayFromDB.push(caches[0].cacheRectangle.size.x);
            sizeX1ArrayFromDB.push(caches[1].cacheRectangle.size.x);
            sizeX3ArrayFromDB.push(caches[3].cacheRectangle.size.x);

            sizeY0ArrayFromDB.push(caches[0].cacheRectangle.size.y)
            sizeY1ArrayFromDB.push(caches[1].cacheRectangle.size.y)
            sizeY2ArrayFromDB.push(caches[2].cacheRectangle.size.y)
            sizeY3ArrayFromDB.push(caches[3].cacheRectangle.size.y)

         break;
        }

      });
    })
  })

  





  
  
  const data =  QuizDataImageFromDb.map(({img}, index)=> {



    ButtonShowCorrectAnswer = (isClick, setIsClick, score,setScore,navigate) => {
      let buttonsElement = document.querySelectorAll('.quiz_button');
      const buttonsElementArray = Array.from(buttonsElement)
      setIsClick(!isClick);
    
      if(score === 9) {
        navigate('/result');
      }
    if(isClick === true) {
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
    return (
       <>   








     {buttonClick ? "" : <button onClick={() => setButtonClick(true)} className='popupButton'>Zacznij Quiz</button>}

      <div className="boxElement">
      <div className="quiz_container">
      {`../${myArray[0][index]}` !== "../undefined" 
      ?  <img key = {index}src= {`../${myArray[0][index]}`} alt="track"/> 
      :   <img key = {index}src= {`../${myArray[0][index]}`} 
      style = {{display: "none"}} alt="track"/>}


        <button ref = {buttonQuiz} name = {cacheID0Array[0][index]} onClick = {onPress} className="quiz_button"  style = {{
          "width": `${sizeX0Array[0][index] * 100}%`,
          "height": `${sizeY0Array[0][index] * 100}%`,
          "top": `${left0Array[0][index] * 100}%`,
          "left": `${top0Array[0][index] * 100}%` !== "undefined%" ?  `${top0Array[0][index] * 100}%` : "-300%",
        }}>{name0Array[0][index]}</button>


        <button ref = {buttonQuiz} name = {cacheID1Array[0][index]}  className="quiz_button" onClick = {onPress} 
        style = {{
          "width": `${sizeX1Array[0][index]* 100}%`,
          "height": `${sizeY1Array[0][index]* 100}%`,
          "top": `${left1Array[0][index]* 100}%`,
          "left": `${top1Array[0][index]* 100}%` !== "undefined%" ?  `${top1Array[0][index]* 100}%` : "-300%",
        }}>{name1Array[0][index]}</button>

        <button ref = {buttonQuiz} name = {cacheID2Array[0][index]}  className="quiz_button" onClick = {onPress}
        style = {{
          "width": `${sizeX2Array[0][index]* 100}%`,
          "height": `${sizeY2Array[0][index]* 100}%`,
          "top": `${left2Array[0][index]* 100}%`,
          "left": `${top2Array[0][index]* 100}%` !== "undefined%" ?  `${top2Array[0][index]* 100}%`  : "-300%",
        }}>{name2Array[0][index]}</button>

        <button ref = {buttonQuiz} name = {cacheID3Array[0][index]}  className="quiz_button" onClick = {onPress}
         style = {{
          "width": `${sizeX3Array[0][index]* 100}%`,
          "height": `${sizeY3Array[0][index]* 100}%`,
          "top": `${left3Array[0][index]* 100}%`,
          "left": `${top3Array[0][index]* 100}%` !== "undefined%" ?  `${top3Array[0][index] * 100}%` : "-300%",
        }}>{name3Array[0][index]}</button>
  

      </div>
      </div> 
   

    
    </>
    )
    
  });

  return (
    data
  )
}