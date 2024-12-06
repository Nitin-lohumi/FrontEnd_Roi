import { React, useEffect } from "react";
import Success from "../utilites/Sucess";
import Button from "./Button";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const Image_retrive = ({
  imageData,
  setCheckLength,
  handelSearchAgain,
  searchType,
}) => {
  useEffect(() => {
      setCheckLength(imageData.length == 0);
      if(imageData.length>0){
        Success("Similer images  "+imageData.length-1);
      }else{
        Success("No similer images");
      }
    }, [imageData]);
  return (
    <>
      {imageData.length == 0 ? (
        <div className="grid place-items-center items-center mt-8 w-full">
          <Button
            handleUpload={handelSearchAgain}
            file={true}
            buttonName={"search for other images "}
          />
          <h1 className="text-center text-red-600 text-pretty text-2xl">
            Opps! There is no similer image is found in database
          </h1>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl text-blue-800  text-center ">
            {searchType ? "Search result for Sift" : "Search Result for Cnn"}
          </h1>
          <ToastContainer/>
          <div className="grid grid-cols-3 gap-3 p-2 scrollbar-hide overflow-x-hidden overflow-y-hidden">
            {imageData.map((image, index) => (
              <div className="h-full" key={index}>
                <div  className=" rounded-lg overflow-x-hidden overflow-y-hidden" >
                  <img
                    src={searchType?"Dataset/"+image:image}
                    alt={`Image ${index + 1}`}
                    className="h-80 w-screen m-auto object-contain"
                  />
                </div>
                <a href="#" className="text-xl text-blue-700 rounded-lg p-1">
                  download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* <ToastContainer/> */}
    </>
  );
};
export default Image_retrive;
