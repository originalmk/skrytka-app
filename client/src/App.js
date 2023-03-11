import React from 'react';
import BottomFPage from './components/BottomFPage';
import './style/App.scss';
import AppProvider from './components/AppContext';
import SearchBox from './components/SelectBox';

function App() {

  return (
    <>

      <div className="container">
        <div className="logo">
          <img className='box' src='img/skrytka.png' alt="" />
        </div>
        <h1 className='welcome'>Witaj!</h1>


        <AppProvider>
          <SearchBox />

          <BottomFPage />
        </AppProvider>

      </div>

      <footer className='footerFirstSite'><p className='skrytka-date'>Skrytka 2023</p>Affero General Public License v3.0</footer>

    </>
  );

}

export default App;
