
import React, {useRef,useEffect} from 'react';
import { useState } from 'react';
import { useParams,  useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { idUnits } from './SelectBox';
export let TruckId = "";


const Truck = () => {
  const {id} = useParams();
  const [trackName, setTrackName] = useState('');
  const [checkIsClick, setCheckIsClick] = useState(false);
  const textChooseTrack = useRef(true);

  const handleImageClick = (e, ID) => {
    let nameofTrack = e.target.getAttribute('name');
    setTrackName(nameofTrack);
    TruckId = ID;
    setCheckIsClick(!checkIsClick);
    textChooseTrack.current.style.color= 'black';
  
  }  

  const handleArrowQuizClick = () => {
    if(trackName === "") {
      textChooseTrack.current.innerText = "Musisz wybrać wóz";
     textChooseTrack.current.style.color= 'red';
    
    }
  }



  const BoxComponent = () => {

    const navigate = useNavigate();


    
    let [truck, setTruck] = useState('');
    useEffect(()=> {
        if(!idUnits) navigate('/')
      
      fetch(`/fire-trucks?osp-unit=${idUnits}`)
      .then(response => response.json())
      .then(data => {
          
     setTruck(data.map(({ID,name,imagePath,avgPercent},index) => {
          let percent = avgPercent.toString().slice(0,3);
          let firstAvgPercent = percent  * 10;
          let SecondAvgPercent = percent * 100;

      return (
        <>
              

        <div className="boxTrack" key = {index} id = {imagePath} name = {name} onClick={(e) => handleImageClick(e, ID)} >


        <img className='imageFireTrack' id = {imagePath}  src={`../${imagePath}`} alt="img" name = {name} onClick={(e) => handleImageClick(e,ID)} />

 
        <div className="informationAboutTrack" name = {name} onClick={(e) => handleImageClick(e)}>
          <h3 className= 'TrackName'  name = {name} onClick={(e) => handleImageClick(e,ID)}>{name}</h3>
        

          <progress className="progress" max="100" value={SecondAvgPercent}  name = {name} onClick={(e) => handleImageClick(e,ID)} ></progress>
          <div className='ScoringValueTrack'  name = {name} onClick={(e) => handleImageClick(e)}>
          <h4 name = {name} onClick={(e) => handleImageClick(e,ID)}>{firstAvgPercent}/10</h4>
          <h4 name = {name} onClick={(e) => handleImageClick(e,ID)}>{SecondAvgPercent}%</h4>
          </div>
          
        </div>
        
        </div>
        
      </>


      )
     })
      )}

   
   )
    },[checkIsClick])
    
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
