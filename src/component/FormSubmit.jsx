import {React, useEffect} from "react"
import ReactLoading from 'react-loading';
const FormSubmit =({handleSubmit,loading,disable=false,btn_name="go for search",color})=>{
   return(
    <>
    <div>
        <form action="" method="post" onSubmit={handleSubmit} className="flex justify-center items-center">
            <button type="submit" hidden={disable} name={btn_name} value={btn_name} id="" className="align-text-top px-6 py-3 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer" style={{background:color,color:"black"}}>{loading?<ReactLoading type={"spin"} color={"white"} />:btn_name}</button>
        </form>
    </div>
    </>
   )
}
export default FormSubmit;