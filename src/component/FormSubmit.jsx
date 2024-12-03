import {React, useEffect} from "react"
import ReactLoading from 'react-loading';
const FormSubmit =({handleSubmit,loading,disable=false})=>{
   return(
    <>
    <div>
        <form action="" method="post" onSubmit={handleSubmit} className="flex justify-center items-center">
            <button type="submit" hidden={disable} name="submit" value={"submit"} id="" className="align-text-top px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer">{loading?<ReactLoading type={"spin"} color={"white"} />:"submit"}</button>
        </form>
    </div>
    </>
   )
}
export default FormSubmit;