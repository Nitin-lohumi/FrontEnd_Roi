import { React, useState, useRef, useEffect, useContext,createContext } from "react";
import { useNavigate } from "react-router-dom";
import FormSubmit from "./FormSubmit";
import Button from "./Button";
import Canvas from "./Canvas";
import { context } from "../App";
import axios from "axios";
import Image_retrive from "./Image_retrive";
import ReactLoading from 'react-loading';
export const canvasData = createContext();
const Content = () => {
  // const  value = useContext(context);
  const [imageDetails, setImageDetails] = useState({width: 0,height: 0,x: 0,y: 0});
  const[check,setCheck] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const imgRef = useRef(null);
  const [IsReview, setIsReview] = useState(false);
  const [navigateNextPage, setNavigateNextPage] = useState(false);
  const [rois,getRoi] = useState(null);
  const [isDisable,setIsDisable] =useState(false);
  const [loading,setLoading] = useState(false);
  const [retrive_image,setRetrive_images] = useState([]);
  const [simple_submit_click,SetSimple_Search_click] = useState(false);
  const [High_submit_click,SetHigh_Search_click] = useState(false);
  const image = imgRef.current;
  const [checklength,setCheckLength] = useState(false);
  const [Simle_btnshow,setSimple_btnshow] = useState(false);
  const [High_btnshow,setHigh_btnshow] = useState(false);
  const [errorbtn,setErrorBtn] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  // console.log("high",High_btnshow)
  // console.log("simple",Simle_btnshow)
  // console.log("retrive image len",retrive_image.length)
  // console.log("High_submit_click",High_submit_click)
  // console.log("simple_submit_click",simple_submit_click)
  const handleUpload = () => {
    if (file) {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(file);
        setIsReview(true);
      } else {
        setPreview(null);
        setIsReview(false);
      }
    }
  };
  const handleNextPage = () => {
    if (file) {
      setNavigateNextPage(true);
    } else {
      setNavigateNextPage(false);
    }
  };
  const EverythingRight= ()=>{
    if (file) {
      setCheck(true);
      setImageDetails({
      width: image.width,
      height: image.height,
      x: image.offsetLeft,
      y: image.offsetTop,
    })
    setIsDisable(true);
    if(rois==null){
      getRoi(imageDetails);
    }
    } else {
      setCheck(false);
    }
  }
  const handleSubmit =(e) => {
    setLoading(true);
    e.preventDefault();
    setSimple_btnshow(false);
    setHigh_btnshow(true);
    SetSimple_Search_click(true);
    setErrorBtn(true);

    const payload = {
      imagelink:preview,
      rois:rois
    }
    setTimeout(async()=>{
      try {
        const response =  await axios.post('http://127.0.0.1:5000/search',payload,{
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = response.data;
        console.log(data);
        setRetrive_images(data.data.Matched_images);
      } catch (error) {
      }
      setLoading(false);
    },2000);
  };
  
  function handleHighSearch(e){
    console.log(preview);
    console.log(rois);
    e.preventDefault();
    setLoading(false);
    setSimple_btnshow(true);
    setErrorBtn(true);
    setHigh_btnshow(false);
    SetHigh_Search_click(true);
    // const payload = {
    //   imagelink:preview,
    //   rois:rois
    // }
    // setRetrive_images([]);
    // setTimeout(async()=>{
    //   try {
    //     const response =  await axios.post('http://127.0.0.1:5000/HighSearch',payload,{
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //     const data = response.data;
    //     console.log(data);
    //     setRetrive_images(data.data.Matched_images);
    //   } catch (error) {
    //   }
    //   setLoading(false);
    // },2000);
  }

  useEffect(() => {
    handleUpload();
  }, [file]);
   

  function handelSearchAgain(){
    setImageDetails({
      width: 0,
      height:0,
      x: 0,
      y: 0,
    });
    setCheckLength(false);
    setHigh_btnshow(false);
    setSimple_btnshow(false);
    SetSimple_Search_click(false);
    SetHigh_Search_click(false);
    setErrorBtn(false);
    setCheck(false);
    setFile(null);
    setPreview(null);
    setIsReview(false);
    setNavigateNextPage(false);
    getRoi(null);
    setRetrive_images([]);
    setIsDisable(false);
  } 
  return (
    <>
      <div className="flex items-center justify-center w-auto mt-10  overflow-hidden element">
      {!navigateNextPage?<div className=" p-6 bg-black  rounded-xl shadow-md  disabled:cursor-not-allowed">
          <h1 className="text-2xl font-semibold text-center text-white mb-2">
            {file ? "" : "Upload a File"}
          </h1>
          <div className="flex justify-center items-center border-2 border-dashed border-gray-300 p-6 rounded-xl cursor-pointer">
            <input
              type="file"
              disabled={navigateNextPage}
              onChange={handleFileChange}
              className="opacity-0 absolute  cursor-pointe  disabled:cursor-not-allowed disabled:hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center text-gray-600 cursor-pointer disabled:cursor-not-allowed"
            >
              <span className="text-lg text-lime-600">
                {file
                  ? " Image:  " + file.name
                  : "Drag & Drop or Browse to Select"}
              </span>
              <span className="text-lg text-white max-w-full">
                {file
                  ? "File-Type: " +
                    file.type +
                    ",   Size : " +
                    (file.size * 0.00001).toFixed(2) +
                    " Mb"
                  : "Supported file types: jpg, png"}
              </span>
            </label>
          </div> 
          </div>:""}
      </div>

      {preview && (
          <div className="grid place-items-center max-w-lg m-auto h-min-screen overflow-hidden scrollbar-hide element">
          <h1 className="text-wrap text-xl m-4">{}</h1>
          <img
            ref={imgRef}
            src={preview}
            alt="Preview"
            className="relative w-96 h-60 text-center"
          />
          <div className="flex justify-between m-2 gap-4 w-96">
            <div>{navigateNextPage ? 
              <canvasData.Provider value={{getRoi}}>
                <Canvas isDisable ={isDisable}/>
              </canvasData.Provider>
              : ""}</div>
           <div className="flex items-center">
           {IsReview ? (
              !navigateNextPage ? (
                <Button
                  handleUpload={handleNextPage}
                  file={file}
                  buttonName={"Next"}
                />
              ) : (
                check?retrive_image.length==0?checklength?
                <FormSubmit handleSubmit={handleSubmit} loading={loading} disable={true}  btn_name={"sach"}/>:
                <div className="flex justify-between w-full">
                  <div className="mt-2 mr-4 rounded-lg shadow-md">
                  <FormSubmit handleSubmit={handleHighSearch} loading={loading} disable={High_btnshow} 
                  btn_name={"Ultra Search"}
                   color={"green"}/>
                </div>
                  <div className="mt-2 rounded-lg shadow-md"><FormSubmit handleSubmit={handleSubmit} disable={Simle_btnshow} loading={loading} btn_name={"simple search"} color={"yellow"}/></div>
                </div>
                :<div><FormSubmit handleSubmit={handleSubmit} loading={loading} disable={true} btn_name={"Search"}/>
                <FormSubmit handleSubmit={handleHighSearch} loading={loading} disable={true}  btn_name={"ultra search"}/></div>:
                <Button
                  handleUpload={EverythingRight}
                  file={file}
                  buttonName={"All done"}
                />
              )
            ) : (
              <Button
                handleUpload={handleUpload}
                file={file}
                buttonName={"review"}
              />
            )}
            <div>
              {retrive_image.length==0?"": 
              <div className="flex flex-row">
               <div className="flex mr-3">
               {High_btnshow? 
               <FormSubmit handleSubmit={handleHighSearch} loading={loading} disable={!High_btnshow} 
               btn_name={"Ultra Search"} color={"green"}/>: 
              <FormSubmit handleSubmit={handleSubmit} loading={loading} disable={High_btnshow}
                btn_name={"simple search"} color={"Red"}/>}
              </div> 
              <Button handleUpload={handelSearchAgain}
              file={file}
              buttonName={"search anything "}
            />      
            </div>
            }
            </div>
           </div>
          </div>
        </div>
      )}

      {/* ********************************* result image ********************************************* */}
          <div className="border-s-violet-600 overflow-x-hidden overflow-y-hidden element" >
                       {!loading?(!simple_submit_click&!High_submit_click)?"":
                        <div className="">
                          <Image_retrive imageData={retrive_image}
                           setCheckLength={setCheckLength} searchType={High_btnshow} handelSearchAgain={handelSearchAgain}
                         /></div>:
                         <div className="flex justify-center items-center min-h-48">
                         <div className="w-24 h-24">
                             <ReactLoading  type={"bubbles"} color={"black"}  height={'100%'} width={'100%'}/>
                         </div>
                       </div>}        
          </div>
    </>
  );
};
export default Content;
