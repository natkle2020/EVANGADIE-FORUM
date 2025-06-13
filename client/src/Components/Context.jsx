import { createContext } from "react";
import { useReducer } from "react";
import { InitialState, Reducer } from "../utils/reducer";

export const Context = createContext()

function ContextProvider({children}) {
  return (
    <Context.Provider value={useReducer(Reducer, InitialState)}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider

