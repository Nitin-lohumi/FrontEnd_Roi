import {React, useEffect} from "react";
import Success from "../utilites/Sucess";
import 'react-toastify/dist/ReactToastify.css'; 
const Image_retrive=({imageData})=>{
    Success("helloo");
    return(
        <>
        {imageData.length==0?<div className="grid place-items-center items-center mt-8 w-full">
            <h1 className="text-center text-red-600 text-pretty text-2xl">Opps! There  is  no similer image is found in database</h1>
        </div>
        :<div className="grid grid-cols-3 gap-2 scrollbar-hide overflow-x-hidden overflow-y-hidden">
        {imageData.map((image, index) => (
        <div className="h-full" key={index}>
         <div key={index} className=" rounded-lg overflow-x-hidden overflow-y-hidden">
          <img src={image.replace("../Frontend/public","")} alt={`Image ${index + 1}`} className="h-80 w-screen m-auto object-contain" />
        </div>
        <a href="#" className="text-xl text-blue-700 rounded-lg p-1">download</a>
       </div>
         ))}</div>}
        {/* <ToastContainer/> */}
        </>
    )
}
export default Image_retrive;