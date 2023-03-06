
import React, {useRef,useEffect,useContext} from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { AppContext } from './AppContext';
import { idUnits } from './SelectBox';


export let TruckId = "";



const Truck = () => {

  const {id} = useParams();
  const [trackName, setTrackName] = useState('');
  const textChooseTrack = useRef(true);
  

  const handleImageClick = (e) => {
    let nameofTrack = e.target.getAttribute('name');
    setTrackName(nameofTrack);

    textChooseTrack.current.style.color= 'black';
  
  }  

  const handleArrowQuizClick = () => {
    if(trackName === "") {
      textChooseTrack.current.innerText = "Musisz wybrać wóz";
     textChooseTrack.current.style.color= 'red';
    
    }
  }




  const BoxComponent = () => {
    let [truck, setTruck] = useState('');
    useEffect(()=> {
      fetch(`/fire-trucks?osp-unit=${idUnits}`)
      .then(response => response.json())
      .then(data => {
     setTruck(data.map(({ID,name,imagePath,avgPercent},index) => {
          TruckId = ID;

          let firstAvgPercent = avgPercent * 10;
          let SecondAvgPercent = avgPercent * 100;

      return (
        <>
            

        <div className="boxTrack" key = {index} id = {imagePath} name = {name} onClick={(e) => handleImageClick(e)} >


        <img className='imageFireTrack' id = {imagePath}  src={`../${imagePath}`} alt="img" name = {name} onClick={(e) => handleImageClick(e)} />

 
        <div className="informationAboutTrack" name = {name} onClick={(e) => handleImageClick(e)}>
          <h3 className= 'TrackName'  name = {name} onClick={(e) => handleImageClick(e)}>{name}</h3>
        

          <progress className="progress" max="100" value={SecondAvgPercent}  name = {name} onClick={(e) => handleImageClick(e)} ></progress>
          <div className='ScoringValueTrack'  name = {name} onClick={(e) => handleImageClick(e)}>
          <h4 name = {name} onClick={(e) => handleImageClick(e)}>{firstAvgPercent}/10</h4>
          <h4 name = {name} onClick={(e) => handleImageClick(e)}>{SecondAvgPercent}%</h4>
          </div>
          
        </div>
        
        </div>
        
      </>


      )
     })
      )}

   
   )
    },[])
    
      return (
        <>
           {truck}
           <Link to = {trackName} style={{ textDecoration: 'none', color: 'black'}}>
            <i onClick={handleArrowQuizClick}  className="fa-solid fa-arrow-right"></i>
            </Link>
        </>
     
      )

  }


 
  return (
    <>

    <div className='SecondContainer'>

    <div className='navigation'>
    <Link to = '/'> <img className='imgArrow' src="../img/arrow-turn.png" alt="arrow" /></Link>
     
      <h1 className='unith1Id'>{id}</h1>
      <img className='skrytkaImage' src="../img/skrytka.png" alt="skrytka" />
    </div>


      <div className='containerTrack'>
        <h2 className='chooseCarH2' ref = {textChooseTrack}>{trackName ? `Wybrany wóz to:  ${trackName}`: "Wybierz wóz: "}</h2>
        <BoxComponent/>
      </div>


    <div className='FooterSecondSite'></div>
     
      <a className='a-write-to-us-1' href = 'mailto:kontakt@janilowski.pl'>Zgłoś błąd lub pomysł ulepszenia aplikacji!</a>

      <footer className='footerSecondSite'>General Public License<p className='skrytka-date'>Skrytka 2023</p></footer>

    </div>

    </>
    
      
  )
}

export default Truck;
