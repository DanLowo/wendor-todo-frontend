import { ToastContainer } from "react-toastify";
import HomePage from "@/app/components/HomePage";
import {Fragment} from "react";
import ReactQuery from "@/app/ReactQuery";
import {getAllTasksService} from "@/services/taskService";


export default async function Home() {
  const allTasks = await getAllTasksService()
  
  return (
   <Fragment>
     <ToastContainer autoClose={3000} limit={1} />
     <ReactQuery>
       <HomePage tasks={allTasks} />
     </ReactQuery>
   </Fragment>
  )
}
