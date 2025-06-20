import { createContext, useEffect} from "react";
import { useReducer } from "react";
import { InitialState, Reducer } from "../utils/reducer";
import { Type } from "../utils/action";
import axios from '../utils/axios';

export const Context = createContext();
  //1.global state, 2.Authentication
function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(Reducer, InitialState);
  

  //Checking if user is authenticated on app load(page reload)(AUTO-LOGIN: on app startup)
  useEffect(() => {
    const checkUser = async () => {

      dispatch({ 
        type: Type.SET_LOADING, 
        loading: true 
      });


      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      const user_id = localStorage.getItem("user_id");

      if (!token || !username || !user_id) {
        dispatch({ type: Type.SET_USER, user: null });
        dispatch({ type: Type.SET_LOADING, loading: false });
        return;
      }

      try {
        const res = await axios.get("/auth/checkUser", {
          headers: { Authorization: `Bearer ${token}` },
        });
    

         //AUTO-LOGIN
        if (res.data.success) {
          dispatch({
            type: Type.SET_USER,
            user: res.data.user || {
              username: username,
              user_id: user_id
            }
          });
        } else {
          // So Here if the Token is invalid, We Will clear localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("user_id");
          dispatch({ type: Type.SET_USER, user: null });
        }


      } catch (error) {
        console.error(error?.response?.data || error.message);

        // Clearing localStorage on auth failure
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("user_id");
        dispatch({ type: Type.SET_USER, user: null });
      }finally{
        dispatch({ type: Type.SET_LOADING, loading: false });
      }
    };

    checkUser();
  }, []);

  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;


// import { createContext, useEffect, useReducer } from "react";
// import { InitialState, Reducer } from "../utils/reducer";
// import { Type } from "../utils/action";
// import axios from "../utils/axios";

// export const Context = createContext();

// function ContextProvider({ children }) {
//   const [state, dispatch] = useReducer(Reducer, InitialState);

//   const clearUserSession = () => {
//     localStorage.removeItem("token");
//     dispatch({ type: Type.SET_USER, user: null });
//   };

//   useEffect(() => {
//     const checkUser = async () => {
//       dispatch({ type: Type.SET_LOADING, loading: true });

//       const token = localStorage.getItem("token");

//       if (!token) {
//         clearUserSession();
//         dispatch({ type: Type.SET_LOADING, loading: false });
//         return;
//       }

//       try {
//         const res = await axios.get("/auth/checkUser", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data.success) {
//           dispatch({
//             type: Type.SET_USER,
//             user: res.data.user,
//           });
//         } else {
//           clearUserSession();
//         }
//       } catch (error) {
//         console.error(error?.response?.data || error.message);
//         clearUserSession();
//       } finally {
//         dispatch({ type: Type.SET_LOADING, loading: false });
//       }
//     };

//     checkUser();
//   }, []);

//   return (
//     <Context.Provider value={{ state, dispatch }}>
//       {children}
//     </Context.Provider>
//   );
// }

// export default ContextProvider;
