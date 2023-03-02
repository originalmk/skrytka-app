
import React, {useRef,useEffect,useContext} from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { AppContext } from './AppContext';
import { idUnits } from './SelectBox';
export let InformationTrackFromDB = [
  {
    img: '../img/fire-truck/track1.jpg',
    name: "Wóz 1",
    progress: 70,
  },
  
  {
    img: '../img/fire-truck/track2.jpg',
    name: "Wóz 2",
    progress: 20,
  },
  {
    img: '../img/fire-truck/track3.jpg',
    name: "Wóz 3",
    progress: 0,
  }
];

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
  useEffect(() => {
    fetch(`/fire-trucks?osp-unit=${idUnits}`)
      .then(response => response.json())
      .then(data => {
     setTruck(data.map(({name,imagePath,avgPercent},index) => {
        console.log(name)
      return (
        <>
           

        <div className="boxTrack" key = {index} id = {imagePath} name = {name} onClick={(e) => handleImageClick(e)} >


        <img className='imageFireTrack' id = {imagePath}  src={`../${imagePath}`} alt="img" />

 
        <div className="informationAboutTrack">
          <h3 className= 'TrackName'>{name}</h3>
        

          <progress className="progress" max="100" value={avgPercent}></progress>
          <div className='ScoringValueTrack'>
          <h4>{avgPercent / 10}/10</h4>
          <h4>{avgPercent}%</h4>
          </div>
          
        </div>
        
        </div>
        
      </>


      )
     })
      )}

   
   )
 }, []);

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
     
      <a className='a-write-to-us-1' href = '/linkdostrony'>Zgłoś błąd lub pomysł ulepszenia aplikacji!</a>

      <footer className='footerSecondSite'>General Public License<p className='skrytka-date'>Skrytka 2023</p></footer>

    </div>

    </>
    
      
  )
}

export default Truck;