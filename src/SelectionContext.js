import React, { createContext, useContext, useState } from 'react';

const SelectionContext = createContext();

export const useSelection = () => {
  return useContext(SelectionContext);
};

export const SelectionProvider = ({ children }) => {
  const [selection, setSelection] = useState(null); // valor inicial como null ou uma string vazia

  const setSelectionOption = (option) => {
    setSelection(option); // atualiza o valor de selection
  };

  return (
    <SelectionContext.Provider value={{ selection, setSelectionOption }}>
      {children}
    </SelectionContext.Provider>
  );
};
