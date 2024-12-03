import {toast}  from "react-toastify";
const Error_msg =(msg) =>{
    toast.error(msg,{
        position:"top-right",
        autoClose:2000,
        draggable:true,
        className:"toast_message"
    })
} 
export default Error_msg;