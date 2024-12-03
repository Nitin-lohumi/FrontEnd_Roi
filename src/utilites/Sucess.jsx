import {toast}  from "react-toastify";
const Success =(msg) =>{
    toast.success(msg,{
        position:"top-right",
        autoClose:2000,
        className:"toast_message"
    })
} 
export default Success;