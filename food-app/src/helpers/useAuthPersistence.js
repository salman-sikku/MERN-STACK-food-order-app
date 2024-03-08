import { useEffect } from "react";
import { setAuth } from "../feature/authSlice";
import { useDispatch } from "react-redux";

const useAuthPersistence = ()=>{
   const dispatch = useDispatch();

   useEffect(()=>{
      const isUserAutch = JSON.parse(localStorage.getItem('auth'));
      if(isUserAutch){
        dispatch(setAuth({
            user : isUserAutch.user ,
            token : isUserAutch.token
        }))
      }
   }, [dispatch])
};

export default useAuthPersistence;