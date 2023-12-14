// components/layout.js

import Navbar from './navbar'
import Footer from './footer'
import { signIn,signOut, useSession } from "next-auth/react";
import {

  Theme,
  Swap
 
} from "react-daisyui";
import { useEffect, useRef, useState } from 'react';
export default function Layout({ children }) {
  const effectRan =useRef(false)
  const [choseTheme, setChoseTheme] = useState("light");
  const  changeChoseTheme   = (event,parameter) =>{
    //alert(parameter);
    //alert("changeChoseTheme");
    console.log("parameter :",parameter)
    //(changeChoseTheme =="light")?"dark":"light";
    localStorage.setItem("theme", parameter);
    setChoseTheme( parameter)
    //setChoseTheme("dark");
  }
  //signout jika refresh token tidak ada
  const { data: session } = useSession();
  useEffect(()=>{
   
    if(effectRan.current ===true){
      console.log("load first theme")
      if (typeof window !== "undefined") {
   
        if(localStorage.getItem("theme")){
          setChoseTheme(localStorage.getItem("theme"))
        }
      }
    }//endIF effect run curent
  
    return()=>{
      console.log("unmounted")
      effectRan.current = true
    }
  },[])
  useEffect(() => {
    console.log("session layout",session)
    if (session?.error === "RefreshAccessTokenError") {
      console.log("refresh token error force sigin")
      //signIn(); // Force sign in to hopefully resolve error
      signOut({ callbackUrl: '/login' })
    }
  }, [session]);
  return (
    <>
     <Theme dataTheme={choseTheme} >
      
        <Navbar  choseTheme ={choseTheme} changeChoseTheme={changeChoseTheme}/>
    
        
        <main className='z-0'>{children}</main>
        <Footer />

     </Theme>
   
    </>
  )
}