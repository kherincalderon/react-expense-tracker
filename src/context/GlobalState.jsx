import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// Initial State
const initialState = {
  transactions: [],
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    // Get from LocalStorage
    const localData = localStorage.getItem("state");
    return localData ? JSON.parse(localData) : initialState;
  });

  // Add to LocalStorage
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
