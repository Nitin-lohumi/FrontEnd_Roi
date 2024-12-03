import {React, useEffect} from "react"

const Button =({handleUpload,file="",buttonName})=>{
    return (
        <>
        <div className="flex justify-center items-center ">
         <button
          onClick={handleUpload}
          hidden={!file}
          className="align-text-top px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer">
          {buttonName}
        </button>
       </div>
        </>
    )
}
export default Button;