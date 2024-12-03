import React, { useRef, useState,useEffect, useContext } from "react";
import Button from "./Button";
import { canvasData } from "./Content";
const Canvas = ({isDisable}) => {
  const data= useContext(canvasData);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [rect, setRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [IsImage,setIsImage] =useState(0);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartPoint({ x, y });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRect({
      x: Math.min(startPoint.x, x),
      y: Math.min(startPoint.y, y),
      width: Math.abs(x - startPoint.x),
      height: Math.abs(y - startPoint.y),
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const drawRectangle = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  };

  useEffect(() => {
    if (isDrawing) {
      drawRectangle();
      data.getRoi({
        x:Math.round(rect.x),
        y:Math.round(rect.y),
        width:Math.round(rect.width),
        height:Math.round(rect.height)
      });
    }
  }, [rect]);

  const RefreshROI =()=>{
    setRect({ x: 0, y: 0, width: 0, height: 0 });
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if(IsImage==1){
        setIsImage(0);
    }else{
        setIsImage(1);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  const image = new Image();
  useEffect(()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    image.src = ""; 
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };
  },[IsImage]);
  return (
 <>
    <div className="flex relative flex-col">
      <canvas
        ref={canvasRef}
        width={500}
        height={200}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="min-w-full h-fit "
        style={{
            position: "absolute",
              top: "-132px",
              left: "192px",
              pointerEvents:isDisable?"none":"auto",
              transform: "translate(-50%, -50%)", 
              backgroundColor: "rgba(225, 255, 200, 0.1)", 
              border: "2px solid rgba(0, 0, 255, 0.2)", 
              cursor: "crosshair", 
          }}
      />
      <div>
      </div>
    </div>
        <div className=""> 
          { !isDisable? <Button handleUpload={RefreshROI} file={true} buttonName={"Reset Roi"}/>:""}
        </div>
 </>
  );
};

export default Canvas;



// const extractROI = () => {
//     if (!selection || !canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const { startX, startY, endX, endY } = selection;

//     const x = Math.min(startX, endX);
//     const y = Math.min(startY, endY);
//     const width = Math.abs(endX - startX);
//     const height = Math.abs(endY - startY);

//     // Extract the image data for the ROI
//     const imageData = ctx.getImageData(x, y, width, height);

//     // Create a new canvas to hold the ROI
//     const roiCanvas = document.createElement("canvas");
//     roiCanvas.width = width;
//     roiCanvas.height = height;
//     const roiCtx = roiCanvas.getContext("2d");

//     // Put the extracted image data onto the new canvas
//     roiCtx.putImageData(imageData, 0, 0);

//     // Convert the canvas to an image URL
//     const roiUrl = roiCanvas.toDataURL();
//     setRoiImage(roiUrl);
//   };


{/* <button */}
// onClick={extractROI}
// className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
// >
// Extract ROI
// </button>
// {roiImage && (
// <div className="mt-4">
//   <h3>Extracted ROI:</h3>
//   <img src={roiImage} alt="Extracted ROI" className="border" />
// </div>
// )}