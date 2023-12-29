"use client"

import cardStyles from "@/styles/cards.module.scss"
import utilStyles from "@/styles/utils.module.scss"
import Task from "@/app/components/Task";
import ToDoModal from "@/app/components/ToDoModal";
import {Fragment, useEffect, useRef, useState} from "react";
import {TODOSTAGEOPTIONS} from "@/utils/selectOptions";
import {useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {deleteTaskService, updateTaskService} from "@/services/taskService";

export default function Card ({ title, tasks = [] }){
  const queryClient = useQueryClient()
  const [searchableTasks, setSearchableTasks] = useState(tasks)
  const [isLoading, setIsLoading] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [editTaskValues, setEditTaskValues] = useState({})
  
  useEffect(() => {
    setSearchableTasks(tasks)
  }, [tasks])
  
  const handleSuccess = (message) => {
    setIsLoading(false)
    setIsShowEditModal(false)
    toast.success(message)
    queryClient.refetchQueries({ queryKey: ["TODOS"] }).then().catch()
  }
  
  const handleSearchList = (searchValue) => {
    if(searchValue.length < 1) {
      setSearchableTasks(tasks)
      return
    }
  
    const filteredTasks = tasks.filter(optionData => {
      const regex = new RegExp(searchValue, "gi");
      return optionData["title"].match(regex);
    });
    
    setSearchableTasks(filteredTasks)
  }
  
  const handleSubmitTask = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      const form = new FormData(e.target)
      await updateTaskService(editTaskValues.id, { title: form.get("title"), stage: form.get("stage") })
      handleSuccess("TODO Updated")
    } catch (e) {
      setIsLoading(false)
      toast.error("Something went wrong")
    }
  }
  
  const handleEditTask = (task) => {
    setEditTaskValues(task)
    setIsShowEditModal(true)
  }
  
  const handleDeleteTask = async (taskID) => {
    try {
      if(window.confirm("Do you want to delete this task")) {
        await deleteTaskService(taskID)
        handleSuccess("TODO Delete")
      }
    } catch (e) {
      toast.error("Something went wrong")
    }
  }
  
  return (
    <Fragment>
      {isShowEditModal && (
        <ToDoModal title="Edit Task" onClose={() => setIsShowEditModal(false)}>
          <EditModalForm isLoading={isLoading} taskValues={editTaskValues} onSubmit={handleSubmitTask} />
        </ToDoModal>
      )}
  
      <div className={`${cardStyles.card_container}`}>
        <h2 style={{ backgroundColor: dynamicColors[title] }}>{title}</h2>
        <div className={cardStyles.card_task_container}>
          
          <form className={cardStyles.card_search_form}>
            <input placeholder="Search for todo..." onChange={(e) => handleSearchList(e.target.value)} />
          </form>
          
          {searchableTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
  
          {searchableTasks.length === 0 && (
            <h3 className={cardStyles.no_task_found}>No tasks found</h3>
          )}
        </div>
      </div>
    </Fragment>
  )
}

const EditModalForm = ({ onSubmit, taskValues, isLoading }) => {
  const formRef = useRef(null)
  
  useEffect(() => {
    if(!!formRef.current) {
      formRef.current.elements.title.value = taskValues.title
      formRef.current.elements.stage.value = taskValues.stage
    }
  }, [taskValues])
  
  return (
    <form onSubmit={onSubmit} ref={formRef}>
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
      
      <button disabled={isLoading} type="submit" className={utilStyles.button}>Update Task</button>
    </form>
  )
}

const dynamicColors = {
  "PENDING": "#b6b5b5",
  "ON-GOING": "#efad3d",
  "COMPLETED": "#7ac416"
}