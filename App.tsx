import React, { useEffect, useState } from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import Splash from './src/screen/Splash';


export default function App (){
  const [loading, setLoading]=useState(true)

  useEffect(()=>{
    let timerId= setTimeout(()=>{
       setLoading(false)
    },5000)

    return ()=> clearTimeout(timerId)
  },[])

  if(loading){
    return <Splash/>
  }

  return (
    <>
          <AppNavigation />
    </>
  )
}
