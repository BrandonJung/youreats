import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the RestaurantContext with the data type specified
// and a empty object
const BoilerplateContext = createContext();

const BoilerplateProvider = ({ children }) => {
  const [boilerplateData, setBoilerplateData] = useState(null);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    // Do something here to retrieve initial data
    return {};
  };

  return (
    // This component will be used to encapsulate the whole App,
    // so all components will have access to the Context
    <BoilerplateContext.Provider
      value={{
        boilerplateData,
        setBoilerplateData,
      }}>
      {children}
    </BoilerplateContext.Provider>
  );
};

// A simple hooks to facilitate the access to the RestaurantContext
// and permit components to subscribe to RestaurantContext updates
function useBoilerplate() {
  const context = useContext(BoilerplateContext);

  if (!context) {
    throw new Error(
      'useBoilerplate must be used within an BoilerplateProvider',
    );
  }

  return context;
}

export { BoilerplateContext, BoilerplateProvider, useBoilerplate };

// ** MAKE SURE TO WRAP BoilerplateProvider AROUND NAVIGATIONCONTAINER **
