import React, {useState, useEffect} from 'react';

export const QuizGetData = () => {
   




//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// TEN CAŁY KOD JEST DO REFACTORU 


  let imageArrayFromDB = [];

  // NAME 

  let name0ArrayFromDB = [];
  let name1ArrayFromDB = [];
  let name2ArrayFromDB = [];
  let name3ArrayFromDB = [];

  const [name0Array] = useState([name0ArrayFromDB]);
  const [name1Array] = useState([name1ArrayFromDB]);
  const [name2Array] = useState([name2ArrayFromDB]);
  const [name3Array] = useState([name3ArrayFromDB]);


  // CACHE ID

  console.log(name0ArrayFromDB, name0Array)

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


  // SIZe 3

  let sizeY0ArrayFromDB = [];
  let sizeY1ArrayFromDB = [];
  let sizeY2ArrayFromDB = [];
  let sizeY3ArrayFromDB = [];

  const [sizeY0Array] = useState([sizeY0ArrayFromDB]);
  const [sizeY1Array] = useState([sizeY1ArrayFromDB]);
  const [sizeY2Array] = useState([sizeY2ArrayFromDB]);
  const [sizeY3Array] = useState([sizeY3ArrayFromDB]);


  const [myArray] = useState([imageArrayFromDB]);
 
    
useEffect(() => {
  
  fetch(`/quiz-pages?fire-truck=${TruckId}`)
    .then(res => res.json())
    .then(data => {
      const propertValuesObjectFromDb = Object.values(data);


   
      propertValuesObjectFromDb.forEach((singleProperty,index) => {

        
        const {caches, sideImagePath} =singleProperty;
        imageArrayFromDB.push(sideImagePath);

        switch(caches.length){
          case 1: 
              cachesLength0();
            
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

}