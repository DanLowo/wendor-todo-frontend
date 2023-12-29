"use client"

import utilStyles from "@/styles/utils.module.scss";
import {GTFont} from "@/app/font";
import cardStyles from "@/styles/cards.module.scss";
import Card from "@/app/components/Card";
import {Fragment, useState} from "react";
import ToDoModal from "@/app/components/ToDoModal";
import {TODOSTAGEOPTIONS} from "@/utils/selectOptions";
import {QueryClientProvider, useQuery, useQueryClient} from "@tanstack/react-query";
import {createTaskService, getAllTasksService} from "@/services/taskService";
import {toast} from "react-toastify";


export default function HomePage({ tasks = {} }){
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)
  const [isShowCreateModal, setIsShowCreateModal] = useState(false)
  
  const { data: allTasks, isSuccess: isAllTaskSuccess } = useQuery({
    queryKey: ["TODOS"],
    queryFn: getAllTasksService,
    initialData: tasks
  })
  
  const handleSuccess = () => {
    setIsLoading(false)
    setIsShowCreateModal(false)
    toast.success("TODO Created")
    queryClient.refetchQueries({ queryKey: ["TODOS"] }).then().catch()
  }
  
  const handleCreateTask = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      const form = new FormData(e.target)
      await createTaskService({ title: form.get("title"), stage: form.get("stage") })
      handleSuccess()
    } catch (e) {
      setIsLoading(false)
    }
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <Fragment>
        {isShowCreateModal && (
          <ToDoModal title="Create Task" onClose={() => setIsShowCreateModal(false)}>
            <CreateTaskForm isLoading={isLoading} onSubmit={handleCreateTask} />
          </ToDoModal>
        )}
    
        <main className={utilStyles.container}>
          <h1 className={utilStyles.title}>Wendor To-Do Application</h1>
          <div className={utilStyles.flex_end}>
            <button className={`${utilStyles.create_button} ${GTFont.className}`} onClick={() => setIsShowCreateModal(true)}>
              CREATE TODO
            </button>
          </div>
  
          {isAllTaskSuccess && (
            <div className={cardStyles.card_main_body}>
              <Card title="PENDING" tasks={allTasks["PENDING"]} />
              <Card title="ON-GOING" tasks={allTasks["ON_GOING"]} />
              <Card title="COMPLETED" tasks={allTasks["COMPLETED"]} />
            </div>
          )}
        </main>
      </Fragment>
    </QueryClientProvider>
  )
}

const CreateTaskForm = ({ onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Task Title
        <input required placeholder="Enter task title" name="title" />
      </label>
      
      <label>
        Task Stage
        <select name="stage" required>
          {TODOSTAGEOPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.title}</option>
          ))}
        </select>
      </label>
      
      <button style={{...(isLoading && { backgroundColor: "gray" })}} disabled={isLoading} type="submit" className={utilStyles.button}>
        {isLoading ? <i className={`fa-solid fa-spinner ${utilStyles.button_loading}`}></i> : "Create Task"}
      </button>
    </form>
  )
}