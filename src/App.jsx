import {Routes,Route} from "react-router-dom";
import Image_retrive from "./component/Image_retrive";
import Home from "./component/Home";
import React, {createContext, useContext } from "react";
import './App.css'
import Canvas from "./component/Canvas";
export const context = createContext();
function App() {
  return (
    <>
      <context.Provider value={{name:"nitin"}}>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/search" element={<Image_retrive/>}/>
      </Routes>
      </context.Provider>
    </>
  )
}

export default App
