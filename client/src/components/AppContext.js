import React, { createContext, useState } from 'react';

export const AppContext = createContext();



const AppProvider = ({ children }) => {
  let localizationFromDBArr = ['Kraków', 'Poznań', 'Warszawa', 'Gdańsk', 'Koszalin', 'Słupsk', 'Gdynia'];

  const [unitOsp, setunitOsp] = useState("");
  const [isContainerActive, setIsContainerActive] = useState(true);
  const [localization, setLocalization] = useState(localizationFromDBArr);
  const [isPopUpActive, setIsPopUpActive] = useState(true);
  const [idUnit, setId] = useState(1);
  const [getImage, setGetImage] = useState('');
  const [buttonClick, setButtonClick] = useState(false);

  return (
    <AppContext.Provider value={{
      unitOsp,
      setunitOsp,
      isContainerActive,
      setIsContainerActive,
      localization,
      setLocalization,
      localizationFromDBArr,
      isPopUpActive,
      setIsPopUpActive,
      idUnit,
      setId,
      getImage,
      setGetImage,
      buttonClick,
      setButtonClick



    }}>
      {children}
    </AppContext.Provider>
  )
}
export default AppProvider