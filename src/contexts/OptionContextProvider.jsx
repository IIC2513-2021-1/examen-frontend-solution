import React, { createContext, useCallback, useState } from 'react';

export const OptionContext = createContext();

const OptionContextProvider = ({ children }) => {
  const [option, setOption] = useState('milestones');

  const toggleOption = useCallback(() => {
    setOption((prevOption) => (prevOption === 'milestones' ? 'stats' : 'milestones'));
  }, []);

  return (
    <OptionContext.Provider value={{ option, toggleOption }}>
      {children}
    </OptionContext.Provider>
  );
};

export default OptionContextProvider;
